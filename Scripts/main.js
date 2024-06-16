
var langserver = null;

const configKeyMetalsPath = 'scala.language-server-path';
const configKeyJavaHome = 'scala.java-home';

exports.activate = function() {
    // Do work when the extension is activated
    const metalsPath = nova.config.get(configKeyMetalsPath);
    const javaHome = nova.config.get(configKeyJavaHome);
    langserver = new ScalaLanguageServer(metalsPath, javaHome);
    nova.config.onDidChange(configKeyMetalsPath, function (path) {
        langserver.metalsPath = path;
        langserver.restart();
    });
    nova.config.onDidChange(configKeyJavaHome, function (path) {
        langserver.javaHome = path;
        langserver.restart();
    });
    langserver.restart();
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
    if (langserver) {
        langserver.deactivate();
        langserver = null;
    }
}


class ScalaLanguageServer {
    constructor(metalsPath, javaHome) {
        this.metalsPath = metalsPath;
        this.javaHome = javaHome;
    }
    
    deactivate() {
        this.stop();
    }
    
    restart() {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
        }
        
        // Use the default server path
        var path = this.metalsPath;
        if (!path) {
            path = nova.path.expanduser('~/Library/Application Support/Coursier/bin/metals');
        }        
        console.info(`Metals path =  ${path}`);
        
        var javaHome = this.javaHome;
        if (!javaHome) {
            javaHome = nova.environment['JAVA_HOME'];
        }
        console.info(`JAVA_HOME = ${javaHome}`);
        
        // Create the client
        const serverOptions = {
            path: path,
            args: [`-Dmetals.javaHome=${javaHome}`]
        };
        const clientOptions = {
            // The set of document syntaxes for which the server is valid
            syntaxes: ['scala']
        };
        const client = new LanguageClient('scala-langserver', 'Scala Language Server', serverOptions, clientOptions);
        
        try {
            // Start the client
            client.start();
            
            // Add the client to the subscriptions to be cleaned up
            nova.subscriptions.add(client);
            this.languageClient = client;
        }
        catch (err) {
            // If the .start() method throws, it's likely because the path to the language server is invalid
            
            if (nova.inDevMode()) {
                console.error(err);
            }
        }
    }
    
    stop() {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
            this.languageClient = null;
        }
    }
}


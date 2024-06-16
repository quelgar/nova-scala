<!--
👋 Hello! As Nova users browse the extensions library, a good README can help them understand what your extension does, how it works, and what setup or configuration it may require.

Not every extension will need every item described below. Use your best judgement when deciding which parts to keep to provide the best experience for your new users.

💡 Quick Tip! As you edit this README template, you can preview your changes by selecting **Extensions → Activate Project as Extension**, opening the Extension Library, and selecting "Scala" in the sidebar.

Let's get started!
-->

<!--
🎈 Include a brief description of the features your extension provides. For example:
-->

**Scala** provides syntax highlighting and LSP support for the Scala programming language. It uses [Metals](https://scalameta.org/metals/), the LSP server for Scala.

The syntax highlighting is currently very basic.

<!--
🎈 It can also be helpful to include a screenshot or GIF showing your extension in action:
-->


## Requirements

<!--
🎈 If your extension depends on external processes or tools that users will need to have, it's helpful to list those and provide links to their installers:
-->

Metals must be installed, which is usually done using [the Coursier CLI](https://get-coursier.io/docs/cli-overview):

```bash
cs install metals
```

## Usage

This extension should start automatically whenever a `.scala` or `.sc` file is edited.

### Configuration

<!--
🎈 If your extension offers global- or workspace-scoped preferences, consider pointing users toward those settings. For example:
-->

To configure global preferences, open **Extensions → Extension Library...** then select Scala's **Preferences** tab.

You can also configure preferences on a per-project basis in **Project → Project Settings...**

There are two preferences that can be set:

* The path to the metals executable, which defaults to the standard location used by Coursier
* The path to JDK home, which defaults to the value of the `JDK_HOME` environment variable, if it is set

## Acknowledgements

The extension uses:

* [The Scala tree-sitter grammar](https://github.com/tree-sitter/tree-sitter-scala?tab=readme-ov-file)
* The tree-sitter queries from [the Metals plugin for Zed](https://github.com/scalameta/metals-zed)

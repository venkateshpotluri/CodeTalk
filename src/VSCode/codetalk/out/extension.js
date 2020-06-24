"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const CodeTalkTreeDataProvider_1 = require("./CodeTalkTreeDataProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "codetalk" is now active!');
    const codeTalkAstProvider = new CodeTalkTreeDataProvider_1.CodeTalkTreeDataProvider();
    vscode.window.registerTreeDataProvider('codetalk-summary.view', codeTalkAstProvider);
    vscode.commands.registerCommand("CodeTalk.FileSummary", range => codeTalkAstProvider.select(range));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
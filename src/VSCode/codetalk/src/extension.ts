// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
//import CodeTalkAstProvider from CodeTalkTreeDataProvider;
import * as ts from 'typescript';
	import { CodeTalkTreeDataProvider } from './CodeTalkTreeDataProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codetalk" is now active!');
	const codeTalkAstProvider = new CodeTalkTreeDataProvider();
	vscode.window.registerTreeDataProvider('codetalk-summary.view',codeTalkAstProvider);
	vscode.commands.registerCommand("CodeTalk.FileSummary", range => codeTalkAstProvider.select(range));

	
}

// this method is called when your extension is deactivated
export function deactivate() {}

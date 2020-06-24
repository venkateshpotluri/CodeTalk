"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.childrenOf = exports.getSourceFileFromActiveEditor = exports.CodeTalkTreeDataProvider = void 0;
const vscode = require("vscode");
const ts = require("typescript");
class CodeTalkTreeDataProvider {
    //private editor: vscode.TextEditor = vscode.window.activeTextEditor;
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.tree = null;
        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.parseTree();
            this._onDidChangeTreeData.fire(this.tree);
        });
        this.parseTree();
    }
    parseTree() {
        this.tree = null;
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document && (editor.document.languageId === 'typescript')) {
            const source = getSourceFileFromActiveEditor();
            if (source) {
                this.tree = source;
                //this.editor = source.editor;
            }
        }
    }
    getTreeItem(element) {
        let hasChildren = false;
        const children = this.getChildren();
        hasChildren = children !== null && children.length > 0;
        const treeItem = new vscode.TreeItem(`${ts.SyntaxKind[element.kind]} (${element.getStart()}, ${element.getEnd()})`, hasChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
        // treeItem.command = {
        //     command: "CodeTalk.FileSummary",
        //     title: 'code talk file summary',
        //     arguments: [new vscode.Range(this.editor.document.positionAt(element.pos), this.editor.document.positionAt(element.end))]
        // };
        return treeItem;
    }
    getChildren(element) {
        const children = element ? childrenOf(element) : this.tree ? childrenOf(this.tree) : [];
        return children;
        //return children.length === 0 ? undefined : children;
    }
    select(range) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.selection = new vscode.Selection(range.start, range.end);
            editor.revealRange(range);
        }
    }
}
exports.CodeTalkTreeDataProvider = CodeTalkTreeDataProvider;
function getSourceFileFromActiveEditor() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null;
    }
    const document = editor.document;
    const sourceFile = ts.createSourceFile(document.fileName, document.getText(), ts.ScriptTarget.Latest, true);
    return sourceFile;
}
exports.getSourceFileFromActiveEditor = getSourceFileFromActiveEditor;
function childrenOf(node) {
    const children = [];
    ts.forEachChild(node, child => {
        children.push(child);
    });
    return children;
}
exports.childrenOf = childrenOf;
//# sourceMappingURL=CodeTalkTreeDataProvider.js.map
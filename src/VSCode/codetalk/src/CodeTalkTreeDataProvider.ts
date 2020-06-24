import * as vscode from 'vscode';
import * as ts from 'typescript';
export class CodeTalkTreeDataProvider implements vscode.TreeDataProvider<ts.Node>{
    private _onDidChangeTreeData: vscode.EventEmitter<ts.Node | null> = new vscode.EventEmitter<ts.Node | null>();
    readonly onDidChangeTreeData: vscode.Event<ts.Node | null> = this._onDidChangeTreeData.event;
    private tree: ts.Node | null = null;
    //private editor: vscode.TextEditor = vscode.window.activeTextEditor;
    constructor() {

        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.parseTree();
            this._onDidChangeTreeData.fire(this.tree);
        });
        this.parseTree();
    }

    private parseTree(): void {
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
    getTreeItem(element: ts.Node): vscode.TreeItem | Thenable<vscode.TreeItem> {

        let hasChildren: boolean = false;
        const children = this.getChildren() as ts.Node[];
        hasChildren = children !== null && children.length > 0;
        const treeItem = new vscode.TreeItem(`${ts.SyntaxKind[element.kind]} (${element.getStart()}, ${element.getEnd()})`,
            hasChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
        // treeItem.command = {
        //     command: "CodeTalk.FileSummary",
        //     title: 'code talk file summary',
        //     arguments: [new vscode.Range(this.editor.document.positionAt(element.pos), this.editor.document.positionAt(element.end))]
        // };
        return treeItem;
    }
    getChildren(element?: ts.Node): vscode.ProviderResult<ts.Node[]> {
        const children = element ? childrenOf(element) : this.tree ? childrenOf(this.tree) : [];
        return children;
        //return children.length === 0 ? undefined : children;
    }

    select(range: vscode.Range) {
        const editor = vscode.window.activeTextEditor;
        if (editor){
            editor.selection = new vscode.Selection(range.start, range.end);
            editor.revealRange(range);
        }
    }
}



export function getSourceFileFromActiveEditor(): ts.SourceFile | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null;
    }
    const document = editor.document;
    const sourceFile = ts.createSourceFile(document.fileName, document.getText(), ts.ScriptTarget.Latest, true);
    return sourceFile;
}

export function childrenOf(node: ts.Node): ts.Node[] {
    const children:ts.Node[] = [];

    ts.forEachChild(node, child => {
        children.push(child);
    });
    return children;
}
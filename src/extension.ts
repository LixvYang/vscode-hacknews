// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Output } from './global/logger';
import { TopStoriesTreeProvider } from './treeview/topStories-treeview-provider';
import { createWebView } from './service/webview.service';
import { TopStoriesTreeItem } from './treeview/topStories-treeview-provider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	Output('Extension Activated')
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hacknews.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vsocde-hacknews!');
	});

	context.subscriptions.push(disposable);
	vscode.commands.registerCommand('hacknews.nihao', () => {
		vscode.window.showInformationMessage("你好!");
	});

	const topStoriesTreeViewProvider = new TopStoriesTreeProvider();

	vscode.window.registerTreeDataProvider(
		"hacknews-topStories",
		topStoriesTreeViewProvider
	)

	vscode.commands.registerCommand('hacknews.refreshTopStories', () => {
    topStoriesTreeViewProvider.refresh();
  });

	context.subscriptions.push(vscode.commands.registerCommand('hacknews.treeItemClick', (rank:TopStoriesTreeItem) => {
		const webView = createWebView(context, vscode.ViewColumn.Active, rank);
		context.subscriptions.push(webView);
	}));
}
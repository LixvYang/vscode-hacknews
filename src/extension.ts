import * as vscode from 'vscode';
import { Output } from './global/logger';
import { TopStoriesTreeProvider } from './treeview/topStories-treeview-provider';
import { createWebView } from './service/webview.service';
import { TopStoriesTreeItem } from './treeview/topStories-treeview-provider';

export function activate(context: vscode.ExtensionContext) {
	Output('Extension Activated')
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
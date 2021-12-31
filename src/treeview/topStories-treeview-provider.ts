import * as vscode from 'vscode';
import { TopStoriesAPI } from '../const/URL';
import { ITopStoriesTarget } from '../target/topStories'

export class TopStorieTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public collapsibleState: vscode.TreeItemCollapsibleState,
    public link: string | undefined 
  ) { super(label, collapsibleState) }
}

export class HacknewsTreeItem extends TopStorieTreeItem {
  constructor(
    public readonly label: string,
    public type: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public topstories?: ITopStoriesTarget,
    public page?: number,
  ) {
    super(label, collapsibleState, topstories && topstories.url ? topstories.url : '');
  }

  get tooltip(): string {
    return this.topstories && this.topstories.title ? this.topstories.title : '';
  }

  get description(): string {
    return this.topstories && this.topstories.title ? this.topstories.title : '';
  }
}

export class TopsStoriesTreeViewProvider implements vscode.TreeDataProvider<HacknewsTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<HacknewsTreeItem | undefined> = new vscode.EventEmitter<HacknewsTreeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<HacknewsTreeItem | undefined> = this._onDidChangeTreeData.event;


  constructor() {}

  refresh(node?: HacknewsTreeItem): void {
    this._onDidChangeTreeData.fire(node)
  }

  getTreeItem(element: HacknewsTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: HacknewsTreeItem): Thenable<HacknewsTreeItem[]> {
    
  }
}

import * as vscode from 'vscode';
import { ITopStoriesArticle } from '../target/topStories'
import { TopStories } from '../service/topstory.service';
import * as os from 'os';


export class TopStoriesTreeProvider implements vscode.TreeDataProvider<TopStoriesTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<TopStoriesTreeItem | undefined> = new vscode.EventEmitter<TopStoriesTreeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<TopStoriesTreeItem | undefined> = this._onDidChangeTreeData.event;

	constructor() {}
  private articleList: ITopStoriesArticle[] = [];

  getTreeItem(element: TopStoriesTreeItem): TopStoriesTreeItem | Thenable<TopStoriesTreeItem> {
    return element;
  }

  async getChildren(element?: TopStoriesTreeItem): Promise<TopStoriesTreeItem[] | undefined> {
    if (element === undefined) {
      this.articleList = await TopStories.getTopStories();
      return this.topStoryArticleTree(this.articleList);
    } 
    return Promise.resolve(element.children);
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }  
  
  async topStoryArticleTree(articles: ITopStoriesArticle[]): Promise<TopStoriesTreeItem[]> {
    let tree: TopStoriesTreeItem[] = [];
    for (const article of articles) {
      const url = article.url;

      const childNode: TopStoriesTreeItem = new TopStoriesTreeItem(`${article.descendants} comments`);
      childNode.iconPath = new vscode.ThemeIcon('comment-discussion');

      const treeNode: TopStoriesTreeItem = new TopStoriesTreeItem(article.title, [childNode]);
      treeNode.tooltip = `${article.title} - ${url}`;
      treeNode.description = `${url}`;
      treeNode.command = {
        command: 'hack-news.openArticle',
        title: 'Open Article',
        arguments: [url, article.id],
      };
      tree.push(treeNode);
    
    }
    return tree;
  }
}

export class TopStoriesTreeItem extends vscode.TreeItem {
  constructor(
    label: any,
    children?: TopStoriesTreeItem[]
  ) {
    super(label, children === undefined ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed);
    this.children = children;
  }

  children?: TopStoriesTreeItem[];

  get url(): string {
    
			return this.url;
		
  }
}


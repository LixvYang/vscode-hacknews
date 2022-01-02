import { ExtensionContext, ViewColumn, WebviewPanel, window } from 'vscode';
import { TopStoriesTreeItem } from '../treeview/topStories-treeview-provider';


let webviewPanel: WebviewPanel | undefined;

export function createWebView(

    context: ExtensionContext,     
    viewColumn: ViewColumn,         
    rank: TopStoriesTreeItem                  

) {

    if (webviewPanel === undefined) {

        webviewPanel = window.createWebviewPanel(

            'webView',                       
            "你好",                           
            viewColumn,                         
            {
                retainContextWhenHidden: true,  
                enableScripts: true             
            }

        );

        webviewPanel.webview.html = getIframeHtml(rank.url);

    } else {

        webviewPanel.title = "世界";
        webviewPanel.webview.html = getIframeHtml(rank.url);
    }

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    return webviewPanel;
}

export function getIframeHtml(url: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        </head>

        <body>
        <iframe id='iframe1' class="iframeDiv" src="${url}" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}
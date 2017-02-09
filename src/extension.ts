'use strict';
import * as vscode from 'vscode';
import * as jsforce from 'jsforce';
import * as fs from "fs";
import * as glob from "glob";
import * as Zip from "node-zip";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.sayHello', (sender) => {
        if (sender) deploy(sender.path.substring(1));
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}

async function deploy(path: string) {
    //「出力 > OUTPUT」に"deploy log"を追加し表示
    let output = vscode.window.createOutputChannel("deploy log");
    output.show();
    try {
        //sfSetting.jsonから接続情報を取得
        let settings: { userName: string, password: string, url: string } = JSON.parse(fs.readFileSync(vscode.workspace.rootPath + "/sfSetting.json", 'utf8'));
        output.append("deploy " + path + "\r\n");

        //Salesforce組織にログイン
        output.append('Login...');
        let conn = new jsforce.Connection({ loginUrl: settings.url });
        conn.metadata.pollTimeout = 2000000;
        await conn.login(settings.userName, settings.password);
        output.append('OK\r\n');

        //静的リソースにアップロード
        output.append('deploy...');
        await conn.metadata.upsert('StaticResource', createMetaData(path));
        output.append('Completed!\r\n');
    } catch (ex) {
        output.append(JSON.stringify(ex.message));
    }
}

/**
 * 指定されたpath以下のファイルをzip圧縮しbase64文字列としてcontentに設定したMetaDataを作成
 */
function createMetaData(path: string) {
    let zip = new Zip();

    glob.sync(path + "/**/*.*").forEach((file) => {
        zip.file(file.replace(path + "/", ""), fs.readFileSync(file, 'utf8'));
    });

    return {
        fullName: path.split('/').pop(),
        content: zip.generate({ base64: true, compression: 'DEFLATE' }),
        contentType: 'application/zip'
    };
}
# 右クリックでフォルダーをSalesforceの静的リソースへアップロードできるVisual Studio Code拡張機能

## インストール
フォルダーごと以下に配置してください  
Windows %USERPROFILE%.vscode\extensions  
Mac ~/.vscode/extensions  
Linux ~/.vscode/extensions  
  
## 使用方法
Visual Studio Codeで任意のフォルダーを開きます。  
フォルダー直下に以下の内容でsfSetting.jsonを作成します。  
```javascript
{  
    "userName": "Salesforceユーザー名",  
    "password": "パスワード",  
    "url": "https://login.salesforce.com/"  
}  
```

アップロードしたいフォルダーをVisual Studio Codeのエクスプローラー上で右クリックし  
"静的リソースへアップロード"を選択すると指定したフォルダー配下がzip圧縮されSalesforceの静的リソースへアップロードされます。
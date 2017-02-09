# 右クリックでフォルダーをSalesforceの静的リソースへアップロードできるVisual Studio Code拡張機能

Visual Studio Codeで任意のフォルダーを開きます。  
ルートフォルダー直下に以下の内容でsfSetting.jsonを作成します。
{  
    "userName": "ユーザー名",  
    "password": "パスワード",  
    "url": "https://login.salesforce.com/"
}  

Visual Studio Codeのエクスプローラー上で右クリックし"静的リソースへアップロード"を選択すると
指定したフォルダー配下がzip圧縮されSalesforceの静的リソースへアップロードされます。
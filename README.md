# MKApp-deta

## 実行方法

以下のコマンドでクローン

```bash
git clone git@github.com:Yumax-panda/MKApp-deta.git
```

asdf等をインストールしてnode.jsのバージョンを合わせてください。asdfの場合はプロジェクトのルートディレクトリでバージョン設定。

```bash
asdf install
corepack enable
asdf reshim nodejs
```

各自APIキーを用意して`.env`ファイルへ設定

```env
NEXT_PUBLIC_DETA_PROJECT_KEY=""
NEXT_PUBLIC_BOT_DB_PROJECT_KEY=""
NEXT_PUBLIC_DISCORD_CLIENT_ID=""
NEXT_PUBLIC_DISCORD_CLIENT_SECRET=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000" // ローカルホストのURL
```

`NEXT_PUBLIC_DETA_PROJECT_KEY`と`NEXT_PUBLIC_BOT_DB_PROJECT_KEY`は同じでも可能。
deta.spaceでアカウントを作って作成。discord関連の環境変数は以下のドキュメントを参考のこと。

[NextAuth.js Discord Documentation](https://next-auth.js.org/providers/discord)

`NEXTAUTH_SECRET`は以下のコマンドで生成可能。

```bash
openssl rand -base64 32
```

以下で実行

```bash
npm run dev
```

ログイン機能でcookieを参照しています。ローカルホストのサイトで別アプリのcookieがキャッシュされていると正常に動作しない場合があります。ログインできない場合はブラウザのcookieを削除してみてください。

## データベース定義

`/src/repository`や`/src/models`の各定義を参照してください。

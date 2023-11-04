# MKApp-deta

A web service of [MK8DX discord bot](https://discord.com/oauth2/authorize?client_id=1038322985146273853&permissions=854027660408&scope=bot%20applications.commands).

[日本語はこちらから](/README_Ja.md)

## Key Features

- Easy to manage game results you took part in.
- Login with your discord account.
- All services available without payment.

## Installing

1. **Clone source**

You can just run the following command:

```bash
git clone git@github.com:Yumax-panda/MKApp-deta.git
```

2. **Make sure to use Linux or MacOS**

Linux or MaxOS recommended. If you use Windows, it would be better to use WSL instead.

3. **Match the version of Node.js**

Install asdf or other software to match the version of Node.js. For asdf, run the following command:

```bash
asdf install
corepack enable
asdf reshim nodejs
```

4. **Install required packages**

```bash
npm install
```

5. **Setup configuration**

Just create `.env` file on the root directory

```env
NEXT_PUBLIC_DETA_PROJECT_KEY=""
NEXT_PUBLIC_BOT_DB_PROJECT_KEY=""
NEXT_PUBLIC_DISCORD_CLIENT_ID=""
NEXT_PUBLIC_DISCORD_CLIENT_SECRET=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000" // localhost
```

`NEXT_PUBLIC_DETA_PROJECT_KEY` and `NEXT_PUBLIC_BOT_DB_PROJECT_KEY` can be the same value. Get API key after creating an account at deta.space. For discord-related environment variables, refer to the following document.

[NextAuth.js Discord Documentation](https://next-auth.js.org/providers/discord)

You can create `NEXTAUTH_SECRET` key using openssl.

```bash
openssl rand -base64 32
```

6. **Run app**

```bash
npm run dev
```

The login system references a cookie on your browser. If a cookie from another application is cached on the localhost site, it may not work properly. If you cannot log in, try deleting the cookie in your browser.

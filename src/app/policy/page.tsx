import { Container } from "@mui/material"
import { Section, TextField, List } from "@/components/Section/Terms/Section"

export default function PolicyPage() {
  return (
    <Container maxWidth="lg">
      <Section title="プライバシーポリシー">
        <TextField
          content="本サービスがお預かりする個人情報に対し、個人情報の社会的重要性を鑑み以下の方針に基づき個人の情報の保護に努めます。
        本サービスを運営する上で保存する個人データは以下の通りです。"
        />
      </Section>
      <Section title="個人情報の取り扱いについて">
        <TextField
          content="本サービスは、収集したユーザー情報に関して、個人情報保護に関する法令その他規範を遵守し、
        以下で述べる内容に従い適正に取り扱うことをお約束し、
        個人情報の収集に関して、以下の事項を通知致します。まず、本サービスが収集するユーザーに関する情報は以下の通りです。
        尚、いずれも全てDiscord連携時にDiscordアカウントから取得する情報です。"
        />
        <List
          items={[
            "ユーザー名",
            "ユーザーID",
            "ユーザーのプロフィール画像",
            "メールアドレス",
            "参加しているDiscordサーバー",
          ]}
        />
        <TextField content="本サービスは、以下の目的のためにユーザー情報を利用します。" />
        <List
          items={[
            "当サービスの運営並びにこれらの開発、運用及び保守のため",
            "ユーザーの本人確認のため",
            "ユーザーの不正アクセスを防ぐため",
            "当サービスの安全なご提供を確保するため",
          ]}
        />
        <TextField content="本サービスはユーザー情報を第三者に一切提供しません。また、ユーザー本人から削除の希望があった場合、照合後ただちに削除いたします。" />
      </Section>
    </Container>
  )
}

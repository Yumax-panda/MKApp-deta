import { Grid } from "@mui/material"
import FeaturePanel from "../Panel/FeaturePanel"
import SectionWrapper from "../SectionWrapper/SectionWrapper"

function FeatureSection() {
  return (
    <SectionWrapper title="機能" description="本サイトが提供するサービス">
      <Grid
        container
        columns={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FeaturePanel
          title="戦績管理（予定）"
          description="自分の参加しているサーバーへ登録された戦績をそれぞれ確認できます。戦績の編集や絞り込み検索も可能です。"
        />
        <FeaturePanel
          title="即時集計（予定）"
          description="交流戦botの即時集計機能をWebでもご利用いただけます。"
        />
        <FeaturePanel
          title="ラウンジ戦績の確認（予定）"
          description="自分の戦績を確認できます。"
        />
      </Grid>
    </SectionWrapper>
  )
}

export default FeatureSection

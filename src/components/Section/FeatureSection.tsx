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
          title="戦績管理"
          description="自分の参加しているチームの戦績を確認できます"
        />
        <FeaturePanel
          title="戦績管理"
          description="自分の参加しているチームの戦績を確認できます"
        />
        <FeaturePanel
          title="戦績管理"
          description="自分の参加しているチームの戦績を確認できます"
        />
      </Grid>
    </SectionWrapper>
  )
}

export default FeatureSection

import { Container } from "@mui/material"
import {
  Section,
  TextField,
  NumberedList,
  List,
} from "@/components/Section/Terms/Section"

export default function PolicyPage() {
  return (
    <Container maxWidth="lg">
      <Section title="ポリシー">
        <TextField content="test" />
      </Section>
    </Container>
  )
}

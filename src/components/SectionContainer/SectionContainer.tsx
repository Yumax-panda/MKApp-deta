import { Box } from "@mui/material"

type Props = {
  children: React.ReactNode
}

function SectionContainer({ children }: Props) {
  return (
    <Box
      sx={{
        py: 3,
        width: {
          xs: "90vw",
          sm: "80vw",
        },
        margin: "auto",
      }}
    >
      {children}
    </Box>
  )
}

export default SectionContainer

import { Box, Stack, Typography } from "@mui/material"

type Props = {
  title: string
  children: React.ReactNode
}

export function Section({ title, children }: Props) {
  return (
    <Stack spacing={2}>
      <Typography
        sx={{
          borderBottom: "1px solid",
          fontSize: "1.4rem",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ padding: 2 }}>{children}</Box>
    </Stack>
  )
}

type TextFieldProps = {
  content: string
}

export function TextField({ content }: TextFieldProps) {
  return (
    <Typography
      component="p"
      sx={{
        fontSize: "1.2rem",
        lineHeight: "1.8rem",
        whiteSpace: "pre-wrap",
      }}
    >
      {content}
    </Typography>
  )
}

type ListProps = {
  items: string[]
}

export function List({ items }: ListProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <Typography
            component="span"
            sx={{
              fontSize: "1.2rem",
              lineHeight: "1.8rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {item}
          </Typography>
        </li>
      ))}
    </ul>
  )
}

type NumberedListProps = {
  items: string[]
}

export function NumberedList({ items }: NumberedListProps) {
  return (
    <ol>
      {items.map((item, index) => (
        <li key={index}>
          <Typography
            component="span"
            sx={{
              fontSize: "1.2rem",
              lineHeight: "1.8rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {item}
          </Typography>
        </li>
      ))}
    </ol>
  )
}

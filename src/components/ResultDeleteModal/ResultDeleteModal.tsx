import { Modal, Stack, Button, Box, Typography } from "@mui/material"
import type { Dispatch, SetStateAction } from "react"
import { useResultAddModal } from "@/hooks/useResultAddModal"
import type { Result } from "@/models/result"

type Props = {
  open: boolean
  guildId: string
  resultId: number
  results: Result[]
  onClose: () => void
  setResults: Dispatch<SetStateAction<Result[]>>
}

const Field = ({ label, value }: { label: string; value: string | number }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography variant="body1">{label}</Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
)

function ResultDeleteModal({
  open,
  onClose,
  guildId,
  resultId,
  results,
  setResults,
}: Props) {
  const { handleSubmit } = useResultAddModal({
    guildId,
    results,
    setResults,
    onClose,
  })

  const selected = results[resultId]

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: 350,
          borderRadius: 5,
        }}
        spacing={2}
        id="result-add-form"
      >
        <Typography variant="h6">戦績の削除</Typography>
        <Typography variant="body1" color="error">
          本当に以下の戦績を削除しますか？
        </Typography>
        <Field label="相手チーム" value={selected.enemy} />
        <Field label="自チームの得点" value={selected.score} />
        <Field label="相手チームの得点" value={selected.enemyScore} />
        <Field label="日付" value={selected.date} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClose}
            variant="contained"
            color="secondary"
            size="small"
            sx={{ mr: 1 }}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            type="button"
            onClick={onClose}
          >
            Delete
          </Button>
        </Box>
      </Stack>
    </Modal>
  )
}

export default ResultDeleteModal

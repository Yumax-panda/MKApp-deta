import { Modal, Stack, TextField, Button, Box, Typography } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

function ResultAddModal({ open, onClose, onSubmit }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        component="form"
        onSubmit={onSubmit}
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
      >
        <Typography variant="h6">戦績の追加</Typography>
        <TextField
          id="result-add-enemy-name"
          label="相手チーム"
          defaultValue="enemy"
          variant="standard"
        />
        <TextField
          id="result-add-score"
          label="自チームのスコア"
          defaultValue="score"
          variant="standard"
        />
        <TextField
          id="result-add-enemy-score"
          label="相手チームのスコア"
          defaultValue="enemyScore"
          variant="standard"
        />
        <DateTimePicker label="日時" />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClose}
            variant="contained"
            color="error"
            size="small"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            submit
          </Button>
        </Box>
      </Stack>
    </Modal>
  )
}

export default ResultAddModal

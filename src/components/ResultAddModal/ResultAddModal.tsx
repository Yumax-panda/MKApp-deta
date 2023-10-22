import { Modal, Stack, TextField, Button, Box, Typography } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import { Controller } from "react-hook-form"
import { useResultAddModal } from "@/hooks/useResultAddModal"

type Props = {
  open: boolean
  guildId: string
  onClose: () => void
  onSubmit: () => void
}

function ResultAddModal({ open, onClose, guildId }: Props) {
  const { handleSubmit, control } = useResultAddModal(guildId)
  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        component="form"
        onSubmit={handleSubmit}
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
        <Typography variant="h6">戦績の追加</Typography>
        <Controller
          name="enemy"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="result-add-enemy-name"
              label="相手チーム"
              variant="standard"
              {...field}
            />
          )}
        />
        <Controller
          name="score"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              type="number"
              id="result-add-score"
              label="自チームの得点"
              variant="standard"
              {...field}
            />
          )}
        />
        <Controller
          name="enemyScore"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              type="number"
              id="result-add-enemy-score"
              label="相手チームの得点"
              variant="standard"
              {...field}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <DateTimePicker label="対戦日" {...field} />}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClose}
            variant="contained"
            color="error"
            size="small"
            sx={{ mr: 1 }}
            type="button"
            id="result-add-cancel-button"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            id="result-add-submit-button"
          >
            submit
          </Button>
        </Box>
      </Stack>
    </Modal>
  )
}

export default ResultAddModal

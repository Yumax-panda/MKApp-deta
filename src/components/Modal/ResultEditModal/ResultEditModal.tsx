import { Modal, Stack, TextField, Button, Box, Typography } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import type { Dispatch, SetStateAction } from "react"
import { Controller } from "react-hook-form"
import { useResultEditModal } from "@/hooks/useResultEditModal"
import { updateResult } from "@/lib/form/actions"
import type { Result } from "@/models/result"

type Props = {
  open: boolean
  guildId: string
  resultId: number
  results: Result[]
  setResults: Dispatch<SetStateAction<Result[]>>
  onClose: () => void
}

function ResultEditModal({
  open,
  guildId,
  resultId,
  results,
  setResults,
  onClose,
}: Props) {
  const { handleSubmit, control } = useResultEditModal({
    guildId,
    resultId,
    results,
    setResults,
    open,
    onClose,
  })

  return (
    <Modal open={open} onClose={onClose}>
      <form action={updateResult}>
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
          <input type="hidden" name="guildId" value={guildId} />
          <input type="hidden" name="date" value={new Date().toISOString()} />
          <Typography variant="h6">戦績の編集</Typography>
          <Controller
            name="enemy"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="result-edit-enemy-name"
                label="相手チーム"
                variant="standard"
                required
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
                id="result-edit-score"
                label="自チームの得点"
                variant="standard"
                required
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
                id="result-edit-enemy-score"
                label="相手チームの得点"
                variant="standard"
                required
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
              id="result-edit-cancel-button"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              id="result-edit-submit-button"
            >
              submit
            </Button>
          </Box>
        </Stack>
      </form>
    </Modal>
  )
}

export default ResultEditModal

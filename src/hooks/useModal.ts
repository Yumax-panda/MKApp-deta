import { useState } from "react"

type UseModalReturn = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

export const useModal = (): UseModalReturn => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return {
    open,
    handleOpen,
    handleClose,
  }
}

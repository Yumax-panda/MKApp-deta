import { Add, Delete, Edit } from "@mui/icons-material"
import { Typography, Box, Button } from "@mui/material"
import {
  DataGrid,
  GridToolbarContainer,
  // eslint-disable-next-line
  GridColDef,
  // eslint-disable-next-line
  GridValueGetterParams,
  // eslint-disable-next-line
  GridRenderCellParams,
  GridActionsCellItem,
  jaJP,
} from "@mui/x-data-grid"
import { useState } from "react"
import Paper from "../Paper/Paper"
import ResultAddModal from "../ResultAddModal/ResultAddModal"

const columns: GridColDef<Row>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "enemy",
    headerName: "チーム名",
    editable: true,
    type: "string",
  },
  {
    field: "date",
    headerName: "対戦日",
    editable: true,
    width: 200,
    type: "string",
  },
  {
    field: "scores",
    headerName: "自チーム - 相手チーム",
    sortable: true,
    editable: false,
    width: 200,
    type: "string",
    valueGetter: (params: GridValueGetterParams<any, Row>) => {
      return params.row.score - params.row.enemyScore
    },
    renderCell: (params: GridRenderCellParams<any, Row>) => {
      return (
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: "bold",
            alignContent: "center",
          }}
        >
          {params.row.score} - {params.row.enemyScore}
        </Typography>
      )
    },
  },
  {
    field: "result",
    headerName: "結果",
    sortable: true,
    editable: false,
    valueGetter: (params: GridValueGetterParams<any, Row>) => {
      return params.row.score - params.row.enemyScore
    },
    renderCell: (params: GridRenderCellParams<any, Row>) => {
      const diff = params.row.score - params.row.enemyScore
      if (diff > 0) {
        return (
          <Typography
            sx={{
              color: "success.main",
              fontWeight: "bold",
            }}
          >
            Win(+{diff})
          </Typography>
        )
      } else if (diff < 0) {
        return (
          <Typography
            sx={{
              color: "error.main",
              fontWeight: "bold",
            }}
          >
            Lose({diff})
          </Typography>
        )
      } else {
        return (
          <Typography
            sx={{
              color: "text.primary",
              fontWeight: "bold",
            }}
          >
            Draw
          </Typography>
        )
      }
    },
  },
  {
    field: "actions",
    type: "actions",
    getActions: (params) => [
      <GridActionsCellItem
        icon={<Edit />}
        label="編集"
        key={params.id}
        onClick={() => console.log(params.id)}
      />,
      <GridActionsCellItem icon={<Delete />} label="削除" key={params.id} />,
    ],
  },
]

type Row = {
  id: number
  enemy: string
  date: string
  score: number
  enemyScore: number
}

type Props = {
  rows: Row[]
  guildId: string
}

export default function ResultTable({ rows, guildId }: Props) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const Toolbar = () => {
    return (
      <GridToolbarContainer>
        <Box sx={{ flexGrow: 1 }} />
        <Button startIcon={<Add />} onClick={handleOpen} type="button">
          戦績の追加
        </Button>
      </GridToolbarContainer>
    )
  }

  return (
    <Paper>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          padding: 3,
          width: "100%",
        }}
        localeText={{
          ...jaJP.components.MuiDataGrid.defaultProps.localeText,
          noRowsLabel: "戦績がありません",
        }}
        autoHeight
        slots={{ toolbar: Toolbar }}
      />
      <ResultAddModal
        guildId={guildId}
        open={open}
        onClose={handleClose}
        onSubmit={handleClose}
      />
    </Paper>
  )
}

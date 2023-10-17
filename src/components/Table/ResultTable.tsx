import { Box, Paper, Typography } from "@mui/material"
import {
  DataGrid,
  // eslint-disable-next-line
  GridColDef,
  // eslint-disable-next-line
  GridValueGetterParams,
  // eslint-disable-next-line
  GridRenderCellParams,
  jaJP,
} from "@mui/x-data-grid"

const columns: GridColDef[] = [
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
    align: "center",
    width: 200,
    type: "string",
  },
  {
    field: "scores",
    headerName: "自チーム - 相手チーム",
    sortable: true,
    editable: false,
    width: 250,
    align: "center",
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
    align: "right",
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
}

export default function ResultTable({ rows }: Props) {
  return (
    <Paper
      sx={{
        width: "80vw",
        margin: "auto",
        borderRadius: "10px",
      }}
    >
      <Box>
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
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Paper>
  )
}

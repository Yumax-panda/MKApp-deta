"use client"

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
import dayjs from "dayjs"

import type { MmrChange } from "@/lib/lounge"

type Props = {
  changes: MmrChange[]
}

export default function MmrHistoryTable({ changes }: Props) {
  return (
    <DataGrid
      rows={changes}
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
        noRowsLabel: "データがありません",
      }}
      autoHeight
      getRowId={(row) => row.changeId || 0}
    />
  )
}

const columns: GridColDef<MmrChange>[] = [
  {
    field: "changeId",
    headerName: "Event",
  },
  {
    field: "date",
    headerName: "Time",
    type: "dateTime",
    valueGetter: (params: GridValueGetterParams) =>
      dayjs(params.value).toDate(),
    flex: 1,
  },
  { field: "mmrDelta", headerName: "MMR Delta", flex: 0.5 },
  { field: "newMmr", headerName: "MMR", flex: 0.5 },
]

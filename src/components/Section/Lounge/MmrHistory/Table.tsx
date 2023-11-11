"use client"

import { Link } from "@mui/material"
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
import { websiteUrl, type MmrChange } from "@/lib/lounge"

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
      getRowId={(row) => row?.changeId ?? 0}
    />
  )
}

const renderEventCell = (params: GridRenderCellParams<MmrChange>) => {
  const { row } = params
  if (
    row?.changeId === undefined ||
    row.tier === undefined ||
    row.numTeams === undefined
  ) {
    return <div>{row.reason}</div>
  } else {
    const format = 12 / row.numTeams
    const tierTitle = row.tier === "SQ" ? "Squad Queue" : `Tier ${row.tier}`
    return (
      <Link
        href={`${websiteUrl}/TableDetails/${row.changeId}`}
        target="_blank"
        rel="external"
      >
        {`${tierTitle} ${format}v${format} (ID: ${row.changeId})`}
      </Link>
    )
  }
}

const columns: GridColDef<MmrChange>[] = [
  {
    field: "changeId",
    headerName: "Event",
    renderCell: renderEventCell,
    minWidth: 250,
    filterable: false,
    editable: false,
    sortable: false,
  },
  {
    field: "time",
    headerName: "Time",
    type: "dateTime",
    valueGetter: (params: GridValueGetterParams) =>
      dayjs(params.value).toDate(),
    flex: 1,
    minWidth: 200,
  },
  { field: "mmrDelta", headerName: "MMR Delta", flex: 0.5, minWidth: 150 },
  { field: "newMmr", headerName: "MMR", flex: 0.5, minWidth: 120 },
]

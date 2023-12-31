"use client"

import { Add, Delete, Edit, Refresh } from "@mui/icons-material"
import { Typography, Box, Button, Stack } from "@mui/material"
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
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import ResultAddModal from "../Modal/ResultAddModal/ResultAddModal"
import ResultDeleteModal from "../Modal/ResultDeleteModal/ResultDeleteModal"
import ResultEditModal from "../Modal/ResultEditModal/ResultEditModal"
import Paper from "../Paper/Paper"
import WinLoseHistory from "./WinLoseHistory/WinLoseHistory"
import { useModal } from "@/hooks/useModal"
import type { Result } from "@/models/result"

type Row = {
  id: number
  enemy: string
  date: string
  score: number
  enemyScore: number
}

type Props = {
  guildId: string
}

export default function Result({ guildId }: Props) {
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch(`/api/guilds/${guildId}/results`)
      const json = await res.json()
      setResults(json ?? [])
    }

    fetchResults()
  }, [guildId])

  const ResultTable = () => {
    const addModal = useModal()
    const editModal = useModal()
    const deleteModal = useModal()
    const [selected, setSelected] = useState<number | null>(null)

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
            onClick={() => {
              setSelected(parseInt(params.id.toString()))
              editModal.handleOpen()
            }}
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="削除"
            key={params.id}
            onClick={() => {
              setSelected(parseInt(params.id.toString()))
              deleteModal.handleOpen()
            }}
          />,
        ],
      },
    ]

    const refresh = () => {
      toast
        .promise(
          async () => {
            const results = await fetch(`/api/guilds/${guildId}/results`).then(
              (res) => res.json(),
            )
            setResults(results)
          },
          {
            pending: "更新中...",
            success: "更新しました",
            error: {
              render: ({ data }) => {
                console.error(data)
                return "更新に失敗しました"
              },
            },
          },
        )
        .catch(() => {})
    }

    const Toolbar = () => {
      return (
        <GridToolbarContainer>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            startIcon={<Add />}
            onClick={addModal.handleOpen}
            type="button"
          >
            戦績の追加
          </Button>
          <Button startIcon={<Refresh />} onClick={refresh} type="button">
            更新
          </Button>
        </GridToolbarContainer>
      )
    }

    const rows = results.map((result, index) => ({
      id: index,
      ...result,
    })) as Row[]

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
          results={results}
          setResults={setResults}
          open={addModal.open}
          onClose={addModal.handleClose}
        />
        {selected !== null && results[selected] && (
          <ResultEditModal
            guildId={guildId}
            resultId={selected}
            results={results}
            setResults={setResults}
            open={editModal.open}
            onClose={editModal.handleClose}
          />
        )}
        {selected !== null && results[selected] && (
          <ResultDeleteModal
            guildId={guildId}
            resultId={selected}
            results={results}
            setResults={setResults}
            open={deleteModal.open}
            onClose={deleteModal.handleClose}
          />
        )}
      </Paper>
    )
  }

  return (
    <Stack spacing={2}>
      <ResultTable />
      <WinLoseHistory history={results} />
    </Stack>
  )
}

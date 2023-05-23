import React, { useContext } from "react";
import { tokens } from "../../theme";
import { Box, useTheme, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


import DashboardContext from "../../Context/DashboardContext";

export default function ScheduleCanceledDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    schedules, 
    paymentOptions,
    statusOptions,
    statusColors,
   } = useContext(DashboardContext);

   const pendingSchedules = schedules.filter(schedule => statusOptions[schedule.status] === 'Cancelado');

   const columns = [
    { field: "name", headerName: "Nombre", flex: 0.6 },
    { field: "tel", headerName: "Telefono", flex: 0.7 },
    { field: "date_time", headerName: "Fecha", flex: 1 },
    {
      field: "combo_id",
      headerName: "Servicio",
      flex: 1,
      valueGetter: (params) => {
        const schedule = params.row;
        return schedule.combos.map((combo) => combo.name).join(", ");
      },
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 0.8,
      renderCell: (params) => {
        const { status } = params.row;
        const color = statusColors[status] || "default"; 
        return (
          <Chip
            label={statusOptions[status]}
            color={color}
          />
        );
      },
    },
  ];

  
  
  
  return (
     <Box
            height="100%"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#d598a3",
                color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
                borderBottom: "none",
                fontSize: "16px", 
                fontWeight: "bold", 
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={pendingSchedules}
              columns={columns}
              disableSelectionOnClick
              hideFooter={true}
            />
          </Box>
  );
}

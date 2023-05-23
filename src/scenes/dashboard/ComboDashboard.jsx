import React, { useContext } from "react";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


import DashboardContext from "../../Context/DashboardContext";

export default function ComboDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    combos
   } = useContext(DashboardContext);

   const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "service_id",
      headerName: "Servicio",
      flex: 1,
      valueGetter: (params) => {
        const combo = params.row;
        return combo.services.map((service) => `${service.name} ($${service.price})`).join(", ");
      },
    },
    { field: "price", headerName: "Precio", flex: 1 },
    { field: "discount", headerName: "Descuento", flex: 1 },
    { field: "total_price", headerName: "Precio total", flex: 1 },
    
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
              rows={combos}
              columns={columns}
              disableSelectionOnClick
              hideFooter={true}
            />
          </Box>
  );
}

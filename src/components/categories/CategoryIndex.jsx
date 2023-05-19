import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import CategoryContext from "../../Context/CategoryContext";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


export const CategoryIndex = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { categories, getCategories, deleteCategory } = useContext(CategoryContext);
  useEffect(() => {
    getCategories();
  }, [])

 
  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "actions",
      headerName: "Opciones",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
          component={Link}
          to={`/categories/${params.row.id}/edit`}
          variant="contained"
          startIcon={<ModeEditOutlineOutlinedIcon />}
          >
        
          Editar
        </Button>
          <Button 
            variant="contained"
            onClick={() => deleteCategory(params.row.id)}
            startIcon={<DeleteIcon />}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header
        title="CATEGORIAS"
        subtitle="Lista de las categorías"
      />
      <Box>
        <Button
            component={Link}
            to="/categories/create"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Nueva categoria
        </Button>
      </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
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
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
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
          rows={categories}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          pageSize={5}
          disableSelectionOnClick
        />
     </Box>
    </Box>
  );
};
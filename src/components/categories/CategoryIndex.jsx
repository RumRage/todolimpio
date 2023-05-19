import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import CategoryContext from "../../Context/CategoryContext";

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
      headerName: "",
      flex: 1,
      renderCell: (params) => (
        <>
          <Link
            to={`/categories/${params.row.id}/edit`}
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
          >
            Editar
          </Link>
          <button
            onClick={() => deleteCategory(params.row.id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
          >
            Borrar
          </button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CATEGORIAS"
        subtitle="Lista de las categorías"
      />
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
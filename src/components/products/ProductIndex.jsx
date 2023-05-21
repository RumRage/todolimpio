import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Button, Snackbar, Alert, Breadcrumbs, Typography, NavigateNextIcon } from "@mui/material";
import LinkBreadcrumb from "@mui/material/Link"
import Header from "../../components/Header";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AlertDialog from "../../components/AlertDialog";
import ProductCreateModal from "./ProductCreateModal";
import { HotKeys } from "react-hotkeys";


export const ProductIndex = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { products, getProducts, deleteProduct, handleSnackbarClose, openSnackbar, setOpenSnackbar, deletedSnackbar, setDeletedSnackbar, updatedSnackbar, setUpdatedSnackbar, handleUpdatedSnackbarClose, handleClick } = useContext(ProductContext);
    useEffect(() => {
    getProducts();
    }, []);

    const handleDelete = (id) => {
      deleteProduct(id);
      setDeletedSnackbar(true);
    };

    useEffect(() => {
      const productCreated = localStorage.getItem("productCreated");
      if (productCreated) {
        setOpenSnackbar(true);
        localStorage.removeItem("productCreated");
      }
    }, []);

    useEffect(() => {
      let timeoutId;
      if (openSnackbar) {
        timeoutId = setTimeout(() => {
          setOpenSnackbar(false);
        }, 7000); // Cambia a 10000 para que dure 10 segundos
      }
      return () => {
        clearTimeout(timeoutId);
      };
    }, [openSnackbar]);

    useEffect(() => {
      let timeoutId;
      if (deletedSnackbar) {
        timeoutId = setTimeout(() => {
          setDeletedSnackbar(false);
        }, 5000); // Cambia a la duración deseada, en milisegundos
      }
      return () => {
        clearTimeout(timeoutId);
      };
    }, [deletedSnackbar]);

    const handlers = {
      openModal: () => {
        // Abrir la ventana modal
        // ...
      },
    };
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.keyCode === 121) {
          // Presionar "F10" para abrir la ventana modal
          handlers.openModal();
        }
      };
  
      document.addEventListener("keydown", handleKeyDown);
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [handlers]);

    const columns = [
        { field: "id", headerName: "Id", flex: 0.5 },
        { field: "name", headerName: "Nombre", flex: 1 },
        { field: "description", headerName: "Descripcion", flex: 1 },
        { field: "price", headerName: "Precio", flex: 1 },
        { field: "supplier", headerName: "Proveedor", flex: 1 },
        { field: "stock", headerName: "Stock", flex: 1 },
        {
          field: "actions",
          headerName: "Opciones",
          flex: 1,
          renderCell: (params) => (
            <>
              <Button
              component={Link}
              to={`/products/${params.row.id}/edit`}
              variant="contained"
              sx={{ 
                backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#E6C7C2",
                color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
                },
              }} 
            >
              <ModeEditOutlineOutlinedIcon style={{ marginLeft: "auto", marginRight: "auto" }} /> 
            </Button>
            
            <AlertDialog onDelete={() => handleDelete(params.row.id)} />
            </>
          ),
        },
      ];
    
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header
                    title="PRODUCTOS"
                    subtitle="Listado de productos"
                />
                
                <Box>
                <HotKeys handlers={handlers}>
                  {/* ... */}
                  <ProductCreateModal />
                </HotKeys>
                </Box>
            </Box>
            <Box m="10px 0 0 0">
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <LinkBreadcrumb underline="hover" color="inherit" href="/" onClick={handleClick}>
                  Inventario
                </LinkBreadcrumb>
                <Typography color="text.primary">Productos</Typography>
              </Breadcrumbs>
            </Box>
            <Box
            m="20px 0 0 0"
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
                backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#d598a3",
                color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
                borderBottom: "none",
                fontSize: "16px", 
                fontWeight: "bold", 
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#d598a3",
                color: `theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100] !important`,
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
                    rows={products}
                    columns={columns}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    pageSize={5}
                    disableSelectionOnClick
                />
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={null} // Configura null para desactivar el tiempo de ocultamiento automático
                  onClose={handleSnackbarClose}
                  sx={{
                    "& .MuiAlert-filledSuccess": {
                      fontSize: "20px", 
                    },
                  }}
                >
                  <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Producto creado exitosamente
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={deletedSnackbar}
                  autoHideDuration={null} // Configura null para desactivar el tiempo de ocultamiento automático
                  onClose={() => setDeletedSnackbar(false)}
                  sx={{
                    "& .MuiAlert-filledSuccess": {
                      fontSize: "20px",
                    },
                  }}
                >
                  <Alert onClose={() => setDeletedSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Producto eliminado exitosamente
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={updatedSnackbar}
                  autoHideDuration={null} // Configura null para desactivar el tiempo de ocultamiento automático
                  onClose={handleUpdatedSnackbarClose}
                  sx={{
                    "& .MuiAlert-filledSuccess": {
                      fontSize: "20px",
                    },
                  }}
                >
                  <Alert onClose={handleUpdatedSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Producto actualizado exitosamente
                  </Alert>
                </Snackbar>
            </Box>
        </Box>
    )
}


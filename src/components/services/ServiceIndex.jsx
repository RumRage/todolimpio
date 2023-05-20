import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import ServiceContext from "../../Context/ServiceContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


export const ServiceIndex = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { services, getServices, deleteService } = useContext(ServiceContext);
    useEffect(() => {
    getServices();
    }, [])

    const columns = [
        { field: "id", headerName: "Id", flex: 0.5 },
        { field: "name", headerName: "Nombre", flex: 1 },
        { field: "category_name", headerName: "Categoria", flex: 1 },
        { field: "price", headerName: "Precio", flex: 1 },
        {
          field: "actions",
          headerName: "Opciones",
          flex: 1,
          renderCell: (params) => (
            <>
              <Button
              component={Link}
              to={`/services/${params.row.id}/edit`}
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
              <Button 
                variant="contained"
                onClick={() => deleteService(params.row.id)}
                sx={{ 
                  backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#E6C7C2",
                  color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
                  },
                }} 
              >
                <DeleteIcon style={{ marginLeft: "auto", marginRight: "auto" }} /> 
              </Button>
            </>
          ),
        },
    ];
    
    return (
        <Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
            title="SERVICIOS"
            subtitle="Listado de servicios"
        />
        <Box>
            <Button
                component={Link}
                to="/services/create"
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#E6C7C2",
                  color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671",
                  },
                }}
              >
                
                  Nuevo servicio
                  <AddOutlinedIcon sx={{ ml: "10px" }} />
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
            rows={services}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            pageSize={5}
            disableSelectionOnClick
        />
        </Box>
    </Box>
    )
}

    
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import DashboardContext from "../../Context/DashboardContext";
import ScheduleDashboard from "./ScheduleDashboard";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
//import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
//import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  

  const {
      totalProduct, //Product
      totalDisposable, //Disposable
      totalCategory, //Category     
     } = useContext(DashboardContext);

     //Products

    const navigateToProducts = useNavigate();

    //Disposables      
  
      const navigateToDisposables = useNavigate();

    //Categories

    const navigateToCategories = useNavigate();

    //Schedules
    
    const navigateToSchedules = useNavigate();
    

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Bienvenido al sistema de gestión de Todolimpio MDQ" />
      </Box>
      

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ cursor: "pointer" }}
          onClick={() => navigateToProducts("/products")}
        >
          <StatBox
            title={totalProduct.toString()}
            subtitle="Productos"
            increase="Productos en sistema"
            icon={
              <StorefrontOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ cursor: "pointer" }}
          onClick={() => navigateToDisposables("/disposables")}
        >
          <StatBox
            title={totalDisposable.toString()}
            subtitle="Descartables"
            increase="Descartables en sistema"
            icon={
              <Inventory2OutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ cursor: "pointer" }}
          onClick={() => navigateToCategories("/categories")}
        >
          <StatBox
            title={totalCategory.toString()}
            subtitle="Categorias"
            increase="Categorias en sistema"
            icon={
              <CategoryOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4"
            subtitle="Usuarios"
            increase="Usuarios registrados en sistema"
            icon={
              <PersonOutlineOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          style={{ cursor: "pointer" }}
          onClick={() => navigateToSchedules("/schedules")}
        >
          <Box
            mt="15px"
            p="0 15px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Servicios pendientes
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                AGENDA DE SERVICIOS EN CURSO
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <CalendarMonthOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            
          </Box>
          <Box height="200px" m="10px 10px 0 10px">
          <ScheduleDashboard />
          </Box>         
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Historial de servicios
            </Typography>
          </Box>
          
            
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Servicios
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Combos
          </Typography>
          <Box height="250px" mt="-20px">
            
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
           Servicios cancelados
          </Typography>
          <Box height="200px">
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
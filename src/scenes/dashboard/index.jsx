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
import DashboardContext from "../../Context/DashboardContext";
import ScheduleDashboard from "./ScheduleDashboard";
import ScheduleHistoryDashboard from "./ScheduleHistoryDashboard";
import ScheduleCanceledDashboard from "./ScheduleCanceledDashboard";
import ServiceDashboard from "./ServiceDashboard";
import ComboDashboard from "./ComboDashboard";

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
      totalProduct, //Product
      totalDisposable, //Disposable
      totalCategory, //Category 
      totalService, //Service 
      totalCombo //Combo  
     } = useContext(DashboardContext);

    const navigateToProducts = useNavigate(); //Products
    const navigateToDisposables = useNavigate(); //Disposables 
    const navigateToCategories = useNavigate(); //Categories
    const navigateToSchedules = useNavigate(); //Schedules
    const navigateToSchedulesHistory = useNavigate(); //SchedulesHistory
    const navigateToSchedulesCanceled = useNavigate(); //SchedulesCanceled   
    const navigateToServices = useNavigate();  //Services
    const navigateToCombos = useNavigate(); //Combos

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Bienvenido al sistema de gestión de Todolimpio MDQ" />
      </Box>
      

      {/* GRIDS */}
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
          style={{ cursor: "pointer" }}
          onClick={() => navigateToSchedulesHistory("/schedules/History")}
        >
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Servicios completos
              </Typography>
            <Typography color={colors.greenAccent[500]} variant="h3" fontWeight="600">
              Historial de servicios completos
            </Typography>
            <Box>
              <IconButton>
                <HistoryOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            
          </Box>
          <Box height="200px" m="10px 10px 0 10px">
          
          <ScheduleHistoryDashboard />
          
          </Box>
            
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          style={{ cursor: "pointer" }}
          onClick={() => navigateToServices("/services")}
        >
          
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="5px"
          >
            <StatBox
            title={totalService.toString()}
            subtitle="Servicios"
            increase="Servicios que hacemos"
          />
           
           <Box>
            <IconButton>
                <AirportShuttleOutlinedIcon
                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              </IconButton>
            </Box>
            </Box>
            <Box height="200px" m="10px 10px 0 10px">
          
          <ServiceDashboard />
          
          </Box>
        </Box>
        
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          style={{ cursor: "pointer" }}
          onClick={() => navigateToCombos("/combos")}
        >
          
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="5px"
          >
            <StatBox
            title={totalCombo.toString()}
            subtitle="Combos"
            increase="Combos y ofertas en sistema"
          />
           
           <Box>
            <IconButton>
                <SellOutlinedIcon
                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              </IconButton>
            </Box>
            </Box>
            <Box height="200px" m="10px 10px 0 10px">
          
          <ComboDashboard />
          
          </Box>
        </Box>
      
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          style={{ cursor: "pointer" }}
          onClick={() => navigateToSchedulesCanceled("/schedules/Canceled")}
        >
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Servicios cancelados
              </Typography>
            <Typography color={colors.greenAccent[500]} variant="h3" fontWeight="600">
            Historial de servicios cancelados
            </Typography>
            <Box>
               <IconButton>
                <EventBusyOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
            
        </Box>

        <Box height="200px" m="10px 10px 0 10px">
          
          <ScheduleCanceledDashboard />
          
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
import React, { useContext } from "react";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ScheduleContext from "../../Context/ScheduleContext";

const StyledMenu = styled((props) => (
    
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function StatusOptions({ onHecho, onCancelado }) {
  const { schedule } = useContext(ScheduleContext);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <Button
      id="demo-customized-button"
      aria-controls={open ? 'demo-customized-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      variant="contained"
      onClick={handleClick}
      endIcon={<KeyboardArrowDownIcon />}
      sx={{ 
        backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#E6C7C2",
        color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
        "&:hover": {
          backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
        },
      }} 
    >
    </Button>
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
       <MenuItem onClick={onHecho} disableRipple 
        sx={{ backgroundColor: 'success.main',  
        color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
        "&:hover": {
          backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
        }, }}>
          Hecho
        </MenuItem>
        <MenuItem onClick={onCancelado} disableRipple 
        sx={{ backgroundColor: 'error.main',
        color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
        "&:hover": {
          backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
        }, }}>
          Cancelado
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
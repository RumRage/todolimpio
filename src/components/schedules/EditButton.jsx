import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const EditButton = ({ scheduleId }) => {
  return (
    <Button
      component={Link}
      to={`/schedules/${scheduleId}/edit`}
      variant="contained"
      // Estilos personalizados aquí
    >
      <ModeEditOutlineOutlinedIcon style={{ marginLeft: 'auto', marginRight: 'auto' }} />
    </Button>
  );
};

export default EditButton;
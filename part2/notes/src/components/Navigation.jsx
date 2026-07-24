import { AppBar, Toolbar, Button } 
from '@mui/material';
import { Link } from 'react-router-dom';


const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }


function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/" sx={style}>
          home
        </Button>
        <Button color="inherit" component={Link} to="/notes" sx={style}>
          notes
        </Button>
        <Button color="inherit" component={Link} to="/create" sx={style}>
          new note
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation
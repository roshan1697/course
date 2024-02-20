import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideNavbar from './sidenavbar';
import { useRef , useState} from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
const NavBar = ({userEmail,setUserEmail}) => {
  const toggleSideNavbar = useRef()
  const navigate = useNavigate()
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    return (
        <Box sx={{ flexGrow: 1,
          position:'sticky',
          zIndex:'1',
          top:'0.5rem'
          
          }} >
      <AppBar position="static" 
        style={{
          width:'98vw',
          
      }}>
        <Toolbar sx={{ backgroundColor: '#fafafa' }}>
          <SideNavbar ref={toggleSideNavbar}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
          />
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(e)=>{
              toggleSideNavbar.current.toggleSideBar(e)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'black' }}>
            CourseApp
          </Typography>

          {!userEmail ?
            <Box>

          <Link to='/courseapp/signup'>
          <Button sx={{  color:'black' }} color="inherit">Signup</Button>
          </Link>
          <Link to='/courseapp/signin'>
          <Button sx={{  color:'black' }} color="inherit">Login</Button>
          </Link>
            </Box>
            :


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar   />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
              
                <MenuItem onClick={()=>{
                  localStorage.setItem('token',null)
                  setUserEmail(null)
                  navigate('/')
                  
                }}>
                <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
                </MenuItem>
            
            </Menu>
          </Box>
              }
        











        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default NavBar




import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import MedicationIcon from '@mui/icons-material/Medication';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeContext } from '../../context/ThemeContext';
import Alert from '../Alert/Alert';
import { useSelector ,useDispatch } from 'react-redux';
import { signOutAction } from '../../redux/action/AuthAction';

function Header(props) {
  const value = useContext(ThemeContext)
  const drawerWidth = 190;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const auth = useSelector(state => state.auth)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dispatch = useDispatch()
  
  const handleLogOut = () => {
    dispatch(signOutAction())
  }
  const itemList = [
    { label: 'Medicine-Form', to: '/MedicineForm', icon: <MedicationIcon /> },
    { label: 'Patient-Form', to: '/PatientForm', icon: <AccessibleIcon /> },
    { label: 'Doctor-Form', to: '/DoctorForm', icon: <PersonIcon /> }

  ]
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {itemList.map((text, index) => (
          <ListItem key={text} component={NavLink} to={text.to} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="main-header">
      <div id="topbar" className={`d-flex align-items-center fixed-top ${value.theme}`}>
        <div className="container d-flex justify-content-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope" /> <a href="mailto:contact@example.com">cityhospital@example.com</a>
            <i className="bi bi-phone" /> +91 9988776655
          </div>
          <div className="d-none d-lg-flex social-links align-items-center">
            <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
            <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
            <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
            <button className='bg-secondary border-0 py-2 px-3 rounded-1 ms-3' onClick={() => value.toogle_Theme(value.theme)}>Change Theme</button>
          </div>
          <Alert />
        </div>
      </div>
      <header id="header" className={`fixed-top ${value.theme}`}>
        <div className="container d-flex align-items-center">
          <div className="logo">
            <a href="index.html">
              <h1 className="logo me-auto">City</h1><br />
              <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
            </a>
          </div>
          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li>
                <NavLink className="nav-link scrollto " to="/">Home</NavLink>
              </li>
              <li> <NavLink className="nav-link scrollto " to="/Department">Department</NavLink></li>
              <li> <NavLink className="nav-link scrollto " to="/Doctor">Doctor</NavLink></li>
              <li> <NavLink className="nav-link scrollto " to="/About">About</NavLink></li>
              <li><NavLink className="nav-link scrollto " to="/Medicine">Medicine</NavLink></li>
              <li> <NavLink className="nav-link scrollto " to="/Contact">Contact</NavLink></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" />
          </nav>
          <NavLink to="/BookAppointment" className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span>
            Appointment</NavLink>
          {
            auth.user === null ?
              <NavLink to={"/Auth"} className="appointment-btn scrollto">
                <span className="d-none d-md-inline">Login/ Signup</span>
              </NavLink>
              :
              <NavLink to={"/Auth"} className="appointment-btn scrollto" onClick={() => handleLogOut()}>
                <span className="d-none d-md-inline">Log Out</span>
              </NavLink>
          }


        </div>

      </header>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
        </Box>
      </Box>
    </div>



  );
}

export default Header;
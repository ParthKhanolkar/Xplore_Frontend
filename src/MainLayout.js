import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, Drawer, List, ListItem, ListItemText, Avatar, Divider, ListItemIcon } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import OverviewPage from './OverviewPage';
import BookSlotsPage from './BookSlotsPage';
import ViewSlotsPage from './ViewSlotsPage';
import AccountInfoPage from './AccountInfoPage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const MainLayout = ({ onLogout, username }) => {
  const [bookedSlots, setBookedSlots] = useState([]);

  const handleSlotBooked = (slot) => {
    setBookedSlots([...bookedSlots, slot]);
  };

  const handleDeleteSlot = (index) => {
    const newSlots = bookedSlots.filter((_, i) => i !== index);
    setBookedSlots(newSlots);
  };

  const handleEditSlot = (updatedSlot) => {
    const newSlots = bookedSlots.map((slot, index) =>
      index === updatedSlot.index ? updatedSlot : slot
    );
    setBookedSlots(newSlots);
  };

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box', 
              backgroundColor: '#e0f7fa', 
              color: '#006064', 
              boxShadow: '2px 0 5px rgba(0,0,0,0.1)' 
            },
          }}
        >
          <Toolbar>
            <Avatar alt="App Logo" src="/path/to/logo.png" sx={{ margin: '0 auto', width: 56, height: 56 }} />
          </Toolbar>
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button component={Link} to="/overview">
                <ListItemIcon>
                  <DashboardIcon sx={{ color: '#006064' }} />
                </ListItemIcon>
                <ListItemText primary="Overview" />
              </ListItem>
              <ListItem button component={Link} to="/book-slots">
                <ListItemIcon>
                  <BookIcon sx={{ color: '#006064' }} />
                </ListItemIcon>
                <ListItemText primary="Book My Slots" />
              </ListItem>
              <ListItem button component={Link} to="/view-slots">
                <ListItemIcon>
                  <EventNoteIcon sx={{ color: '#006064' }} />
                </ListItemIcon>
                <ListItemText primary="View My Slots" />
              </ListItem>
              <ListItem button component={Link} to="/account-info">
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: '#006064' }} />
                </ListItemIcon>
                <ListItemText primary="Account Info" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#006064' }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                XploRE
              </Typography>
              <Button 
                color="inherit" 
                onClick={onLogout} 
                startIcon={<LogoutIcon />} 
                sx={{ marginLeft: 'auto', backgroundColor: '#004d40', '&:hover': { backgroundColor: '#00332c' } }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<OverviewPage username={username} />} />
            <Route path="/book-slots" element={<BookSlotsPage interviewerName={username} />} />
            <Route path="/view-slots" element={<ViewSlotsPage bookedSlots={bookedSlots} setBookedSlots={setBookedSlots} />} />
            <Route path="/account-info" element={<AccountInfoPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default MainLayout;

import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Viewuser = () => {
  const [emp, setEmp] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/view/users")
      .then(res => {
        console.log(res.data); // Check the structure of res.data to match your expectations
        setEmp(res.data); // Assuming res.data is an array of objects
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const delValue = (id) => {
    axios.delete(`http://localhost:3001/remove/user/${id}`)
      .then((res) => {
        alert(res.data.message); // Display the message from the response
        setEmp(emp.filter(user => user._id !== id)); // Remove the deleted user from state
      })
      .catch((err) => console.log(err));
  };

  const updateValue = (user) => {
    console.log("Update clicked", user);
    navigate("/Signup2", { state:{val :user } }); // Navigate to "/s" with user object as state
  };

  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundImage: `url("https://www.backgroundsy.com/file/large/user-interface-design.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
        <AppBar position="absolute" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* Icon can go here */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              The Book Haven
            </Typography>
            <Button>
              <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Button>
            <Button>
              <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>
                Logout
              </Link>
            </Button>
            
          </Toolbar>
        </AppBar>
      
    <div style={{ display: 'flex', justifyContent: 'initial', alignItems: 'initial', flexDirection: 'column', marginTop: 90 }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'normal', marginTop: -5 }}>
      {emp.map((user, index) => (
        <Card key={index} variant="outlined" sx={{ minWidth: 275, maxWidth: 400, marginBottom: 2 ,backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
          <CardContent>
            <Typography variant='h6' component='div'>
              First Name: {user.firstName}
            </Typography>
            <Typography variant="h6" component="div">
              Last Name: {user.lastName}
            </Typography>
            <Typography variant="h6" component="div">
              Age: {user.age}
            </Typography>
            <Typography variant="h6" component="div">
              Place: {user.place}
            </Typography>
            <Typography variant="h6" component="div">
              Email: {user.Email} {/* Use correct property name: email */}
            </Typography>
            <Typography variant="h6" component="div">
              Password: {user.Password} {/* Use correct property name: password */}
            </Typography>
            <Button
              onClick={() => delValue(user._id)}
              variant="contained"
              color="error"
              sx={{ mt: 2, mr: 2 }}
            >
              Delete
            </Button>

            <Button
              onClick={() => updateValue(user)} 
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
    </Box>
  );
};

export default Viewuser;

import React, {useEffect, useState} from "react";
import {useNavbarStyles} from "../styles/navbarStyles";
import {Grid} from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BackspaceIcon from '@material-ui/icons/Backspace';
import {logout} from "../api/AuthApi"

const Navbar = props => {
  const classes = useNavbarStyles()
  const history = props.history
  const [loginLogoutValue, setLoginLogoutValue] = useState('login')
  const [loginLogoutLabel, setLoginLogoutLabel] = useState('войти')

  const handleChange = (event, newValue) => {
    switch (newValue){
      case 'allProperty':
        history.push('/allProperty')
        break
      case 'adding':
        history.push('/addingPropertyForm')
        break
      case 'login':
        history.push('/auth/login')
        break
      case 'logout':
        history.push('/auth/logout')
        break
    }
  };

  useEffect(()=> {
    if(localStorage.getItem("accessToken")!= null){
      setLoginLogoutLabel('выйти')
      setLoginLogoutValue('logout')
    }
    else{
      setLoginLogoutLabel('войти')
      setLoginLogoutValue('login')
    }
  },[handleChange])



  return(
    <BottomNavigation
      onChange={handleChange}
      showLabels
      className={classes.main}
    >
      <BottomNavigationAction  label="Вся недвижимость" value = 'allProperty' icon={<HomeIcon fontSize="large" />} />
      <BottomNavigationAction label="Добавить" value='adding' icon={<AddBoxIcon fontSize="large"/>} />
      <BottomNavigationAction label={loginLogoutLabel} value={loginLogoutValue} icon={<AccountBoxIcon fontSize="large"/>} />
    </BottomNavigation>
  )
}

export default Navbar;
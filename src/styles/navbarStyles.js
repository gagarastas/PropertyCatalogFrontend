import {makeStyles} from "@material-ui/core/styles";

const navbarStyles = () => ({
  main:{
    backgroundColor: "#FFD700",
    position: 'fixed',
    width: '100%',
    height: 70
  }

})

export const useNavbarStyles = makeStyles(navbarStyles, {name:  "Navbar"})
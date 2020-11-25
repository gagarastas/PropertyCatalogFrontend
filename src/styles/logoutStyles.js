import {makeStyles} from "@material-ui/core/styles";

const logoutStyles = () => ({
  mainGrid:{
    paddingTop: 80,
  }

})

export const useLogoutStyles = makeStyles(logoutStyles, {name:  "Logout"})
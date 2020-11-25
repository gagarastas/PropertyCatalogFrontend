import React from "react";
import {logout} from "../../api/AuthApi";
import {Button, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useFormStyles} from "../../styles/formStyles";

const Logout = props => {
  const history = props.history
  const classes = useFormStyles()

  const doLogout = () =>{
    logout()
    history.push('/allProperty')
  }
  return(
    <Grid className={classes.mainGrid} container direction="column" >
      <Grid item>
        <Typography> вы действительно хотите выйти?</Typography>
      </Grid>
      <Grid item>
        <Button onClick={doLogout} variant="contained" color="primary">
         Да
        </Button>
      </Grid>
    </Grid>
  )
}

export default Logout
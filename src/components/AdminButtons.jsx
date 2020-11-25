import React from "react";
import {Button, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {deleteProperty} from "../api/PropertyApi";

const AdminButtons = props => {
  const isAdmin = props.isAdmin
  const history = props.history
  const propertyId = props.propertyId
  const toAdding = () =>{
    history.push(`/updatingPropertyForm/${propertyId}`)
  }
  const doDelete = () => {
    deleteProperty(propertyId)
      .then(() => history.push('/allProperty'))
      .catch(error => alert(error))
  }
  if(isAdmin){
    return (
      <Grid item>
        <Button onClick={toAdding} variant="contained" color="primary">
          Изменить
        </Button>
        <Button onClick={doDelete} variant="contained" color="secondary">
          Удалить
        </Button>
      </Grid>

    )
  }
  return(
    <Grid item>
    <Typography variant="h6">
      Чтобы изменить или удалить обьект войдите как администратор
    </Typography>
  </Grid>
  )

}

export default AdminButtons
import React, {useState} from "react";
import {loginApi} from "../../api/AuthApi";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {useFormStyles} from "../../styles/formStyles";

const Login = props => {
  const history = props.history;
  const [redirect, setRedirect] = useState(false);
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const classes = useFormStyles()

  const submit = () =>{
    doLogin(history, login, password)
  }
  const goToRegister = () => {
    history.push("/auth/register")
  }
  const changeLogin = (event) => {
    setLogin(event.target.value)
  }
  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  return(
    <form noValidate autoComplete="off">
      <Grid className={classes.mainGrid} container spacing={2} direction="column">
        <Grid item>
          <TextField
            className={classes.textInput}
            id="login"
            label="логин"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changeLogin}
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.textInput}
            id="password"
            type="password"
            label="пароль"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changePassword}
          />
        </Grid>
        <Grid item>
          <Button onClick={submit} variant="contained" color="primary">Войти</Button>
        </Grid>
        <Grid item>
          <Button onClick={goToRegister} variant="contained" color="secondary">Зарегистрироваться</Button>
        </Grid>
      </Grid>
    </form>
  )

}
export default Login

const doLogin = (history, login, password) => {
  loginApi(login, password)
    .then(info => {
      localStorage.setItem("accessToken", info.accessToken);
      let rolesString = getRolesString(info.roles)
      localStorage.setItem("roles", rolesString.trim());
      history.push("/allProperty");
    })
    .catch(error => alert(error))
}

const getRolesString = (roles) =>{
  let rolesString = '';
  roles.forEach((role => {
    rolesString += role.authority + " ";
  }))
  return rolesString;
}
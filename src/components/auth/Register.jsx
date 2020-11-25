import React, {useState} from "react";
import {useFormStyles} from "../../styles/formStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {register} from "../../api/AuthApi";

const Register = props => {
  const history = props.history;
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const classes = useFormStyles()

  const submit = () =>{
    if(password !== password2) {
      alert("пароли не совпадают")
    }
    else if(login.length < 3 || login.length > 15){
      alert("логин должен быть от 3 до 15 символов")
    }
    else if(password.length < 6 || password.length > 20){
      alert("пароль должен быть от 6 до 20 символов")
    }
    else{
      doRegister(history, login, password)
    }
  }
  const goToLogin = () => {
    history.push("/auth/login")
  }
  const changeLogin = (event) => {
    setLogin(event.target.value)
  }
  const changePassword = (event) => {
    setPassword(event.target.value)
  }
  const changePassword2 = (event) => {
    setPassword2(event.target.value)
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
          <TextField
            className={classes.textInput}
            id="password2"
            type="password"
            label="повторите пароль"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changePassword2}
          />
        </Grid>
        <Grid item>
          <Button onClick={submit} variant="contained" color="primary">Зарегистрироваться</Button>
        </Grid>
        <Grid item>
          <Button onClick={goToLogin} variant="contained" color="secondary">Войти</Button>
        </Grid>
      </Grid>
    </form>
  )
}

const doRegister = (history, login, password) => {
  register(login, password)
    .then(info => {
      localStorage.setItem("accessToken", info.accessToken);
      let rolesString = getRolesString(info.roles)
      localStorage.setItem("roles", rolesString.trim());
      history.push("/allProperty");
    })
    .catch(er => alert(er))
}

const getRolesString = (roles) =>{
  let rolesString = '';
  roles.forEach((role => {
    rolesString += role.authority + " ";
  }))
  return rolesString;
}

export default Register
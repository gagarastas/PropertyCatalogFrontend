import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {addPhotos, sendNewProperty} from "../api/PropertyApi";
import {Button, Typography} from "@material-ui/core";
import {useFormStyles} from "../styles/formStyles";

const AddingPropertyForm = (props) => {
  const history = props.history
  const classes = useFormStyles()

  useEffect( () => {
    checkAdminRole(history)
  }, [])

  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [information, setInformation] = useState({
    children: false,
    animals: false
  });
  const [convenience, setConvenience] = useState({
    balcony: false,
    washer: false,
    tv: false

  });
  const [images,setImages] = useState([]);

  const changePropertyType = (event) => {
    setPropertyType(event.target.value)
  }
  const changeAddress = (event) => {
    setAddress(event.target.value)
  }
  const changeDescription = (event) => {
    setDescription(event.target.value)
  }
  const changeInformation = (event) => {
    setInformation({...information, [event.target.name]: event.target.checked})
  }
  const changeConvenience = (event) => {
    setConvenience({...convenience, [event.target.name]: event.target.checked})
  }
  const changeImages = (event) => {
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    for (let i = 0; i < event.target.files.length; i++) {
      const currentFileExt = event.target.files[i].name.split('.').pop();
      if (allowedExtensions.indexOf(currentFileExt) !== -1) {
        const newFile = event.target.files[i];
        setImages(prevState => [...prevState, newFile]);
      } else {
        alert("файл " + event.target.files[i].name + " должен быть в формате png, jpg или jpeg")
      }
    }
  }

  const send = () => {
    addProperty(propertyType, address, description, information, convenience, images, history)
  }

  return(
    <form noValidate autoComplete="off">
      <Grid className={classes.mainGrid} container spacing={2} direction="column">
        <Grid item>
          <TextField
            className={classes.textInput}
            id="type"
            label="тип недвижимости"
            value={propertyType}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changePropertyType}
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.textInput}
            id="address"
            label="адрес"
            value={address}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changeAddress}
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.textInput}
            id="description"
            label="описание недвижимости"
            multiline
            rowsMax={4}
            value={description}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changeDescription}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={information.children}
                onChange={changeInformation}
                name="children"
                color="primary"
              />
            }
            label="Возможность проживать с детьми"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={information.animals}
                onChange={changeInformation}
                name="animals"
                color="primary"
              />
            }
            label="возможность проживать с животными"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={convenience.balcony}
                onChange={changeConvenience}
                name="balcony"
                color="secondary"
              />
            }
            label="Наличие балкона"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={convenience.tv}
                onChange={changeConvenience}
                name="tv"
                color="secondary"
              />
            }
            label="Наличие телевизора"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={convenience.washer}
                onChange={changeConvenience}
                name="washer"
                color="secondary"
              />
            }
            label="Наличие стиральной машины"
          />
        </Grid>
        <Grid item>
          <Typography>
            Выберите несколько фотографий недвижимости
          </Typography>
          <input type="file" accept=".png, .jpg, .jpeg" id="file" multiple onChange={changeImages}/>
        </Grid>
        <Grid item>
          <Button onClick={send} variant="contained" color="primary">
            Отправить
          </Button>
        </Grid>
      </Grid>
    </form>

  )
}

const addProperty = (propertyType, address, description, information, convenience, images, history) => {
  let info = [];
  let conv = [];
  for(let key in information){
    if(information[key]){
      info.push(key);
    }
  }
  for(let key in convenience){
    if(convenience[key]){
      conv.push(key);
    }
  }
  sendNewProperty(propertyType, address, description, info, conv)
    .then(resp => resp.json())
    .then(data => {
      addPhotos(images, data.id)
        .then(() => history.push('/allProperty'))
    })
    .catch(error =>alert(error))
}

const checkAdminRole = (history) => {
  if (localStorage.getItem("roles") != null) {
    const roles = localStorage.getItem("roles").split(" ");
    if (roles.indexOf("admin") === -1){
      alert('чтобы добавлять недвижимость, нужно обладать правами администратора')
      history.push('/auth/login');
    }
  }
  else {
    history.push('/auth/login')
  }
}
export default AddingPropertyForm;
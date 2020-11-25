import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {getPhoto, getProperty} from "../api/PropertyApi";
import Typography from "@material-ui/core/Typography";
import {useSinglePropertyStyles} from "../styles/singlePropertyStyles";
import AdminButtons from "./AdminButtons";



const SingleProperty = props => {
  const propertyId = props.match.params.id
  const classes = useSinglePropertyStyles()
  const history = props.history
  const [isAdmin, setIsAdmin] = useState(false)
  const [property, setProperty] = useState({})
  const [information, setInformation] = useState([])
  const [convenience, setConvenience] = useState([])
  const [images, setImages] = useState([])


  useEffect(() => {
    loadProperty(propertyId, setProperty, setImages, setConvenience, setInformation)
    if (localStorage.getItem("roles") != null) {
      const roles = localStorage.getItem("roles").split(" ");
      if (roles.indexOf("admin") !== -1) {
        setIsAdmin(true)
      }
    }
  }, [setProperty])

  return(
    <div>
      <Grid className={classes.mainGrid} container spacing={2} direction = "column">
        <Grid item className={classes.imageGrid}>
        {images.map(img =>
              <img width="250" alt="complex" src={img}/>
        )}
        </Grid>

        <Grid item>
          <Typography variant="h5">
            адрес: {property.address}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">
            тип недвижимости: {property.type}
          </Typography>
        </Grid>

        {information.map(info =>
          <Grid item className={classes.information}>
            <Typography>
              {info}
            </Typography>
          </Grid>
        )}

        {convenience.map(conv =>
          <Grid item className={classes.convenience}>
            <Typography>{conv}</Typography>
          </Grid>
        )}

        <Grid item>
          <Typography>Описание:</Typography>
          <Typography variant="body2">
             {property.description}
          </Typography>
        </Grid>
        <AdminButtons history = {history} isAdmin = {isAdmin} propertyId = {propertyId}/>
      </Grid>
    </div>
  )

}

const loadProperty = (propertyId, setProperty, setImages, setInformation, setConvenience) =>{
  getProperty(propertyId)
    .then(propertyResponseObject => {
      let property = {}
      property.type = propertyResponseObject.type
      property.address = propertyResponseObject.address
      setProperty({...property,address: propertyResponseObject.address})
      property.description = propertyResponseObject.description

      let informationArray = []
      let convenienceArray = []

      propertyResponseObject.information.forEach(info => {
        informationArray.push(info.infoDescription)
      })

      propertyResponseObject.conveniences.forEach(convenience => {
        convenienceArray.push(convenience.convenienceDescription)
      })

      setInformation(informationArray)
      setConvenience(convenienceArray)
      setProperty(property)

      if(propertyResponseObject.photos.length !== 0) {
        propertyResponseObject.photos.forEach(photo => {
          getPhoto(photo.id)
            .then(image => {
              setImages(prevState => [...prevState, image])
            })
        })
      }
    })
}

export default SingleProperty;
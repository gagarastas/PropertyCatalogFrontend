import React, {useEffect, useState} from "react";
import {getAllProperty, getPhoto} from "../api/PropertyApi";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import dummy from "../dummy.jpg"
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import {useAllPropertyStyles} from "../styles/allPropertyStyles";

const AllProperty = props => {
  const history = props.history
  const [allProperty, setAllProperty] = useState([])
  useEffect(() => {
    loadAllProperty(setAllProperty);
  }, [])

  const classes = useAllPropertyStyles()

  const toSingleProperty =(event) => {
    history.push("/property/"+ event.currentTarget.id)
  }

  return(

    <Grid container className={classes.mainGrid}>
      {allProperty.map(property => {
        return(
            <Card className={classes.card} id={property.id} onClick={toSingleProperty}>
              <CardContent>
                <div>
                  <img width="149" alt="complex" src={property.image ? property.image : dummy}/>
                </div>
                <Typography>Адрес: {property.address}</Typography>
                <Typography>{property.type}</Typography>
              </CardContent>
            </Card>
        )
      })}
    </Grid>
  )
}

const loadAllProperty = (setAllProperty) => {
  getAllProperty()
    .then(info => {
      info.forEach(propertyResponseObject => {
        if(propertyResponseObject.photos.length !== 0) {
          let firstPhotoId = propertyResponseObject.photos[0].id
          getPhoto(firstPhotoId)
            .then(img => {
              let property = {}
              property["id"] = propertyResponseObject.id
              property["type"] = propertyResponseObject.type
              property["address"] = propertyResponseObject.address
              property["image"] = img
              setAllProperty(prevState => [...prevState, property])
            })
        }
        else {
          let property = {}
          property["id"] = propertyResponseObject.id
          property["type"] = propertyResponseObject.type
          property["address"] = propertyResponseObject.address
          property["image"] = null
          setAllProperty(prevState => [...prevState, property])
        }

      })
    })
    .catch(er => alert(er))
}

export default AllProperty;
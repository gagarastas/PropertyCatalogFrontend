import {makeStyles} from "@material-ui/core/styles";
import back2 from "../background2.jpg";
import back from '../background.jpg'

const allPropertyStyles = () => ({
  mainGrid:{
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 80,
    background: `url(${back}) repeat`

  },
  card:{
    margin: 25,
    width: 290,
    background:`url(${back2}) repeat`,
    cursor: 'pointer',
    color:'white'
  }
})

export const useAllPropertyStyles = makeStyles(allPropertyStyles, {name:  "AllProperty"})
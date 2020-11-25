import {makeStyles} from "@material-ui/core/styles";
import back from '../background.jpg'

const singlePropertyStyles = () => ({
  mainGrid: {
    paddingTop: 70
  },
  information: {
    color: '#6B8E23',
  },
  convenience: {
    color: '#DAA520',
  },
  imageGrid: {
    background:`url(${back}) repeat`,
  }

})

export const useSinglePropertyStyles = makeStyles(singlePropertyStyles, {name:  "SingleProperty"})
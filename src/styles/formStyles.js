import {makeStyles} from "@material-ui/core/styles";

const formStyles = () => ({
  textInput:{
    width:600
  },
  mainGrid:{
    paddingTop: 80,
  }

})

export const useFormStyles = makeStyles(formStyles, {name:  "Form"})
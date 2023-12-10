import {createTheme} from "@mui/material/styles";
import { Regular, Italic, Bold, SemiBold } from "./Assets/Fonts/Fonts.js";
const mainTheme = createTheme({
    palette: {
      primary: {
        main:'#cc3d38', //red
        light: 'rgba(66,36,12,45%)', //brown opacity
        contrastText: 'rgba(250, 185, 154, 40%)', //beige opacity
      },

      secondary: {
        main: '#42240c', //brown
        light: '#fdba9a', //beige
        }
    },
    
    overrides: {
      Card: { // Name of the component / style sheet
        root: { // Name of the rule
          backgroundColor:'rgba(66,36,12,45%)', // Some CSS
        },
      },
    },

    typography: {
      bold: Bold,
      italic: Italic,
      semiBold: SemiBold,
      regular: Regular,
      fontFamily:'Josefin Sans',
    }
      
    }
);

export default mainTheme;
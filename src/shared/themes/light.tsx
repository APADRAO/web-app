import { createTheme } from '@mui/material'
import { blue, cyan, grey, yellow } from '@mui/material/colors';
import { dark, light } from '@mui/material/styles/createPalette';

export const LightTheme = createTheme({
    palette:{
        primary:{
            main: grey[800],
            dark: grey[900],
            light:grey[700],
            contrastText: '#ffffff'
        },
        secondary:{
            main: cyan[700],
            dark: cyan[800],
            light:cyan[500],
            contrastText: '#ffffff'
        },
        background:{
            paper:'#ffffff',
            default: blue[900]
        }
    }
});
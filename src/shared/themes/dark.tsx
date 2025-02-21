import { createTheme } from '@mui/material'
import { blue, cyan, grey, yellow } from '@mui/material/colors';
import { dark, light } from '@mui/material/styles/createPalette';

export const DarkTheme = createTheme({
    palette:{
        primary:{
            main: grey[700],
            dark: grey[800],
            light:grey[500],
            contrastText: '#ffffff'
        },
        secondary:{
            main: cyan[700],
            dark: cyan[800],
            light:cyan[500],
            contrastText: '#ffffff'
        },
        background:{
            paper:'#303134',
            default:'#202124' 
        }
    }
});
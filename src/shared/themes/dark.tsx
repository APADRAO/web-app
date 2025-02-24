import { createTheme } from '@mui/material'
import { blue, cyan, grey, yellow } from '@mui/material/colors';
import { dark, light } from '@mui/material/styles/createPalette';

export const DarkTheme = createTheme({
    palette:{
        mode: 'dark',
        primary:{
            main: grey[300],
            dark: grey[400],
            light:grey[100],
            contrastText: '#fffffff',
            
        },
        secondary:{
            main: cyan[300],
            dark: cyan[400],
            light:cyan[100],
            contrastText: '#fffffff'
        },
        background:{
            paper:'#303134',
            default:'#202124' 
        }
    },
    typography:{
        allVariants:{
        color: 'white',
        }
    }
});
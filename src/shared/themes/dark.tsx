import { createTheme } from '@mui/material'
import { blue, cyan, grey, yellow } from '@mui/material/colors';
import { dark, light } from '@mui/material/styles/createPalette';

export const DarkTheme = createTheme({
    palette:{
        mode: 'dark',
        primary:{
            main: grey[600],
            dark: grey[900],
            light:grey[100],
            contrastText: '#fffffff',
            
        },
        secondary:{
            main: cyan[600],
            dark: cyan[900],
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
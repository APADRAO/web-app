import { Box, Button, Card, CardActions, CardContent, CircularProgress, LinearProgress, TextField, Typography } from "@mui/material"
import { useAuthContex } from "../../contexts"
import { useState } from "react";
import * as yup from 'yup'

const loginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(5)
})

interface ILoginProps{
    children:React.ReactNode
}
export const Login: React.FC<ILoginProps> = ({children}) =>{
    const {isAuthenticated, login} = useAuthContex();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEntrar =()=>{
        setIsLoading(true);
        loginSchema.validate({email,password}, {abortEarly:false})
        .then(dadosValidados =>{
            login(dadosValidados.email, dadosValidados.password).then(
                ()=>{
                    setIsLoading(false);
                }
            );
        })
        .catch((errors: yup.ValidationError)=>{            
            setIsLoading(false);
            errors.inner.forEach(error => {
                if(error.path ==='email') {
                    setEmailError(error.message)
                }
                if(error.path === 'password'){
                    setPasswordError(error.message)
                }                
            });
        })

    }

    if(isAuthenticated) return(
        <>{children}</>
    );


    return(
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant="h6" align="center">Login</Typography>
                        <TextField
                        fullWidth
                        label='Email' 
                        type='email'
                        value={email}
                        disabled={isLoading}
                        error={!!emailError}
                        helperText={emailError}
                        onKeyDown={e=>setEmailError('')}
                        onChange={e=>setEmail(e.target.value)}/>
                        <TextField
                        fullWidth
                        label='Senha'
                        type="password" 
                        value={password}
                        disabled={isLoading}
                        error={!!passwordError}
                        helperText={passwordError}
                        onChange={e=>setPassword(e.target.value)}
                        onKeyDown={e=>setPasswordError('')} />
                    </Box>

                </CardContent>
                <CardActions>
                    <Box  width='100%'  display='flex' alignItems='center' justifyContent='center'>
                        <Button
                        variant='contained'
                        disabled={isLoading}
                        onClick={handleEntrar}
                        endIcon={
                            isLoading ?<CircularProgress variant="indeterminate" color="inherit" size={28}/>:undefined}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
           
        </Box>
    )

}
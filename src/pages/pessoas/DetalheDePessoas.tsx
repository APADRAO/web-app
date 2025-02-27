import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramenasDeDetalhe } from "../../shared/components";
import { useEffect, useRef, useState } from "react";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasService";
import { Box, Grid, Grid2, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { VtextField } from "../../shared/forms";
import { FormHandles, Scope } from "@unform/core";

interface IFormData{
    cidadeid:number
    nomeCompleto: string,
    email: string
}
export const DetalheDePessoas: React.FC = () =>{
    const {id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const formRef = useRef<FormHandles>(null)

    useEffect(()=>{
        if(id!=='nova'){
            setIsLoading(true)
            PessoasServices.geById(Number(id))
            .then((result)=>{
                setIsLoading(false)
                if(result instanceof Error){
                    alert(result.message);
                    navigate('/pessoas');
                }else{
                    setNome(result.nomeCompleto);
                    formRef.current?.setData(result);
                }
            })
        }

    },[id])

    const handleSave = (dados:IFormData) =>{
        setIsLoading(true)
        if(id=='nova'){
            PessoasServices.create(dados).then(
                (result)=>{
                    setIsLoading(false)
                    if(result instanceof Error){
                        alert(result.message);
                    }else{
                        navigate(`/pessoas/detalhe/${result}`)
                        alert('Criado com sucesso');
                    }
                }
            )            
        }else{
            PessoasServices.updateById({id:Number(id), ...dados}).then(
                (result)=>{
                    setIsLoading(false)
                    if(result instanceof Error){
                        alert(result.message);
                    }else{
                        navigate(`/pessoas/detalhe/${id}`)
                        alert('Alterado com sucesso');
                    }
                }
            )      
        }
    }

    const handleDelete = (id:number) =>{
        if(window.confirm('Realmente deseja apagar?')){
                    PessoasServices.deleteById(id)
                    .then(result =>{
                        if(result instanceof Error){
                            alert(result.message);
                        }else{
                            alert('Apagado com sucesso!');
                            navigate('/pessoas');
                        }
                    });
                }
    }

    return (
    <LayoutBaseDePagina titulo={id=='nova'?'Nova Pessoa':nome} 
    barraDeFerramentas={
        <FerramenasDeDetalhe 
            textoBotaoNovo="Nova"
            mostrarBotaoSalvarEFechar
            mostrarBotaoApagar={id!='nova'}
            mostrarBotaoNovo={id!='nova'}

            aoClicarEmSalvar={()=>formRef.current?.submitForm()}
            aoClicarEmSalvarEFechar={()=>formRef.current?.submitForm()}
            aoClicarEmApagar={()=>handleDelete(Number(id))}
            aoClicarEmNovo={()=> navigate('/pessoas/detalhe/nova')}
            aoClicarEmVoltar={()=>navigate('/pessoas')}
        />
    }>
        
        <Form ref={formRef} onSubmit={handleSave} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
       <Box margin={1} display='flex' flexDirection='column' component={Paper}>
       {isLoading&&(
        <Grid2  padding={2} spacing={2}>
            <LinearProgress variant='indeterminate'/>
        </Grid2>)}
        <Grid2  padding={2} spacing={2}>
            <Typography variant="h6">Geral</Typography>
        </Grid2>
        <Grid2 container direction='column' padding={2} spacing={2}>
            <Grid2 container direction="row" >
                <Grid2 size={12}>
                    <VtextField 
                    fullWidth
                    name="nomeCompleto"
                    label="Nome Completo"
                    disabled={isLoading}
                    onChange={e=>setNome(e.target.value)}
                    />
                </Grid2>
            </Grid2>
            <Grid2 container direction="row" >
                <Grid2 size={12}>
                    <VtextField  
                    fullWidth
                    name="email"
                    label="Email"
                    disabled={isLoading}
                    />
                </Grid2>
            </Grid2>
            <Grid2 container direction="row" >
                <Grid2 size={12}>
                    <VtextField  
                    fullWidth
                    name="cidadeid"
                    label="Cidade"
                    disabled={isLoading}
                    />
                </Grid2>
            </Grid2>
        </Grid2>
       </Box>
        

        {/*[1,2,3,4].map((_,index)=>(
            <Scope key='' path={`endereco[${index}]`}>
                <VtextField name='rua'/>
                <VtextField name='numero'/>
                <VtextField name='estado'/>
                <VtextField name='cidade'/>
                <VtextField name='pais'/>
            </Scope>

        ))*/}
        </Form>
        {/*isLoading&&(
            <LinearProgress variant='indeterminate'/>
        )*/}
        
    </LayoutBaseDePagina>
    );
}
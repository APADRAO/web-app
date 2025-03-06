import { useNavigate, useParams } from "react-router-dom"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";
import { FerramenasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { CidadesServices } from "../../shared/services/api/cidades/CidadesService";
import { Box, Grid2, LinearProgress, Paper, Typography } from "@mui/material";
import { VtextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import * as yup from 'yup';

interface IFormData{
    nome:string
    uf: string
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
    uf: yup.string().required().min(2)
})

export const DetalheDeCidades: React.FC = () =>{
    const {id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    const {formRef, save, saveAndNew, saveAndClose, isSaveAndNew, isSaveAndClose} = useVForm();


    useEffect(()=>{
        if(id!=='nova'){
            setIsLoading(true)
            CidadesServices.geById(Number(id))
            .then((result)=>{
                setIsLoading(false)
                if(result instanceof Error){
                    alert(result.message);
                    navigate('/cidades');
                }else{
                    setNome(result.nome);
                    formRef.current?.setData(result);
                }
            })
        }else{
            formRef.current?.setData?.({
                nome: '',
                uf:''
            })
        }

    },[id])

    const handleSave = (dados:IFormData) =>{
        formValidationSchema.
        validate(dados, {abortEarly: false})
        .then((dadosValid)=>{
            setIsLoading(true)
            if(id=='nova'){
                CidadesServices.create(dadosValid).then(
                    (result)=>{
                        setIsLoading(false)
                        if(result instanceof Error){
                            alert(result.message);
                        }else{
                            if(isSaveAndClose()){
                                navigate('/cidades');
                            }else{
                                navigate(`/cidades/detalhe/${result}`)
                            }  
                            alert('Criado com sucesso');
                        }
                    }
                )            
            }else{
                CidadesServices.updateById({id:Number(id), ...dadosValid}).then(
                    (result)=>{
                        setIsLoading(false)
                        if(result instanceof Error){
                            alert(result.message);
                        }else{
                            if(isSaveAndClose()){
                                navigate('/cidades');
                            }else{
                                navigate(`/cidades/detalhe/${id}`)
                            }  
                            alert('Alterado com sucesso');
                        }
                    }
                )      
            }
        })
        .catch((error: yup.ValidationError)=>{
            const validationErrors: IVFormErrors  = {};
            error.inner.forEach(error=>{
                if(!error.path) return;
                validationErrors[error.path] = error.message
            })
            formRef.current?.setErrors(validationErrors)
        });

       
    }

    const handleDelete = (id:number) =>{
        if(window.confirm('Realmente deseja apagar?')){
                    CidadesServices.deleteById(id)
                    .then(result =>{
                        if(result instanceof Error){
                            alert(result.message);
                        }else{
                            alert('Apagado com sucesso!');
                            navigate('/cidades');
                        }
                    });
                }
    }

    return (
    <LayoutBaseDePagina titulo={id=='nova'?'Nova Cidade':nome} 
    barraDeFerramentas={
        <FerramenasDeDetalhe 
            textoBotaoNovo="Nova"
            mostrarBotaoSalvarEFechar
            mostrarBotaoApagar={id!='nova'}
            mostrarBotaoNovo={id!='nova'}

            aoClicarEmSalvar={save}
            aoClicarEmSalvarEFechar={saveAndClose}
            aoClicarEmApagar={()=>handleDelete(Number(id))}
            aoClicarEmNovo={()=> navigate('/cidades/detalhe/nova')}
            aoClicarEmVoltar={()=>navigate('/cidades')}
        />
    }>
        <VForm ref={formRef} onSubmit={handleSave} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
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
                            name="nome"
                            label="Nome"
                            disabled={isLoading}
                            onChange={e=>setNome(e.target.value)}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 container direction="row" >
                        <Grid2 size={12}>
                            <VtextField  
                            fullWidth
                            name="uf"
                            label="UF"
                            disabled={isLoading}
                            />
                        </Grid2>
                    </Grid2>                    
                </Grid2>
            </Box>
        </VForm>
    </LayoutBaseDePagina>
    );
    
}

/*
     {[1,2,3,4].map((_,index)=>(
            <Scope key='' path={`endereco[${index}]`}>
                <VtextField name='rua'/>
                <VtextField name='numero'/>
                <VtextField name='estado'/>
                <VtextField name='cidade'/>
                <VtextField name='pais'/>
            </Scope>

        ))}
        {isLoading&&(
            <LinearProgress variant='indeterminate'/>
        )}
         */
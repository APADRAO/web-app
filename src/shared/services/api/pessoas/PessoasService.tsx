import { Environment } from '../../../environment/environment';
import {Api} from '../axios-config';

interface IListagenPessoa{
    id: number,
    cidadeid:number
    nomeCompleto: string,
    email: string
}
interface IDetalhePessoa{
    id: number,
    cidadeid:number
    nomeCompleto: string,
    email: string
}

type TPessoasComTotalCount ={
    data: IListagenPessoa[],
    totalCount: number;
}

const getAll = async (page=1, filter = ''):Promise<TPessoasComTotalCount | Error> =>{

    try {
        const urlRelativa = `pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeComplemento_like${filter}`
        const {data, headers} = await Api.get(urlRelativa);
        if(data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }
        return new Error('Erro ao listar registros');

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao listar registros');
    }
}

const geById = async ():Promise<any> =>{

}

const create = async ():Promise<any> =>{

}

const updateById = async ():Promise<any> =>{

}

const deleteById = async ():Promise<any> =>{

}


export const PessoasServices = {
    getAll,    
    geById,    
    create,    
    updateById,    
    deleteById,
};
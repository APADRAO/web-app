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

const geById = async (id:number):Promise<TPessoasComTotalCount | Error> =>{
    try {
        const urlRelativa = `pessoas/${id}`
        const {data, headers} = await Api.get(urlRelativa);
        if(data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }
        return new Error('Erro ao consultar registro');

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao consultar registro');
    }
}

const create = async (dados: Omit<IDetalhePessoa, 'id'>):Promise<number | Error> =>{
    try {
        const urlRelativa = `pessoas`
        const {data} = await Api.post<IDetalhePessoa>(urlRelativa, dados);
        if(data){
            return  data.id;
        }
        return new Error('Erro ao inserir registros');

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao inserir registros');
    }
}

const updateById = async (dados: IDetalhePessoa):Promise<void | Error> =>{
    try {
        const urlRelativa = `pessoas/${dados.id}`
        const {data} = await Api.put(urlRelativa, dados);
        
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao atualizar registro');
    }
}

const deleteById = async (id:number):Promise<void | Error> =>{
    try {
        const urlRelativa = `pessoas/${id}`
        const {data} = await Api.delete(urlRelativa);
        
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao apagar registro');
    }
}


export const PessoasServices = {
    getAll,    
    geById,    
    create,    
    updateById,    
    deleteById,
};
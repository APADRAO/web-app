import { Environment } from '../../../environment/environment';
import {Api} from '../axios-config';

export interface IListagenCidade{
    Idcidade: number,
    Nmcidade: string,
    Iduf:string
}
export interface IDetalheCidade{
    Idcidade: number,
    Nmcidade: string,
    Iduf:string
}

export type TCidadesComTotalCount ={
    data: IListagenCidade[],
    totalCount: number;
}

const getAll = async (page=1, filter = ''):Promise<TCidadesComTotalCount | Error> =>{

    try {
        const urlRelativa = `/api/v3/Localidade/GetCidade?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`
        const {data, headers} = await Api.get(urlRelativa);
        if(data){
            if(data.status){
                return {
                    data,
                    totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
                }
            }
           
        }
        return new Error('Erro ao listar registros');

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao listar registros');
    }
}

const geById = async (id:number):Promise<IDetalheCidade | Error> =>{
    try {
        const urlRelativa = `Cidades/${id}`
        const {data, headers} = await Api.get(urlRelativa);
        if(data){
            return  data
        }
        return new Error('Erro ao consultar registro');

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao consultar registro');
    }
}

const create = async (dados: Omit<IDetalheCidade, 'Idcidade'>):Promise<number | Error> =>{
    try {
        const urlRelativa = `Cidades`
        const {data} = await Api.post<IDetalheCidade>(urlRelativa, dados);
        if(data){
            return  data.Idcidade;
        }
        return new Error('Erro ao inserir registros');

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao inserir registros');
    }
}

const updateById = async (dados: IDetalheCidade):Promise<void | Error> =>{
    try {
        const urlRelativa = `Cidades/${dados.Idcidade}`
        await Api.put(urlRelativa, dados);
        
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao atualizar registro');
    }
}

const deleteById = async (id:number):Promise<void | Error> =>{
    try {
        const urlRelativa = `Cidades/${id}`
        await Api.delete(urlRelativa);
        
    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || ' Erro ao apagar registro');
    }
}


export const CidadesServices = {
    getAll,    
    geById,    
    create,    
    updateById,    
    deleteById,
};
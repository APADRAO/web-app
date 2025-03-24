import { Api } from "../axios-config";

interface IAuth{
  status?: boolean,
  message?: string
  tp?: number,
  dados?: {
    role?: {
      roleId?: number,
      roleNome?: string,
      roleDescricao?: string,
      roleDtCriacao?: Date,
      roleFgAtivo?: number,
      roleDtAlteracao?: Date,
      tbHabilitaWebits?: [],
      tbUsuarios?: []
    },
    token?: string,
    user?: string,
    authentication?: string
  },
  arquivo?: any
}

interface IPstUser{
    userName: string,
    pass: string
}


const auth = async (email:string, password:string):Promise<IAuth | Error> =>{
    const pst:IPstUser={
        userName: email,
        pass:password
    }
    try {
        const urlRelativa = `/Authentication/v2/`
        const {data} = await Api.post(urlRelativa,pst);
        if(data){
            return  data
        }
        return new Error('Erro no Login');

    } catch (error) {
        console.error(error);
        return new Error((error as {message:string}).message || 'Erro no Login');
    }
}
export const AuthService ={
auth
}
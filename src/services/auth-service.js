import LocalStorageService from './local-storage-service'

export const ADMIN_LOGADO = '_admin_logado'

export default class AuthService{


    static isAdminAutenticado(){
        const admin = LocalStorageService.obterItem(ADMIN_LOGADO)
        return admin
    }

    static removerAdminAutenticado(){
        LocalStorageService.removerItem(ADMIN_LOGADO)
    }

    static logar(admin){
        LocalStorageService.addItem(ADMIN_LOGADO,admin)
    }



}
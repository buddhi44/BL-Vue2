import {} from 'vue'
import AuthenticationManager from './authentication/AuthenticationManager'

export const ManagerPlugin = (app:any,options:any) => {
    app.provide("AuthenticationManager",new AuthenticationManager())
}
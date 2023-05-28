import react,{ createContext, useEffect, useState } from "react";
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const singnIn = (email,password) =>{
        Axios.post('http://192.168.1.13:3001/login', {
            email:email,
            password:password
        })
        .then((res) => {
            if(res.data.erro === false){
                const token = res.data.token
                console.log(token);
                AsyncStorage.setItem('tokenUser',token)
                console.log("logou");
                setError(null)
            }
        })
        .catch((erro) => {
            console.log(erro);
            setError("Email ou senha incorreta!")
        })
        
    }

    
    
    return( 
    <AuthContext.Provider value={{isLoading,user,singnIn}}>
        {children}
    </AuthContext.Provider>)
}


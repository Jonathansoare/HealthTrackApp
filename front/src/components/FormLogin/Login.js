import { useNavigation } from "@react-navigation/native";
import react,{ useState,useEffect, useContext } from "react";
import { Controller, set, useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Text,TextInput,View,TouchableOpacity,Vibration,Pressable,Keyboard, TouchableWithoutFeedback} from "react-native";
import styles from "./style";
import Axios from "axios";
import Api from "../../assets/api/index"
import Spinner from "react-native-loading-spinner-overlay/lib";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from "../../assets/api/index";

const schema = yup.object({
    email: yup.string().email("Email Invalido").required("Informe seu email"),
    password: yup.string().required("Informe sua senha")

})

export default function FormLogin(){
    const { control, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })
    AsyncStorage.getItem('UserToken').then((res) => setToken(res))
    const [error,setError] = useState(null)
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const[check,setIsCheck] = useState(true)
    const [IconName, setIconName] = useState('')
    const [token,setToken] = useState()

    function handleSingIn(data){
        userValidation(data)
        
    }

    function toggle(){
        if(check === false){
            setIsCheck(true)
            setIconName('')
        }
        else{

            setIsCheck(false)
            setIconName('check-bold')
            
        }
}

    function userValidation(data){
        setIsLoading(true)
        const {email, password} = data
        Axios.post(`${Api}/login`, {
            email:email,
            password:password
        })
        .then((res) => {
            if(res.data.erro === false){
                const id = String(res.data.id)
                const token = res.data.token
                AsyncStorage.setItem("UserId",id)
                AsyncStorage.setItem("UserToken",res.data.token)
                navigation.navigate("TabBarRoute")
                setIsLoading(false)
                setError(null)
            }
        })
        .catch((error) => {
            setIsLoading(false)
            console.log(error);
            setError("Email ou senha incorreta")
            setTimeout(() => {
                setError(null)
            }, 3000);
        })
        
    }

    function validationToken(token){
        setIsLoading(true)
        Axios.get(`${api}/validationToken`,{
            headers: { 'Authorization': `Bearer ${token}`}
        }).then((res) => {
            navigation.navigate("TabBarRoute")
            setIsLoading(false)
        }).catch((e) => 
        console.log("ERRO: ",e),setIsLoading(false))
    }

    useEffect(() => {
        if(token){validationToken(token)}
    },[token])

    return(
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
            <Spinner visible={isLoading} size={50} textContent='Carregando...' color='white' textStyle={{color:"white"}}/>
                <Text style={styles.formLabel}>Email</Text>
                <Controller 
                    control={control}
                    name="email"
                    render={({field: {onChange,onBlur,value}}) => (    
                        <TextInput 
                            style={[styles.input, {
                                borderWidth: errors.email && 1,
                                borderColor:errors.email && "#FF375b"
                            }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Digite seu email"
                        />
                    )}
                />
                {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}
                

                <Text style={styles.formLabel}>Senha</Text>
                <Controller 
                    control={control}
                    name="password"
                    render={({field: {onChange,onBlur,value}}) => (    
                        <TextInput 
                            style={[styles.input, {
                                borderWidth: errors.password && 1,
                                borderColor:errors.password && "#FF375b"
                            }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Digite sua senha"
                            secureTextEntry={check}
                        />
                    )}
                />
                {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text> || error && <Text style={styles.labelError}>{error}</Text>}

                <View style={styles.containerCheckBox}>
                    <View style={styles.optionContainerCheckBox}>
                            <TouchableOpacity 
                            style={styles.touchable}
                            onPress={() => toggle()}>
                                <MaterialCommunityIcons name={IconName} size={16} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.titleCheckBox}>Mostra senha</Text>
                    </View>
                </View>  


                <TouchableOpacity
                    style={styles.buttonCalculator}
                    onPress={handleSubmit(handleSingIn)}>
                    <Text style={styles.textButtonCalculator}>Login</Text>
                </TouchableOpacity>

               <Text style={styles.textLinkA}>Não tem conta?  <Text style={styles.textLinkH} onPress={() => navigation.navigate('Cadastro')}>Cria conta</Text></Text>
            </View>
        </Pressable>
    )
}
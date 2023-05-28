import { useNavigation } from "@react-navigation/native";
import { Text,TextInput,View,TouchableOpacity,Pressable,Keyboard} from "react-native";
import styles from "./style";
import { Controller, useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import { TextInputMask } from "react-native-masked-text";
import {useState} from "react";
import Spinner  from "react-native-loading-spinner-overlay"
import axios from "axios";
import Api from "../../assets/api/index"
import { MaterialCommunityIcons } from '@expo/vector-icons';


const schema = yup.object({
    name: yup.string().required("Informe seu nome."),
    email: yup.string().email("Email Invalido").required("Informe seu email."),
    password: yup.string().min(6,"A senha deve ter pelo memos 6 digitos").required("Informe sua senha."),
    data_age:yup.string().required("Informe sua data de nascimento."),
    altura:yup.string().required("Informe sua altura.")

})

export default function FormRegister(){
    const navigation = useNavigation()
    const { control, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema) })

    const [errorIdade,setErrorIdade] = useState(null)
    const [error,setError] = useState(null)

    const[check,setIsCheck] = useState(true)
    const [IconName, setIconName] = useState('')

    const [isLoading, setIsLoading] = useState(false)

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

    function handleSing(data){
        const {name,email,password,data_age,altura} = data
        if(calculaIdade(trasformDataNasc(data)) !== true){
            cadastrar(name,email,password,data_age,altura)
        }
    }

    function cadastrar(name,email,password,data_age,altura){
        setIsLoading(true)
        axios.post(`${Api}/cadastrar`,{
            name,
            email,
            password,
            data_age,
            altura
        })
        .then(() => {
            setIsLoading(true)
            navigation.navigate("Login")
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false)
            setError("Usuario ja cadastrado")
            setTimeout(() => {
                setError(null)
            }, 4000);
        })
    }

    function trasformDataNasc(data){
        const date = (data.data_age.split('/'))
        const dia = parseInt(date[0])
        const mes = parseInt(date[1])
        const ano = parseInt(date[2])
        const dataNascimento = (`${ano}-${mes}-${dia}`)
        
        const dataNew = new Date(dataNascimento);
        const dataFormatada = dataNew.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        // console.log(`dataNew: ${dataNew}`);
        // console.log(`dataFormatada: ${dataFormatada}`);
        // console.log(`dataNascimento: ${dataNascimento}`);
        return dataFormatada
    }

    function calculaIdade(dataNasc){ 
        const  dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const anoNascParts = dataNasc.split('/');
        const diaNasc =anoNascParts[0];
        const mesNasc =anoNascParts[1];
        const anoNasc =anoNascParts[2];
        let idade = anoAtual - anoNasc;
        const mesAtual = dataAtual.getMonth() + 1; 
        //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
 if(mesAtual < mesNasc){
    idade--; 
    } else {
    //Se estiver no mes do nascimento, verificar o dia
    if(mesAtual == mesNasc){ 
    if(new Date().getDate() < diaNasc ){ 
    //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
    idade--; 
    }
    }
    } 
    if(idade < 18){
        setErrorIdade("Precisar ter pelo menos 18 anos")
        setTimeout(() => {
            setErrorIdade(null)
        }, 3000);
        return true
    }
    return idade; 
   }



  return(
    
      <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
        
        <View style={styles.form}>
        <Spinner visible={isLoading}/>

          <Text style={styles.formLabel}>Nome Completo</Text>
            <Controller 
                control={control}
                name="name"
                render={({field: {onChange,onBlur,value}}) => (    
                    <TextInput 
                        style={[styles.input, {
                            borderWidth: errors.email && 1,
                            borderColor:errors.email && "#FF375b"
                        }]}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Digite seu nome"
                    />
                )}
            />
            {errors.name && <Text style={styles.labelError}>{errors.name?.message}</Text>}


            <Text style={styles.formLabel}>Data de nascimento</Text>
            <Controller 
                control={control}
                name="data_age"
                render={({field: {onChange,onBlur,value}}) => (    
                    <TextInputMask
                    style={[styles.input, {
                        borderWidth: errors.email && 1,
                        borderColor:errors.email && "#FF375b"
                    }]}
                    type="datetime"
                    options={{
                        format:"DD/MM/YYYY"
                    }}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite sua data de nascimento"
                    keyboardType="number-pad"
                    />
                )}
            />
            {errors.data_age && <Text style={styles.labelError}>{errors.data_age?.message}</Text>}
            {errorIdade && <Text style={styles.labelError}>{errorIdade}</Text>}


            <Text style={styles.formLabel}>Altura</Text>
            <Controller 
                control={control}
                name="altura"
                render={({field: {onChange,onBlur,value}}) => (    
                    <TextInput 
                        style={[styles.input, {
                            borderWidth: errors.email && 1,
                            borderColor:errors.email && "#FF375b"
                        }]}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Digite sua altura... (Ex:1.80)"
                        keyboardType="number-pad"
                    />
                )}
            />
            {errors.altura && <Text style={styles.labelError}>{errors.altura?.message}</Text>}

            
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
                style={styles.buttonCadastro}
                onPress={handleSubmit(handleSing)}
            >
                <Text style={styles.textButtonCadastro}>Cadastrar</Text>
            </TouchableOpacity>

            <Text style={styles.textLinkA}>Ja tem conta?  <Text style={styles.textLinkH} onPress={() => navigation.navigate('Login')}>Entrar</Text></Text>
          </View>
      </Pressable>
)}

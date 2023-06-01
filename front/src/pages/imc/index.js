import React, { useEffect, useState } from 'react';
import { View,Text,SafeAreaView,StyleSheet, TextInput,TouchableOpacity,RefreshControl,FlatList } from 'react-native';
import Header from "../../components/Header/Header"
import TextHistory from '../../components/TextHistory';
import axios from 'axios';
import api from "../../assets/api/index"
import Spinner from 'react-native-loading-spinner-overlay/lib'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts,Roboto_400Regular,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_100Thin_Italic,
} from "@expo-google-fonts/roboto"
import TitleMain from '../../components/TitleMain';


export default function Imc() {
  AsyncStorage.getItem('idUser').then((res) => setId(res));
  const [id,setId] = useState()
  const [user,setUser] = useState()
  const [isLoading,setIsLoading] = useState(false)
  const [peso,setPeso] = useState()
  const [listImc,setListImc] = useState(null)
  const [msg,setMsg] = useState()
  const [msgErro,setMsgErro] = useState()
  const [refresh,setRefresh] = useState()

  function Refresh(){
    setRefresh(true)
    setIsLoading(true)
    buscarImc(id)
    buscarPeso(id)
    buscarUser(id)
    setTimeout(() => {
      setIsLoading(false)
      setRefresh(false)
    }, 1000);
}
function formatDate() {
  const date = new Date()
  const mes = date.getMonth() + 1
  const dia = date.getDate()
  const ano = date.getFullYear()
  const mesFormt = ''
  if(mes <= 9){
   return (`${dia}/${'0' + mes}/${ano}`);
  }
  if(dia <= 9){
    return (`${'0' + dia}/${mes}/${ano}`);
  }
}

  function calcularIMC(peso, altura) {
    /*
     * Calcula o Índice de Massa Corporal (IMC) de uma pessoa e retorna a categoria de peso correspondente.
     * peso: O peso da pessoa em quilogramas (kg).
     * altura: A altura da pessoa em metros (m).
     * Retorna um objeto com o IMC calculado e a categoria de peso correspondente.
     */
    var imc = peso / (altura ** 2);
    var categoria;
  
    if (imc < 18.5) {
      categoria = "Abaixo do peso";
    } else if (imc < 25) {
      categoria = "Peso normal";
    } else if (imc < 30) {
      categoria = "Sobrepeso";
    } else if (imc < 35) {
      categoria = "Obesidade grau 1";
    } else if (imc < 40) {
      categoria = "Obesidade grau 2";
    } else {
      categoria = "Obesidade grau 3 (obesidade mórbida)";
    }
  
    return { imc: imc, categoria: categoria };
  }

  function cadastraImc(peso,altura){
    if(peso === undefined || peso === ' '){
      setMsgErro("Campo vazio.")
      setTimeout(() => {
        setMsgErro()
      }, 5000);
    }
    else{
      setIsLoading(true)
      const data = formatDate()
      axios.post(`${api}/cadastrarImc`, {
        imc:calcularIMC(peso,altura).imc.toFixed(2),
        data_age:data,
        idUser:id,
        categoria:calcularIMC(peso,altura).categoria
      })
      .then(() => {
        setIsLoading(false)
        setMsg("imc cadastrado com sucesso.")
        buscarImc(id)
        setTimeout(() => {
          setMsg('')
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  async function buscarPeso(id){
    const dados = await axios.get(`${api}/search/weight/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      //console.log(lista[0].peso); pega o ultimo peso adicionado na tabala
      const dados = lista[0]
      if(dados){
        setPeso(lista[0].peso)
        console.log("LOG IMC: peso pego com sucesso.");
      }
      else{
        console.log("nao tem peso");        
      }
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  async function buscarUser(id){
    const dados = await axios.get(`${Api}/search/${id}`)
    .then((res) => {
      const user = res.data.result[0]
      if(user){
        setUser(user)
      }
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  async function buscarImc(id){
    const dados = await axios.get(`${api}/search/imc/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      //console.log(lista[0].imc); pega o ultimo imc adicionado na tabala
      setListImc(lista)
      console.log("LOG IMC: imc pego com sucesso.");
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  };

  useEffect(() => {
    setIsLoading(true)
    buscarImc(id)
    buscarPeso(id)
    buscarUser(id)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  },[id]);

 return (
   <>
    <Spinner visible={isLoading} size={50} textContent='Carregando...' color='white' textStyle={{color:"white"}}/>
      <SafeAreaView style={styles.container}>
      <Header nameIcon="user" navigate="user" imagem={!user ? undefined : user.img}/>
      <TitleMain name="Imc"/>
      <View style={styles.containerForm}>
          <Text style={styles.textForm}>Calcular Imc</Text>
          <Text style={styles.textSecund}>Peso atual</Text>
          <TextInput style={styles.input} placeholder='Ex: 65.5' placeholderTextColor="white" keyboardType='number-pad' value={!peso ? '' : peso} onChangeText={setPeso} defaultValue={!peso  ? "" : peso}/>
          {msg && <Text style={styles.mensagem}>{msg}</Text> || <Text style={styles.mensagemErro}>{msgErro}</Text>}
            
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => cadastraImc(peso,1.80)}>
            <Text style={styles.textButtonCalculator}>Calcular imc</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.containerHistory}>
        <Text style={styles.textHistory}>Historico</Text>
        <FlatList data={listImc} renderItem={({item}) => <TextHistory colorIcon="#afb42b" icon="calculator" peso={item.imc} date={item.data_age} textSecund=" IMC"></TextHistory>} 
        refreshControl={
          <RefreshControl 
          refreshing={refresh}
          onRefresh={() => Refresh()}/>
        }/>
      </View>
    </SafeAreaView>
   </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
      backgroundColor:"#141414",
  },
  containerForm:{
    backgroundColor:"#202020",
    width:"90%",
    height:240,
    alignSelf:"center",
    marginTop:20,
    borderRadius:20,
  },
  containerHistory:{
    backgroundColor:"#202020",
    width:"90%",
    height:"50%",
    alignSelf:"center",
    marginTop:20,
    borderRadius:15,
    marginBottom:10
  },
  input:{
    width:"90%",
    height:40,
    backgroundColor:"#303030",
    alignSelf:"center",
    color:"#FFF",
    fontSize:18,
    paddingLeft:8,
    borderRadius:20,
    marginTop:10,
  },
  textHistory:{
    fontSize:24,
    color:"white",
    paddingStart:20,
    paddingEnd:10,
    marginTop:10,
    marginBottom:10,
    fontFamily:"Roboto_400Regular"
  },
  textHistoryCenter:{
    fontSize:30,
    color:"white",
    fontFamily:"Roboto_400Regular_Italic",
    display:"flex",
    flexDirection:"row",
    alignSelf:"center",
    justifyContent:"center",
    marginTop:10

  },
  textForm:{
    fontSize:24,
    color:"white",
    paddingStart:10,
    paddingEnd:10,
    marginTop:10,
    marginBottom:10,
    alignSelf:"center",
    fontFamily:"Roboto_400Regular"
  },

  buttonCalculator: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#FF0043",
    paddingTop: 10,
    paddingBottom: 14,
    marginLeft: 12,
    marginTop: 20,
  },
  textButtonCalculator: {
    fontSize: 20,
    color: "#ffffff",
  },
  mensagem:{
    color:"green",
    paddingLeft:20,
    fontSize:16,
    marginTop:10,
  },
  mensagemErro:{
    color:"red",
    paddingLeft:20,
    fontSize:16,
    marginTop:10,
  },
  textSecund:{
    color:'white',
    fontSize:16,
    paddingLeft:25,
  }
})
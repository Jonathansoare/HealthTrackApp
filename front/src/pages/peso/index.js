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


export default function Peso() {
  AsyncStorage.getItem('idUser').then((res) => setId(res));
  const [user,setUser] = useState()
  const [id, setId] = useState(undefined)
  const [isLoading,setISLoading] = useState(false)
  const [listPeso,setListPeso] = useState()
  const [peso,setPeso] = useState()
  const [msg,setMsg] = useState()
  const [msgErro,setMsgErro] = useState()
  const [refresh,setRefresh] = useState()
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light_Italic,
    Roboto_400Regular_Italic,
    Roboto_100Thin_Italic,
  }) 

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

function Refresh(){
  setRefresh(true)
  setISLoading(true)
  buscarPeso(id)
  buscarUser(id)
  setTimeout(() => {
    setISLoading(false)
    setRefresh(false)
  }, 1000);
}

  function cadastraPeso(){
    if(peso === undefined || peso === ' '){
      setMsgErro("Campo vazio.")
      setTimeout(() => {
        setMsgErro()
      }, 5000);
    }
    else{
      setISLoading(true)
      const data = formatDate()
      axios.post(`${api}/cadastrarPeso`, {
        peso:peso,
        data_age:data,
        idUser:id
      })
      .then(() => {
        setISLoading(false)
        setMsg("Peso cadastrado com sucesso.")
        buscarPeso(id)
        setTimeout(() => {
          setMsg()
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      })
    }
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

  async function buscarPeso(id){
    const dados = await axios.get(`${api}/search/weight/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      //console.log(lista[0].peso); pega o ultimo peso adicionado na tabala
      setListPeso(lista)
      console.log("LOG PESO: peso pego com sucesso.");
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }
  
  useEffect(() => {
    setISLoading(true)
    buscarPeso(id)
    buscarUser(id)
    setTimeout(() => {
      setISLoading(false)
    }, 1000);
  },[id]);
 return (
  <>
    <Spinner visible={isLoading} size={50} textContent='Carregando...' color='white' textStyle={{color:"white"}}/>
    <SafeAreaView style={styles.container}>
    <Header nameIcon="user" navigate="user" imagem={!user ? undefined : user.img}/>
    <TitleMain name="Peso"/>
    <View style={styles.containerForm}>
        <Text style={styles.textForm}>Cadastra Peso</Text>
        <TextInput style={styles.input} placeholder='Ex: 65.5' placeholderTextColor="white" keyboardType='number-pad' value={peso} onChangeText={setPeso}/>
        {msg && <Text style={styles.mensagem}>{msg}</Text> || <Text style={styles.mensagemErro}>{msgErro}</Text>}
          
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => cadastraPeso()}>
          <Text style={styles.textButtonCalculator}>Cadastrar</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.containerHistory}>
      <Text style={styles.textHistory}>Historico</Text>
      <FlatList data={listPeso} renderItem={({item}) => <TextHistory colorIcon="#6e8efb" peso={item.peso} icon="barbell" date={item.data_age} textSecund="Kg"></TextHistory>} 
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
    marginTop:20,
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
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 12,
    marginTop: 25,
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
  }
})
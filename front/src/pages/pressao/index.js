import React, { useState,useEffect } from 'react';
import { View,Text, SafeAreaView,StyleSheet,TouchableOpacity,TextInput,FlatList, RefreshControl } from 'react-native';
import Header from "../../components/Header/Header";
import TextHistory from '../../components/TextHistory';
import TitleMain from '../../components/TitleMain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import axios from 'axios';
import api from "../../assets/api/index"

export default function Pressao() {
  AsyncStorage.getItem('idUser').then((res) => setId(res));
  const [msg,setMsg] = useState()
  const [id,setId] = useState()
  const [user,setUser] = useState()
  const [msgErro,setMsgErro] = useState()
  const [pressao,setPressao] = useState()
  const [listPressao,setListPressao] = useState()
  const [refresh, setRefresh] = useState()
  const [isLoading,setISLoading] = useState(false)


  function formatDate() {
    const date = new Date()
    const mes = date.getMonth() + 1
    const dia = date.getDate()
    const ano = date.getFullYear()
    const mesFormt = ''
    return (`${dia <= 9 ? '0' + dia : dia}/${mes <= 9 ? '0' + mes : mes}/${ano}`)
  }

  function Refresh(){
    setRefresh(true)
    buscarPressao(id)
    buscarUser(id)
    setTimeout(() => {
      setISLoading(false)
      setRefresh(false)
    }, 1000);
  }

  async function cadastrarPressao(){
    if(pressao === undefined || pressao === ' ' || !pressao){
      setMsgErro("Campo vazio.")
      setTimeout(() => {
        setMsgErro()
      }, 5000);
    }
    else{
      setISLoading(true)
      const data = formatDate()
      axios.post(`${api}/cadastrarPressao`, {
        pressao:pressao,
        data_age:data,
        idUser:id
      })
      .then(() => {
        setISLoading(false)
        console.log(data);
        setMsg("Pressao cadastrada com sucesso.")
        buscarPressao(id)
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

  async function buscarPressao(id){
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    const dados = await axios.get(`${api}/search/pressure/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      //console.log(lista[0].peso); pega o ultimo peso adicionado na tabala
      setListPressao(lista)
      console.log("LOG PRESSAO: pressao pegar com sucesso.");
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  useEffect(() => {
    setISLoading(true)
    buscarPressao(id)
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
      <TitleMain name="Pressão"/>
      
      <View style={styles.containerForm}>
        <Text style={styles.textForm}>Cadastra Pressão</Text>
        <TextInput style={styles.input} placeholder='Ex: 120' placeholderTextColor="white" keyboardType='number-pad' value={pressao} onChangeText={setPressao}/>
        {msg && <Text style={styles.mensagem}>{msg}</Text> || <Text style={styles.mensagemErro}>{msgErro}</Text>}
          
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => cadastrarPressao()}>
          <Text style={styles.textButtonCalculator}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerHistory}>
      <Text style={styles.textHistory}>Historico</Text>
      <FlatList data={listPressao} renderItem={({item}) => <TextHistory colorIcon="#ef5350" icon="heart" peso={item.pressao} date={item.data_age} textSecund="MMC"></TextHistory>} 
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
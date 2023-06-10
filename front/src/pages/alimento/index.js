import React,{useState,useEffect} from 'react';
import { View,Text,StyleSheet,SafeAreaView, TextInput,TouchableOpacity,FlatList,RefreshControl } from 'react-native';
import Header from '../../components/Header/Header';
import TitleMain from '../../components/TitleMain';
import { TextInputMask } from "react-native-masked-text";
import TextHistory from '../../components/TextHistory';
import axios from 'axios';
import api from "../../assets/api/index";
import Spinner from 'react-native-loading-spinner-overlay/lib';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Atividade() {
  AsyncStorage.getItem('idUser').then((res) => setId(res));
  const [user,setUser] = useState()
  const [id, setId] = useState(undefined)
  const [alimento,setAlimento] = useState()
  const [calorias, setCalorias] = useState(); 
  const [listActive,setListActive] = useState()
  const [refresh,setRefresh] = useState(false)
  const [msg,setMsg] = useState()
  const [msgErro,setMsgErro] = useState()
  const [isLoading,setISLoading] = useState(false)

  function Refresh(){
    setISLoading(true)
    buscaAlimento(id)
    buscarUser(id)
    setTimeout(() => {
      setISLoading(false)
    }, 1000);
  }
  function formatDate() {
    const date = new Date()
    const mes = date.getMonth() + 1
    const dia = date.getDate()
    const ano = date.getFullYear()
    const mesFormt = ''
    return (`${dia <= 9 ? '0' + dia : dia}/${mes <= 9 ? '0' + mes : mes}/${ano}`)
  }
  async function buscarUser(id){
    const dados = await axios.get(`${api}/search/${id}`)
    .then((res) => {
      const user = res.data.result[0]
      if(user){
        setUser(user)
      }
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  async function buscaAlimento(id){
    const dados = await axios.get(`${api}/search/alimento/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      //console.log(lista[0].peso); pega o ultimo peso adicionado na tabala
      setListActive(lista)
      console.log("LOG Atividade: Atividade pego com sucesso.");
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  function cadastraAlimento(){
    if(alimento === undefined || alimento === ' ' || calorias === undefined || calorias === ' '){
      setMsgErro("Campo vazio.")
      setTimeout(() => {
        setMsgErro()
      }, 5000);
    }
    else{
      setISLoading(true)
      const data = formatDate()
      axios.post(`${api}/cadastrarAlimento`, {
        alimento:alimento,
        data_age:data,
        idUser:id,
        calorias:calorias
      })
      .then(() => {
        setISLoading(false)
        setMsg("Alimento cadastrado com sucesso.")
        buscaAlimento(id)
        setAlimento()
        setCalorias()
        setTimeout(() => {
          setMsg()
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  useEffect(() => {
    setISLoading(true)
    buscarUser(id)
    buscaAlimento(id)
    setTimeout(() => {
      setISLoading(false)
    }, 1500);
  },[id])

 return (
  <>
   <Spinner visible={isLoading} size={50} textContent='Carregando...' color='white' textStyle={{color:"white"}}/>
   <SafeAreaView style={styles.container}>
   <Header nameIcon="user" navigate="user" imagem={!user ? undefined : user.img}/>
    <TitleMain name="Atividade"/>
    <View style={styles.containerForm}>
      <Text style={styles.textForm}>Cadastrar Alimento</Text>
      {/* View input alimento */}
      <View>
        <Text style={styles.labelInput}>Nome do Alimento</Text>
        <TextInput placeholder='Ex: Lasanha' style={styles.input} placeholderTextColor="white" onChangeText={setAlimento} value={alimento}/>
      </View>
      {/* -------------------- */}

      {/* View input calorias */}
      <View>
        <Text style={styles.labelInput}>Calorias do Alimento</Text>
          <TextInput placeholder='Ex:200' style={styles.input} placeholderTextColor={"white"} onChangeText={setCalorias} value={calorias}/>
      </View>
      {/* --------------------- */}
      {msg && <Text style={styles.mensagem}>{msg}</Text> || <Text style={styles.mensagemErro}>{msgErro}</Text>}
      {/* View buttom */}
      <View>
        <TouchableOpacity
            style={styles.buttonCadastro}
            onPress={() => cadastraAlimento(id)}>
            <Text style={styles.textButtonCadastro}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      {/* ----------------- */}
    </View>
    {/* View historico */}
    <View style={styles.containerHistory}>
      <Text style={styles.textHistory}>Historico</Text>
      <FlatList data={listActive} renderItem={({item}) => <TextHistory colorIcon="#ff5722" peso={item.alimento} icon="pizza" date={item.calorias + ' Kcal'}></TextHistory>} 
      refreshControl={
        <RefreshControl 
        refreshing={refresh}
        onRefresh={() => Refresh()}/>
      }/>
    </View>
    {/* -------------------- */}
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
    paddingBottom:20,
    alignSelf:"center",
    marginTop:20,
    borderRadius:20,
  },
  containerHistory:{
    backgroundColor:"#202020",
    width:"90%",
    height:'40%',
    alignSelf:"center",
    marginTop:20,
    borderRadius:15,
    marginBottom:10,
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
    marginTop:5,
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
  labelInput:{
    color:"white",
    fontSize:20,
    marginTop:20,
    marginLeft:20
  },
  buttonCadastro: {
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
  textButtonCadastro: {
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
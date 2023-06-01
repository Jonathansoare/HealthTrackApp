import React,{useEffect, useState} from 'react';
import { View,Text, SafeAreaView,StyleSheet,ScrollView,TouchableOpacity,Image,TextInput,RefreshControl, FlatList } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import Heart from "../../image/Heart.png"

import axios from 'axios';
import api from "../../assets/api/index"

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay/lib';

import { MaterialIcons } from '@expo/vector-icons';

export default function Perfil() {
  AsyncStorage.getItem('UserId').then((res) => setId(res))
  AsyncStorage.getItem("UserToken").then((res) => setToken(res))
  const navigation = useNavigation()
  const [token, setToken] = useState()
  const [name,setName] = useState()
  const [height,setHeight] = useState()
  const [email,setEmail] = useState()
  const [image, setImage] = useState();
  const [id,setId] = useState();
  const [isLoading,setISLoading] = useState(false)
  const [editable,setEditable] = useState(false)
  const [refresh,setRefresh] = useState()

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de acesso à biblioteca de mídia negada');
      return;
    }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64:true,

  });
  if (!result.canceled) {
    const { assets } = result;
    if (assets.length > 0) {
      const { uri } = assets[0];
      const dados = await axios.post(`${api}/setImgUser/${id}`,{
        img:uri
      }).then((res) => {
        setISLoading(true)
        console.log("imagem adicionada com sucesso!");
        buscarImg(id)
        setISLoading(false)
      }).catch((erro) => {
        console.log("ERRO: " + erro);
      })
    }
  }
  };

  async function buscarImg(id){
    const dados = await axios.get(`${api}/search/img/${id}`)
    .then((res) => {
      const dados = res.data.result[0]
      if(dados){
        setImage(dados.img)
      }
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  async function buscarUser(id){
    const dados = await axios.get(`${api}/search/${id}`)
    .then((res) => {
      const user = res.data.result[0]
      if(user){
        setName(user.name)
        setEmail(user.email)
        setHeight(user.altura)
        setImage(user.img)
      }
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  useEffect(() => {
    setISLoading(true)
    buscarUser(id,token)
    setTimeout(() => {
      setISLoading(false)
    }, 2000);
  },[id]);

 return (
   <>
   <Spinner visible={isLoading} size={50} textContent='Carregando...' color='white' textStyle={{color:"white"}}/>
   <SafeAreaView style={styles.container}>

    {/* Header */}
      <SafeAreaView style={styles.containerHeader}>
        <View style={styles.containerImg}>
          <Image source={Heart} style={styles.img}/>
          <Text style={styles.textImg}>Health Track</Text>
        </View>
        <TouchableOpacity style={styles.containerUserHeader} onPress={() => navigation.navigate("Dashboard")}>
        <AntDesign name={"home"} size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    {/* --------------------------------- */}

    <View style={styles.containerInfo}>
     {/* FOTO DE PERFIL  */}
      <View style={styles.containerImgUser}>
        <TouchableOpacity onPress={() => {!image ? handleImagePicker() : true }} disabled={!editable && !image ? false : true}>
          {!image ? <AntDesign name="adduser" size={60} color="white" /> : <Image source={{ uri: image }} style={styles.imgUser}/>}

          <TouchableOpacity style={!editable ? {display:"none"}: styles.containerButtomEditImg && !image ? {display:"none"} : styles.containerButtomEditImg} onPress={() => handleImagePicker()} disabled={!editable}>
            <MaterialIcons name="edit" size={22} color="white" /><Text style={styles.textButtomEditImg}>Edit</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        
      </View>
     {/* -------------------------- */}

    {/* BUTAO DE EDITAR PERFIL */}
    <TouchableOpacity style={styles.buttomEdit} onPress={() => {if(editable === false){ setEditable(true)} else{setEditable(false)}}} disabled={editable}>
      <Text style={styles.textButtomEdit}>Editar perfil</Text>
    </TouchableOpacity>
    {/* ---------------- */}

    {/* CONTAINER FORM */}
    <View style={styles.containerForm}>
      {/* INPUT NOME */}
      <View style={styles.containerInput}>
        <Text style={styles.labelInput}>Nome</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} editable={editable}/>
      </View>
      {/* --------------- */}

      {/* INPUT EMAIL */}
      <View style={styles.containerInput}>
        <Text style={styles.labelInput}>Email</Text>
        <TextInput style={styles.input} keyboardType='email-address' onChangeText={setEmail} value={email}  editable={editable}/>
      </View>
      {/* -------------- */}

      {/* INPUT AlTURA */}
      <View style={styles.containerInput}>
        <Text style={styles.labelInput}>Altura</Text>
        <TextInput style={styles.input} keyboardType='number-pad' onChangeText={setHeight} value={height} editable={editable}/>
      </View>
      {/* -------------- */}

    </View>
    {/* ---------------------------- */}

    {/*  BOTAO DE SALVA*/}
    <TouchableOpacity
      style={editable === true ? styles.buttonCalculator : {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#FF0043",
        paddingTop: 14,
        paddingBottom: 14,
        marginLeft: 12,
        marginTop: 50,
        opacity:0.5
     }}
      onPress={() => {console.log("salvou"), setEditable(false)}} 
      disabled={!editable}>
      <Text style={styles.textButtonCalculator}>Salvar</Text>
    </TouchableOpacity>
    {/* ------------------ */}
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
  containerInfo:{
    flex:1,
    marginTop:100,
    backgroundColor: "#202020",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    paddingTop:20,
  },
  containerImgUser:{
    backgroundColor:"#181818",
    width:150,
    height:150,
    justifyContent:"center",
    marginTop:-80,
    borderRadius:100,
    flexDirection:"row",
    alignItems:"center",
    position:"relative"
  },
  containerUserName:{
    backgroundColor:"#161616",
    width:"auto",
    height:70,
    alignItems:"center",
    flexDirection:"row",
    alignSelf:"center",
    padding:20,
    marginTop:10,
  },
  textNomeUser:{
    fontSize:24,
    color:"white",
    marginRight:20
  },
  imgUser:{
    width:150,
    height:150,
    borderRadius:100,
  },
  containerHeader:{
    display:"flex",
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"space-between",
    height:120,
    padding:10,
    backgroundColor:"#161616"
},
img:{
    width:39,
    height:39,
    marginLeft:10,
},
icon:{
    fontSize:30,
    color:"#FF0043",
    marginRight:5
},
containerImg:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
},
textImg:{
    color:"#FFF",
    opacity:1,
    letterSpacing:3,
    fontFamily:"Inter_100Thin"
},
containerUserHeader:{
  width:50,
  height:50,
  backgroundColor:"#141414",
  alignItems:"center",
  justifyContent:"center",
  borderRadius:60
},
buttomEdit:{
  marginTop:20,
  backgroundColor:'#121212',
  padding:15,
  borderRadius:20,
},
textButtomEdit:{
  color:"white",
  fontSize:16,
},
input:{
  width: "90%",
  borderRadius: 50,
  backgroundColor: "#121212",
  height: 50,
  paddingLeft:10,
 alignSelf:"center",
 color:"white",
 fontSize:18,
 marginTop:10
},
labelInput:{
  paddingLeft:30,
  color:"white",
  fontSize:20,
},
containerForm:{
  width:"100%",
},
containerInput:{
  marginTop:30
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
  marginTop: 50,
},
textButtonCalculator: {
  fontSize: 20,
  color: "#ffffff",
},
textButtomEditImg:{
  color:"white",
  fontSize:16,
},
containerButtomEditImg:{
  backgroundColor:"#0d1117",
  zIndex:1,
  borderRadius:10,
  alignSelf:"center",
  justifyContent:"center",
  width:70,
  height:30,
  marginLeft:-130,
  marginTop:-30,
  flexDirection:"row",
  alignItems:"center",
  display:"flex"
}
})
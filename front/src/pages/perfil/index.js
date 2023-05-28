import React,{useEffect, useState} from 'react';
import { View,Text, SafeAreaView,StyleSheet,ScrollView,TouchableOpacity,Image } from 'react-native';
import Header from '../../components/Header/Header';
import TitleMain from '../../components/TitleMain';
import { AntDesign } from '@expo/vector-icons';

import Heart from "../../image/Heart.png"

import axios from 'axios';
import api from "../../assets/api/index"

import FakeInput from '../../components/FakeInput';
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function Perfil() {
  AsyncStorage.getItem('idUser').then((res) => setId(res));
  const navigation = useNavigation()
  const [name,setName] = useState()
  const [height,setHeight] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState('90351222')
  const [image, setImage] = useState(null);
  const [id,setId] = useState();
  const [isLoading,setISLoading] = useState(false)

  const handleImagePicker = async () => {
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
      base64:true
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const dados = await axios.post(`${api}/setImgUser/${id}`,{
        img:result.assets[0].uri
      }).then((res) => {
        setISLoading(true)
        console.log("imagem adicionada com sucesso!");
        setISLoading(false)
      }).catch((erro) => {
        console.log("ERRO: " + erro);
      })
      
    }
  }
  // funcionar a camera
  // <Camera 
  // style={{flex:1}}
  // type={Camera.Constants.Type.front}
  // />

  async function buscarImg(id){
    const dados = await axios.get(`${api}/search/img/${id}`)
    .then((res) => {
      setISLoading(true)
      setImage(res.data.result[0].img)
      setISLoading(false)
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  useEffect(() => {
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    setISLoading(true)
    buscarImg(id)
    setTimeout(() => {
      setISLoading(false)
    }, 2000);
  },[id]);

 return (
   <>
   <Spinner visible={isLoading}/>
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
    {/* ---------------------------------- */}

    <ScrollView style={styles.main} horizontal={false} showsHorizontalScrollIndicator={false}>
      <TitleMain name="Perfil"/>

      <View style={styles.containerImgUser}>
        <TouchableOpacity onPress={() => handleImagePicker()}>
        {!image ? <AntDesign name="adduser" size={60} color="white" /> : <Image source={{uri:image}} style={styles.imgUser}/>}
        </TouchableOpacity>
      </View>

      <FakeInput nameTitle={"Nome"} defaultValue={name} onChangeText={setName}/>
      <FakeInput nameTitle={"Altura"} defaultValue={height} onChangeText={setHeight} keyboardType={"number-pad"}/>
      <FakeInput nameTitle={"Email"} defaultValue={email} onChangeText={setEmail}/>
    </ScrollView>
    
   </SafeAreaView>
   </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#141414",
  },
  containerImgUser:{
    backgroundColor:"#181818",
    width:150,
    height:150,
    justifyContent:"center",
    alignSelf:"center",
    marginTop:30,
    alignItems:"center",
    borderRadius:100,
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
})
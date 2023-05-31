import React, { useState,useEffect } from 'react';
import { View,Text,SafeAreaView,StyleSheet,TouchableOpacity,Image } from 'react-native';
import Heart from "../../image/Heart.png"
import {Inter_100Thin,useFonts} from "@expo-google-fonts/inter"
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import Api from "../../assets/api/index"

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header(props) {
  AsyncStorage.getItem('idUser').then((res) => setId(res));
  const navigation = useNavigation()
  const imagem = props.imagem
  const [id,setId] = useState()
  const [fontsLoaded] = useFonts({
    Inter_100Thin
  }) 

  const toggleUser = () => {
    navigation.navigate(props.navigate)
  };

  async function buscarImg(id){
    const dados = await axios.get(`${Api}/search/img/${id}`)
    .then((res) => {
        setImage(res.data.result[0].img)
    })
    .catch((erro) => {
      console.log(erro);
    })
  }
 
 return (
  <>
   <SafeAreaView style={styles.container}>
    <View style={styles.containerImg}>
      <Image source={Heart} style={styles.img}/>
      <Text style={styles.textImg}>Health Track</Text>
    </View>

    <TouchableOpacity style={styles.containerUser} onPress={() => toggleUser()}>
     {!imagem ? <AntDesign name={props.nameIcon} size={24} color="white" /> : <Image source={{uri:imagem}} style={styles.imgUser}/>}
    </TouchableOpacity>
    </SafeAreaView>
   </>
  )
}

const styles = StyleSheet.create({
    container:{
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
    containerUser:{
      width:50,
      height:50,
      backgroundColor:"#141414",
      alignItems:"center",
      justifyContent:"center",
      borderRadius:60
    },
    imgUser:{
      width:40,
      height:40,
      borderRadius:100,
    }
});
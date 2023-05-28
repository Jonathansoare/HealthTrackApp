import React, { useState } from 'react';
import { View,Text, TouchableOpacity,StyleSheet } from 'react-native';
import { stylesPressao }  from './style';

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useFonts,Roboto_400Regular,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_100Thin_Italic,
} from "@expo-google-fonts/roboto"


export default function CardInfo(props) {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light_Italic,
    Roboto_400Regular_Italic,
    Roboto_100Thin_Italic,
  }) 
  if(!fontsLoaded) return null;

 return (
 <>
    <TouchableOpacity style={stylesPressao.container}>

        <View style={props.StyleIcon}>
        <FontAwesome5 name={props.iconNameTitle} size={props.iconSizeTitle} color={props.iconColorTitle}/>
        </View>

        <Text style={styles.title}>{props.title}</Text>

        <Text style={styles.value}>{props.value}</Text>

        <View style={stylesPressao.porcetagem}>
        <AntDesign name={props.iconNamePocentagem} size={props.iconSizePocentagem} color={props.iconColorPocentagem} />
        <Text style={{fontSize:24,left:2,color:props.colorPocentagem}}>{props.pocentagem}</Text>
        </View>
    </TouchableOpacity>
    
 </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#202020",
    width:"70%",
    height:300,
    maxHeight:300,
    marginTop:20,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center"
  },
  icons:{
      width:60,
      height:60,
      borderRadius:100,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row",
      marginTop:20,
      backgroundColor:"rgba(229, 115, 151, 0.1)"
  },
  title:{
      color: "white",
      paddingRight: 5,
      marginTop:5,
      fontSize: 28,
      letterSpacing:5,
      fontFamily:"Roboto_400Regular"
  },
  value:{
      color: "white",
      paddingRight: 5,
      marginTop:5,
      fontSize: 36,
      fontFamily:"Roboto_100Thin_Italic"
  },
  porcetagem:{
      marginTop:10,
      display:"flex",
      flexDirection:"row",
      alignItems:"center"
  },
  textPorcetagem:{
      fontSize:24,
      left:2,
      color:"green"
  }
})
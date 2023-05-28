import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import {useFonts,Roboto_100Thin_Italic,Roboto_400Regular} from "@expo-google-fonts/roboto"

export default function TitleMain(props) {
    const [fontsLoaded] = useFonts({
        Roboto_100Thin_Italic,
        Roboto_400Regular
      }) 
 return (
   <View>
    <Text style={style.text}>{props.name}</Text>
   </View>
  );
}

const style = StyleSheet.create({
    text:{
        color:"#DEDEDE",
        fontSize:20,
        marginTop:5,
        marginStart:5,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding:5,
        textTransform:"uppercase",
        letterSpacing:5,
        fontFamily:"Roboto_100Thin_Italic"
    }
})
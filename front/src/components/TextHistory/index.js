import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import {useFonts,Roboto_400Regular,
    Roboto_300Light_Italic,
    Roboto_400Regular_Italic,
    Roboto_100Thin_Italic,
    Roboto_100Thin,
    Roboto_300Light
  } from "@expo-google-fonts/roboto"

export default function TextHistory(props) {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_300Light_Italic,
        Roboto_400Regular_Italic,
        Roboto_100Thin_Italic,
        Roboto_100Thin,
        Roboto_300Light
      }) 
      if(!fontsLoaded) return null;
 return (
   <View style={styles.container}>

    <View style={styles.containerPeso}>
        <View style={styles.icons}>
            <Ionicons name={props.icon} color="#6e8efb" size={30}/>
        </View>

        <Text style={styles.TextPeso}>{props.peso}<Text style={styles.TextPesoSecund}>{props.textSecund}</Text></Text>
    </View>
    <View style={styles.containerData}>
        <Text style={styles.TextData}>{props.date}</Text>
    </View>
   </View>
  );
}


const styles = StyleSheet.create({
    container:{
        width:'95%',
        flexDirection:"row",
        alignSelf:'center',
        height:'auto',
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems:"center",
        justifyContent:"space-between",
        paddingStart:10,
        paddingEnd:10,
        marginTop:10,
        marginBottom:15,
    },
    containerPeso:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:5
    },
    containerData:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10
    },
    TextPeso:{
        fontSize:24,
        color:'white',
        paddingLeft:10,
        fontFamily:"Roboto_400Regular_Italic"
    },
    TextPesoSecund:{
        fontSize:16,
        color:'#cecece',
        fontFamily:"Roboto_300Light_Italic"
    },
    TextData:{
        fontSize:16,
        color:'#ededed'
    },
    icons:{
        borderRadius:100,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgba(110, 142, 251, 0.1)",
        padding:5
    },
})
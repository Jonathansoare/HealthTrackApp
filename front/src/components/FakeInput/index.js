import React, { useState } from 'react';
import { View, Text, Button, TextInput,StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const FakeInput = (props) => {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.containerUserName}>
      <Text style={styles.textNomeUser}>{props.nameTitle}</Text>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          defaultValue={props.defaultValue}
          keyboardType={props.keyboardType}
        />
      </View>
    </View>
    </>
  );
}

export default FakeInput;

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
      width:'100%',
      flexDirection:"column",
      marginTop:10,
      justifyContent:"center",
      marginBottom:20,
      marginStart:10,
    },
    textNomeUser:{
      fontSize:24,
      color:"white",

      marginTop:10
    },
    input:{
      width:"90%",
      height:40,
      backgroundColor:"#303030",
      color:"#FFF",
      fontSize:18,
      paddingLeft:8,
      borderRadius:20,
    },
  })
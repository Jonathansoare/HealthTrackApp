import { Text, View,ScrollView,StyleSheet,SafeAreaView, RefreshControl, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import CardInfo from '../../components/Cards/Card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {stylesPeso, stylesAtividade, stylesImc, stylesPressao } from '../../components/Cards/style'

import axios from 'axios';
import Api from "../../assets/api/index"

import Spinner from 'react-native-loading-spinner-overlay/lib'

import {useFonts,Roboto_400Regular,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_100Thin_Italic,
} from "@expo-google-fonts/roboto"
import TitleMain from '../../components/TitleMain';

export default function Dashboard(){
  AsyncStorage.getItem('idUser').then((res) => setId(res));
  const [user,setUser] = useState()
  const [id, setId] = useState()
  const [peso,setPeso] = useState()
  const [porcePeso,setPorcePeso] = useState()
  const [pressao,setPressao] = useState()
  const [porcePressao,setPorcePressao] = useState()
  const [isLoading,setISLoading] = useState(false)
  const [refresh,setRefresh] = useState()
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light_Italic,
    Roboto_400Regular_Italic,
    Roboto_100Thin_Italic,
  }) 

  async function buscarPeso(id){
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    const dados = await axios.get(`${Api}/search/weight/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      if(lista[0] === undefined){
        setPeso(0)
        setPorcePeso(0)
      }else{
        setPeso(lista[0].peso)
      }
      //console.log(lista[0]) //pega o ultimo peso adicionado na tabala
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  async function porcetagemPeso(id){
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    const dados = await axios.get(`${Api}/search/weight/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      if(lista.length > 1){
        const pesoAntigo = lista[0].peso
        const pesoNovo = lista[1].peso

        const porcentagem = pesoAntigo / pesoNovo - 1
        const porceFinal = (porcentagem * 100).toFixed(2)
        setPorcePeso(porceFinal);
      }
      //console.log(lista[0]) //pega o ultimo peso adicionado na tabala
    }).catch((e) => {
      console.error("Erro:" + e)
    })

  }

  async function buscarPressao(id){
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    const dados = await axios.get(`${Api}/search/pressure/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      if(lista[0] === undefined){
        setPressao(0)
        setPorcePressao(0)
      }else{
        setPressao(lista[0].pressao)
      }
      //console.log(lista[0]) //pega o ultimo peso adicionado na tabala
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  async function porcetagemPressao(id){
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    const dados = await axios.get(`${Api}/search/pressure/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      if(lista.length > 1){
        const pressaoAntigo = lista[0].pressao
        const pressaoNovo = lista[1].pressao

        const porcentagem = pressaoAntigo / pressaoNovo - 1
        const porceFinal = (porcentagem * 100).toFixed(2)
        setPorcePressao(porceFinal);
      }
      //console.log(lista[0]) //pega o ultimo peso adicionado na tabala
    }).catch((e) => {
      console.error("Erro:" + e)
    })

  }

  function Refresh(){
    setRefresh(true)
    setISLoading(true)
    buscarPeso(id)
    porcetagemPeso(id)
    buscarPressao(id)
    porcetagemPressao(id)
    setTimeout(() => {
      setISLoading(false)
      setRefresh(false)
    }, 1000);
  }

  useEffect(() => {
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    setISLoading(true)
    buscarPeso(id)
    porcetagemPeso(id)
    buscarPressao(id)
    porcetagemPressao(id)
    setTimeout(() => {
      setISLoading(false)
    }, 2000);
  },[id]);

    return (
      <>
      <Spinner visible={isLoading}/>
      <SafeAreaView style={styles.main}>
      <Header nameIcon="user" navigate="user"/>
          <TitleMain name="Dashboard"/>
          {user && <Text style={styles.text}>{user?.name}</Text>}
          <ScrollView 
            style={styles.main}
            horizontal={false} 
            showsHorizontalScrollIndicator={false} 
            refreshControl={
              <RefreshControl 
              refreshing={refresh}
              onRefresh={() => Refresh()}
              />
            }
            >
          <View style={styles.card}>
            <CardInfo 
              title="Peso" 
              value={peso === 0 ? "Sem peso" : peso + "kg"} 
              StyleIcon={stylesPeso.icons}
              iconNameTitle={"weight"}
              iconSizeTitle={30}
              iconColorTitle={"#6e8efb"}
              iconNamePocentagem={porcePeso === 0 ? "minus" : porcePeso > 0 ? 'up' : 'down'}
              iconSizePocentagem={26}
              iconColorPocentagem={porcePeso === 0 ? "white" : porcePeso > 0 ? 'green' : 'red'}
              colorPocentagem={porcePeso === 0 ? "white" : porcePeso > 0 ? 'green' : 'red'}
              pocentagem={porcePeso + "%"}/>
      
            <CardInfo 
              title="Pressão arterial" 
              value={pressao === 0 ? "Sem pressão" : pressao + "MMC"} 
              StyleIcon={stylesPressao.icons}
              iconNameTitle={"heartbeat"}
              iconSizeTitle={30}
              iconColorTitle={"#ef5350"}
              iconNamePocentagem={porcePressao === 0 ? "minus" : porcePressao > 0 ? 'up' : 'down'}
              iconSizePocentagem={26}
              iconColorPocentagem={porcePressao === 0 ? "white" : porcePressao > 0 ? 'green' : 'red'}
              colorPocentagem={porcePressao === 0 ? "white" : porcePressao > 0 ? 'green' : 'red'}
              pocentagem={porcePressao + "%"}/>

            <CardInfo 
              title="Imc" 
              value="24.3" 
              StyleIcon={stylesImc.icons}
              iconNameTitle={"calculator"}
              iconSizeTitle={30}
              iconColorTitle={"#afb42b"}
              iconNamePocentagem={"up"}
              iconSizePocentagem={26}
              iconColorPocentagem={'green'}
              pocentagem={"3%"}/>
              
            <CardInfo 
              title="Atividade" 
              value="24.3" 
              StyleIcon={stylesAtividade.icons}
              iconNameTitle={"running"}
              iconSizeTitle={30}
              iconColorTitle={"#ff5722"}
              iconNamePocentagem={"up"}
              iconSizePocentagem={26}
              iconColorPocentagem={'green'}
              pocentagem={"3%"}/>
          </View>
        </ScrollView>
      </SafeAreaView>      
      </>
    )
}

const styles = StyleSheet.create({
  main:{
      flex:1,
      backgroundColor:"#141414",
  },
  card:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      marginBottom:20
  },
  
});

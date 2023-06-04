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
  const [imc,setImc] = useState()
  const [indiceImc,setIndiceImc] = useState()
  const [isLoading,setISLoading] = useState(false)
  const [refresh,setRefresh] = useState()
  const [atividade,setAtividade] = useState()
  const [dataAtividade,setDataAtividade] = useState()

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

  async function buscarImc(id){
    const dados = await axios.get(`${Api}/search/imc/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      //console.log(lista[0].imc); pega o ultimo imc adicionado na tabala
      if(lista[0] === undefined){
        setImc(0)
        setIndiceImc('')
      }
      else{
        setImc(lista[0].imc)
        setIndiceImc(lista[0].categoria)
      }
      console.log("LOG IMC: imc pego com sucesso.");
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  };

  async function buscaAtividade(id){
    const dados = await axios.get(`${Api}/search/atividade/${id}`)
    .then((res) => {
      let lista = res.data.result;
      lista.sort((a,b) => b.id - a.id)
      //console.log(lista[0].peso); pega o ultimo peso adicionado na tabala
      setAtividade(lista[0].Atividade)
      setDataAtividade(lista[0].data_age)
      console.log("LOG Atividade: Atividade pego com sucesso.");
    }).catch((e) => {
      console.error("Erro:" + e)
    })
  }

  async function buscarInfo(id){
    await buscarPeso(id)
    await buscarPressao(id)
    await porcetagemPeso(id)
    await porcetagemPressao(id)
    await buscarImc(id)
    await buscarUser(id)
    await buscaAtividade(id)
  }

  function Refresh(){
    setRefresh(true)
    setISLoading(true)
    buscarInfo(id)
    setTimeout(() => {
      setISLoading(false)
      setRefresh(false)
    }, 1000);
  }

  useEffect(() => {
    AsyncStorage.getItem('idUser').then((res) => setId(res));
    setISLoading(true)
    buscarInfo(id)
    setTimeout(() => {
      setISLoading(false)
    }, 2500);
  },[id]);

    return (
      <>
      <Spinner visible={isLoading} size={50} textContent='Carregando...' color='white' textStyle={{color:"white"}}/>
      <SafeAreaView style={styles.main}>
      <Header nameIcon="user" navigate="user" imagem={!user ? undefined : user.img}/>
      <TitleMain name="Dashboard"/>
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
              value={imc === 0 ? "Sem imc" : imc}
              StyleIcon={stylesImc.icons}
              iconNameTitle={"calculator"}
              iconSizeTitle={30}
              iconColorTitle={"#afb42b"}
              iconSizePocentagem={26}
              colorPocentagem={imc === 0 ? "white" : imc < 15 ? "red" : imc < 18.5 ? "yellow" : imc < 25 ? "green" : imc < 30 ? "yellow" : imc < 35 ? "yellow" : "red"}
              pocentagem={imc === 0 ? " " : indiceImc}/>
              
            <CardInfo 
              title="Atividade" 
              value={atividade === undefined ? "sem atividade" : atividade} 
              StyleIcon={stylesAtividade.icons}
              iconNameTitle={"running"}
              iconSizeTitle={30}
              iconColorTitle={"#ff5722"}
              colorPocentagem={"white"}
              pocentagem={dataAtividade === '' ? " " : dataAtividade}/>
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

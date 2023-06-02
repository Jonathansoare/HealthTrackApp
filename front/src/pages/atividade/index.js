import React,{useState} from 'react';
import { View,Text,StyleSheet,SafeAreaView, TextInput, ScrollView,TouchableOpacity,FlatList,RefreshControl } from 'react-native';
import Header from '../../components/Header/Header';
import TitleMain from '../../components/TitleMain';
import { TextInputMask } from "react-native-masked-text";
import TextHistory from '../../components/TextHistory';

export default function Atividade() {
  const lista = [
      {atividade:"futebol", data:"01/05/23"},
      {atividade:"corrida", data:"24/01/23"},
      {atividade:"caminhada", data:"27/09/23"},
      {atividade:"futebol", data:"21/11/23"},
      {atividade:"corrida", data:"01/05/23"},
      {atividade:"caminhada", data:"02/05/23"},
      {atividade:"futebol", data:"03/05/23"},
      {atividade:"corrida", data:"04/05/23"},
      {atividade:"caminhada", data:"05/05/23"},
  ]
  const [time, setTime] = useState(); 
  const [listActive,setListActive] = useState(lista)
  const [refresh,setRefresh] = useState(false)

  function Refresh(){
    console.log("rodei");
  }

 return (
  <>
   <SafeAreaView style={styles.container}>
    <Header nameIcon="user" navigate="user"/>
    <TitleMain name="Atividade"/>
    <View style={styles.containerForm}>
      <Text style={styles.textForm}>Cadastrar atividade</Text>
      {/* View input atividade */}
      <View>
        <Text style={styles.labelInput}>Nome da atividade</Text>
        <TextInput placeholder='Ex: Futebol' style={styles.input} placeholderTextColor="white"/>
      </View>
      {/* -------------------- */}

      {/* View input time */}
      <View>
        <Text style={styles.labelInput}>Tempo de atividade</Text>
          <TextInputMask
              style={styles.input}
              type="datetime"
              options={{
                  format:"HH:mm"
              }}
              onChangeText={setTime}
              value={time}
              placeholder="EX: 02:00 Horas"
              keyboardType="number-pad"
              placeholderTextColor="white"
            />
      </View>
      {/* --------------------- */}

      {/* View buttom */}
      <View>
        <TouchableOpacity
            style={styles.buttonCadastro}
            onPress={() => console.log("cadastrado")}>
            <Text style={styles.textButtonCadastro}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      {/* ----------------- */}
    </View>
    {/* View historico */}
    <View style={styles.containerHistory}>
      <Text style={styles.textHistory}>Historico</Text>
      <FlatList data={listActive} renderItem={({item}) => <TextHistory colorIcon="#ff5722" peso={item.atividade} icon="walk" date={item.data}></TextHistory>} 
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
})
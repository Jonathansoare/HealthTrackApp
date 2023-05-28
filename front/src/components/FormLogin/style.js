import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    formContext: {
        flex:1,
        marginTop:80,
        backgroundColor: "#151515",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
        paddingTop:20,
      },
      //form é um componente filho de formContext e nele ficara nossos inputs e etc..
      form: {
        width: "100%",
        paddingTop:20,
  
      },
      //formLabel é o nome dos nossos inputs que ficara acima deles
      formLabel: {
        color: "white",
        fontSize: 18,
        paddingLeft: 20,
        marginTop:20
      },
      //aqui o estilos dos nosso inputs, personalizados com bordas arredondadas 
      input: {
        width: "90%",
        borderRadius: 50,
        borderColor: "#ffffff",
        backgroundColor: "#f6f6f6",
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingLeft: 10,
      },
      //buttonCalculator e o botao que irá chamar a função do calculo de imc 
      buttonCalculator: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#FF0043",
        paddingTop: 14,
        paddingBottom: 14,
        marginLeft: 12,
        marginTop: 30,
      },
      //textButtonCalculator é responsáve por por estilizar o texto dentro dentro do button
      textButtonCalculator: {
        fontSize: 20,
        color: "#ffffff",
      },
      textLinkA:{
        color:"white",
        fontSize:19,
        textAlign:"center",
        marginTop:50
      },
      textLinkH:{
        color:"#a753f3",
      },
      // errorMessage é responsável por estilizar o texto de erro  do input
      labelError:{
        alignSelf:"flex-start",
        color:"#ff375b",
        marginBottom:8,
        paddingLeft:20
      },
      containerCheckBox:{
        marginLeft:15,
        marginTop:15
    },
    touchable:{
        height:20,
        width:20,
        borderRadius:4,
        backgroundColor:"#202020",
        justifyContent:'center',
        alignItems:"center"
    },
    optionContainerCheckBox:{
        flexDirection:"row",
        alignItems:"center",
    },
    titleCheckBox:{
        marginLeft:10,
        color:"white",
        fontSize:16,
        fontWeight:'600',
    },
});


export default styles;
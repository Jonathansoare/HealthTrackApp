import { StyleSheet } from "react-native";

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&family=Roboto:ital,wght@0,100;1,100&family=Tilt+Neon&display=swap" rel="stylesheet"></link>

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginTop:60
    },
    img:{
        width:60,
        height:60,
    },
    title:{
        fontSize:18,
        fontStyle:"italic",
        letterSpacing:5,
        color:"white"
    }
});


export default styles;
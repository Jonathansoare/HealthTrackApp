import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar"
import Routes from "./src/routers";
import { TabBarRoute } from "./src/routers/TabBar";

export default function App(){
  return(
    <NavigationContainer>
      <StatusBar style={"light"}/>
      <Routes/>
    </NavigationContainer>
    
  )
}


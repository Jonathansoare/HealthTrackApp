import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Dashboard from "../pages/dashboard/Dashboard"
import Peso from "../pages/peso"
import Alimentos from "../pages/alimento"
import Atividade from "../pages/atividade"
import Pressao from "../pages/pressao";
import Imc from "../pages/imc"

import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

    export function TabBarRoute(){
        return(
            <Tab.Navigator 
                screenOptions={{
                    headerShown:false,
                    tabBarHideOnKeyboard:true,
                    tabBarShowLabel:false,
                    tabBarActiveTintColor:"#FFF",
                    
                    tabBarStyle:{
                        backgroundColor:"#181818",
                        borderTopWidth:0
                    }
                }}
                >
                <Tab.Screen
                 name="Dashboard" 
                 component={Dashboard} 
                 options={{
                 tabBarIcon:({ color, size, focused }) => {
                    if(focused){
                        return <Ionicons name="home" color="#FFF" size={size}/>
                    }

                    return <Ionicons name="home-outline" color={color} size={size}/>
                    }
                }}
                />
                <Tab.Screen
                 name="Peso" 
                 component={Peso} 
                 options={{
                 tabBarIcon:({ color, size, focused }) => {
                    if(focused){
                        return <Ionicons name="barbell" color="#6e8efb" size={size}/>
                    }

                    return <Ionicons name="barbell-outline" color={color} size={size}/>
                    }
                }}
                />
                <Tab.Screen
                 name="Pressao" 
                 component={Pressao} 
                 options={{
                 tabBarIcon:({ color, size, focused }) => {
                    if(focused){
                        return <Ionicons name="heart" color="#ef5350" size={size}/>
                    }

                    return <Ionicons name="heart-outline" color={color} size={size}/>
                    }
                }}
                />
                <Tab.Screen
                 name="Imc" 
                 component={Imc} 
                 options={{
                 tabBarIcon:({ color, size, focused }) => {
                    if(focused){
                        return <Ionicons name="calculator" color="#afb42b" size={size}/>
                    }

                    return <Ionicons name="calculator-outline" color={color} size={size}/>
                    }
                }}
                />
                <Tab.Screen
                 name="Alimento" 
                 component={Alimentos} 
                 options={{
                 tabBarIcon:({ color, size, focused }) => {
                    if(focused){
                        return <Ionicons name="pizza" color="#FFF" size={size}/>
                    }

                    return <Ionicons name="pizza-outline" color={color} size={size}/>
                    }
                }}
                />
                <Tab.Screen
                 name="Atividade" 
                 component={Atividade} 
                 options={{
                 tabBarIcon:({ color, size, focused }) => {
                    if(focused){
                        return <Ionicons name="walk" color="#ff5722" size={size}/>
                    }

                    return <Ionicons name="walk-outline" color={color} size={size}/>
                    }
                }}
                />
            </Tab.Navigator>
        )
    }
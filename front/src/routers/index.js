import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import Perfil from '../pages/perfil';
import { TabBarRoute } from "./TabBar";

const Stack = createNativeStackNavigator()

function Routes(){
    return(
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}} />
        <Stack.Screen name='TabBarRoute' component={TabBarRoute} options={{headerShown:false}}/>
        <Stack.Screen name='user' component={Perfil} options={{headerShown:false}}/>
      </Stack.Navigator>

    )
}

export default Routes;
import { Text, View,Image } from 'react-native'
import React from 'react'
import styles from './styles'
import TitleLogo from '../../components/Title+logo'
import FormLogin from '../../components/FormLogin/Login';

export default function Login(){
    return (
      <View style={styles.container}>
        <TitleLogo/>
        <FormLogin/>
      </View>
    )
}
import { Text, View } from 'react-native'
import React from 'react'
import styles from './style'
import TitleLogo from '../../components/Title+logo'
import FormRegister from '../../components/FormRegister/Register'

export default function Cadastro(){
    return (
      <View style={styles.container}>
        <TitleLogo/>
        <FormRegister/>
      </View>
    )
}
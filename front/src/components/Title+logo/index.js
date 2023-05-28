import { Text, View,Image } from 'react-native'
import React from 'react'
import Heart from "../../image/Heart.png"
import styles from './style'

export default function TitleLogo(){
    return (
      <View style={styles.container}>
        <Image source={Heart}  style={styles.img} resizeMode="contain"/>
        <Text style={styles.title}>Health track</Text>
      </View>
    )
}
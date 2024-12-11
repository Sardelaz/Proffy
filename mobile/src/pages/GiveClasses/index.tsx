import React from "react";
import { View, ImageBackground, Text } from "react-native"; 
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RectButton } from 'react-native-gesture-handler'

import { RootStackParamList } from "../../@types/navigation";

import giveClassesBgImage from '../../assets/images/give-classes-background.png'

import styles from "./styles";

function GiveClasses() {
    const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();

    function handleNavigateToBeAProffy() {
        navigate.navigate('BeAProffy'); 
    }

    function handleNavigateBack() {
        navigate.goBack();  
    }

    return (
        <View style={styles.container}>
            <ImageBackground resizeMode="contain" source={giveClassesBgImage} style={styles.content}>
                <Text style={styles.title}>Quer ser um proffy?</Text>
                <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma.</Text>
            </ImageBackground>

            <RectButton onPress={handleNavigateToBeAProffy} style={styles.okButton}> 
                <Text style={styles.okButtonText}>Seja um proffy!</Text>
            </RectButton>

            <RectButton onPress={handleNavigateBack} style={styles.okButton2}>
            <Text style={styles.okButtonText}>Voltar para Home</Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses
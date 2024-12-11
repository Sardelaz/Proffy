import React, { useState } from "react";

import { View, Text, TextInput, Image, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { RectButton } from 'react-native-gesture-handler';

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

import { RootStackParamList } from "../../@types/navigation";

import PageHeader from "../../components/PageHeader";

import styles from "./styles";

import api from "../../services/api";


function BeAProffy() {
  const { navigate } = useNavigation<{
    navigate: (screen: keyof RootStackParamList) => void;
  }>();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(""); 
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("Matemática");
  const [cost, setCost] = useState("");
  const [scheduleItems, setScheduleItems] = useState([ { week_day: 0, from: "", to: "" } ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  };

  function removeScheduleItem(index: number) {
    const updatedScheduleItems = scheduleItems.filter((_, i) => i !== index);
    setScheduleItems(updatedScheduleItems);
  };

  function setScheduleItemValue(position, field, value) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      };

      return scheduleItem;
    });
    
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass() {
    api.post("classes", {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    })
    .then(() => {
      alert("Cadastro realizado com sucesso!");
      navigate("Landing");
    })
    .catch(() => {
      alert("Erro no cadastro!");
    });
  }

  // Função para selecionar o avatar da galeria usando o Expo Image Picker
  async function selectAvatar() {
    // Verificando permissões para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões para acessar a galeria!');
      return;
    }

    // Selecionando imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Alterado para 'mediaTypes'
      quality: 1,
      allowsEditing: true,
      aspect: [4, 3], // Proporção da imagem
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri); // Definindo o avatar
    } else {
      console.log("Seleção de imagem cancelada");
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Seja um Proffy!" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        <View style={styles.inputGroup}>
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Qual o seu nome?"
              placeholderTextColor="#c1bccc"
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Avatar</Text>

            {avatar ? (
              <View style={styles.avatarPreview}>
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
                <Text style={styles.avatarText}>Avatar Selecionado:</Text>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Nenhum avatar selecionado</Text>
            )}
          </View>

            <RectButton onPress={selectAvatar} style={styles.avatarButton}>
              <Text style={styles.buttonText}>Selecionar Avatar</Text>
            </RectButton>

          
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Contato</Text>
            <TextInput
              style={styles.input}
              value={whatsapp}
              onChangeText={text => setWhatsapp(text)}
              placeholder="+55 (  ) 00000 - 0000"
              placeholderTextColor="#c1bccc"
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Biografia</Text>
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={text => setBio(text)}
              placeholder="Fale um pouco sobre você"
              placeholderTextColor="#c1bccc"
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Matéria</Text>
            <Picker
              style={styles.picker}
              selectedValue={subject}
              onValueChange={itemValue => setSubject(itemValue)}
            >
              <Picker.Item label="Matemática" value="Matemática" />
              <Picker.Item label="Física" value="Física" />
              <Picker.Item label="Química" value="Química" />
              <Picker.Item label="Biologia" value="Biologia" />
              <Picker.Item label="História" value="História" />
              <Picker.Item label="Geografia" value="Geografia" />
            </Picker>
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Custo da sua hora por aula</Text>
            <TextInput
              style={styles.input}
              value={cost}
              onChangeText={text => setCost(text)}
              placeholder="Valor por hora"
              placeholderTextColor="#c1bccc"
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>Horários Disponíveis</Text>
          {scheduleItems.map((scheduleItem, index) => (
            <View key={index} style={styles.scheduleItem}>
              <Picker
                selectedValue={scheduleItem.week_day}
                onValueChange={value =>
                  setScheduleItemValue(index, "week_day", value)
                }
              >
                <Picker.Item label="Domingo" value={0} />
                <Picker.Item label="Segunda-feira" value={1} />
                <Picker.Item label="Terça-feira" value={2} />
                <Picker.Item label="Quarta-feira" value={3} />
                <Picker.Item label="Quinta-feira" value={4} />
                <Picker.Item label="Sexta-feira" value={5} />
                <Picker.Item label="Sábado" value={6} />
              </Picker>

              <TextInput
                style={styles.input}
                value={scheduleItem.from}
                onChangeText={text =>
                  setScheduleItemValue(index, "from", text)
                }
                placeholder="De"
                placeholderTextColor="#c1bccc"
              />
              <TextInput
                style={styles.input}
                value={scheduleItem.to}
                onChangeText={text =>
                  setScheduleItemValue(index, "to", text)
                }
                placeholder="Até"
                placeholderTextColor="#c1bccc"
              />

              <RectButton onPress={() => removeScheduleItem(index)} style={styles.removeButton}>
                <Text style={styles.buttonText}>Remover horário</Text>
              </RectButton>
            </View>
          ))}

          <RectButton onPress={addNewScheduleItem} style={styles.scheduleButton}>
            <Text style={styles.buttonText}>+ Novo horário</Text>
          </RectButton>

          <RectButton onPress={handleCreateClass} style={styles.saveButton}>
            <Text style={styles.buttonText}>Concluir cadastro</Text>
          </RectButton>
        </View>
      </ScrollView>
    </View>
  );
}

export default BeAProffy;

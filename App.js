import React, {useState} from 'react';
import {View, Switch, StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

function App() {
  const [isEscuro, setIsEscuro] = useState(false);
  const [temaSelecionado, setTemaSelecionado] = useState(0);
  const [temas, setTemas] = useState([
    {key: 0, tema: 'Escolha'},
    {key: 1, tema: 'Claro'},
    {key: 2, tema: 'Escuro'},
    {key: 3, tema: 'Automático'},
  ]);
  changeTema = (tema) =>{
    console.log(temas[tema].tema);
    setTemaSelecionado(tema);
      if(temas[tema].tema === 'Claro' ||  temas[tema].tema === 'Automático'){
        setIsEscuro(false);
      }
      else{
        setIsEscuro(true);
      }
  }
  let temasItem = temas.map((value, key) => {
    return (
      <Picker.Item 
          key={key}
          value={key}
          label={value.tema} />
    )
  })

  const [fontValue, setFontValue] = useState(16)

  resetTema = () =>{
    setTemaSelecionado(1);
    setFontValue(16);
    changeTema(1);
  }
  toggleSwitch = () => { 
    setIsEscuro(previousState => !previousState);
    if(!isEscuro){
      setTemaSelecionado(2);
    }
    else{
      setTemaSelecionado(1);
    }
  };
  if(isEscuro){
    return (
      <View style={styles().escuro}>
        <Text style={styles(fontValue).h1Escuro}>Configurações de Preferência</Text>
        <View>
          <Text style={styles(fontValue).h1Escuro}>Escolha um tema: </Text>
          <Picker style={{color: 'white', backgroundColor: 'dodgerblue', width: 150}} selectionColor={'white'} selectedValue={temaSelecionado} onValueChange={(item) =>  {changeTema(item)}}>{temasItem}</Picker>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles(fontValue).h1Escuro}>Escolha o tamanho da fonte: </Text>
          <Slider 
              style={{width: 200, backgroundColor: 'dodgerblue'}}
              minimumValue={12}
              maximumValue={30}
              value={fontValue}
              onValueChange={(value) => setFontValue(value)}
            />
          <Text style={styles(fontValue).h1Escuro}>{fontValue.toFixed()}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles(fontValue).h1Escuro}>Modo noturno: </Text>

          <Switch
              value={isEscuro}
              onValueChange={toggleSwitch}
            />
          { isEscuro ? <Text style={styles(fontValue).h1Escuro}>Ativado</Text> :  <Text style={styles(fontValue).h1Claro}>Desativado</Text>}
        </View>
        <View>
          <Button title='Reiniciar' color='blue' onPress={()=> this.resetTema()}/>
      </View>
      </View>
    );
  }
  else{
    return (
      <View style={styles().claro}>
        <Text style={styles(fontValue).h1Claro}>Configurações de Preferência</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={styles(fontValue).h1Claro}>Escolha um tema: </Text>
          <Picker style={{color: 'black', width: 200}} selectedValue={temaSelecionado} onValueChange={(item) => {changeTema(item)}}>{temasItem}</Picker>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>Escolha o tamanho da fonte: </Text>
          <Slider 
              style={{width: 200}}
              minimumValue={12}
              maximumValue={30}
              value={fontValue}
              onValueChange={(value) => setFontValue(value)}
            />
          <Text style={styles(fontValue).h1Claro}>{fontValue.toFixed()}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles(fontValue).h1Claro}>Modo noturno: </Text>

          <Switch
              value={isEscuro}
              onValueChange={toggleSwitch}
            />
          { isEscuro ? <Text style={styles(fontValue).h1Escuro}>Ativado</Text> :  <Text style={styles(fontValue).h1Claro}>Desativado</Text>}
        </View>
        <View>
          <Button title='Reiniciar' color='blue' onPress={()=> this.resetTema()}/>
        </View>
      </View>
    );
  }
 
}
export default App;

const styles = (font_size) => StyleSheet.create({
  claro: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
    paddingTop: 200,
    alignItems: 'center',
    rowGap: 30 
  },
  escuro: {
    flex: 1,
    backgroundColor: '#000',
    color: 'white',
    paddingTop: 200,
    alignItems: 'center', 
    rowGap: 30 
  },
  h1Claro:{
    fontWeight: 'bold',
    fontSize: font_size,
  },
  h1Escuro:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: font_size,
  }

});

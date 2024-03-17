import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Homepage from './Homepage';
import Login from './Login';


const Registration = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');

  const redirect = async () => {
    try {
      const response = await fetch('https://b209-103-130-90-210.ngrok-free.app/model/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password2,
        }),
      });
      
      const responseData = await response.json();
  
      console.log('Response:', responseData);
  
      if (response.ok) {
        console.log('Registered successfully');
      } else {
        console.error('Failed to Register. Status:', response.status);
        // If the server provides error details in the response body,
        // you can access them here using responseData.error or similar.
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };
  const redirect1=()=>{
    navigation.navigate(Login);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{backgroundColor:'pink'}}>
      <Text style={styles.title}>Let's sign you in.</Text>
      <TextInput
        placeholder='First Name'
        value={username}
        onChangeText={text => setusername(text)}
        style={styles.input}
      />
  
      <TextInput
        placeholder='Email ID'
        value={email}
        onChangeText={text => setemail(text)}
        style={styles.input}
      />
      
      <TextInput
        placeholder='password'
        value={password}
        onChangeText={text => setpassword(text)}
        style={styles.input}
      />
      <TextInput
        placeholder='password'
        value={password2}
        onChangeText={text => setpassword2(text)}
        style={styles.input}
      />
      <Button
        onPress={redirect}
        title="Register"
        color="#841584"
        style={styles.button}
      />
      <TouchableOpacity onPress={redirect1}>
        <Text style={styles.linkText}>Already have an account, Login!</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: 'mistyrose',
    // paddingTop: 20,
    //borderWidth: 5,
     borderColor: 'black',
     //borderRadius: 20,
    // margin: 10,
    // padding: 10,
     backgroundColor:'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    left:70,
  },
  input: {
    paddingVertical:10,
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 30,
    paddingLeft: 10,
    backgroundColor: 'white',
    color: 'black',
    left:30,
  },
  picker: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    color: 'red',
    marginBottom:30,
    paddingVertical:0,
    paddingHorizontal:10,
    left:30,
    borderColor: 'gray',
  },
  selectedDistrictText: {
    color: 'black',
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  linkText: {
    color: 'blue',
    textAlign:'center',
    padding:10,
  },
});

export default Registration;
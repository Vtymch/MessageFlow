import React from 'react'; 
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


export default function HomeScreen({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleSignUp, 
  handleLogin, 
  handleGuestAccess 
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MessageFlow</Text>
      <TextInput
        style={styles.neonInput}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        placeholderTextColor='#ffffff'
      />
      <TextInput
        style={styles.neonInput}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#ffffff"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.neonButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.neonButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.guestContainer}>
        <TouchableOpacity onPress={handleGuestAccess} style={styles.guestButton}>
          <Text style={styles.guestText}>
            Guest (if you forgot your password or login, click "guest")
          </Text>
        </TouchableOpacity>
      </View>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0C0032',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#3500D3',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  neonInput: {
    height: 40,
    borderColor: '#9400D3',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    shadowColor: '#9400D3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  neonButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    shadowColor: '#9400D3',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 5,
    width: 150,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  guestContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  guestButton: {
    backgroundColor: 'rgba(52, 0, 128, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5, 
    marginTop: 10,
  },
  guestText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center'
  }
});



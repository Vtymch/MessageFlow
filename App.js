// Import necessary modules and components from React and React Native
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './firebaseConfig';

// Initialize stack navigator for screen navigation
const Stack = createStackNavigator();


// Authentication screen component with sign-up and login functionality
function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');// User email state
  const [password, setPassword] = useState('');// User password state

// Function to handle sign-up
  const handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => alert('User registered successfully'))
      .catch(error => alert(error.message));
  };
 // Function to handle login
  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => alert('Logged in successfully'))
      .catch(error => alert(error.message));
  };

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

        <TouchableOpacity
          style={styles.neonButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <Text style={styles.buttonText}>Enter without Registration</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


// Chat screen component with animated entrance
function ChatScreen() {
  const [showChat, setShowChat] = useState(false);// State to toggle chat visibility
  const [message, setMessage] = useState('');// Message input state
  const [messages, setMessages] = useState([]);// State for storing messages
  const slideAnim = useRef(new Animated.Value(0)).current;// Animation reference

  useEffect(() => {
        // Animation to slide the chat in
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setShowChat(true));  // Show chat after animation
  }, []);
  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: message }]);
      setMessage('');
    }
  };
  return (
    <View style={styles.container}>
      {!showChat ? (
        <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
          <Text style={styles.title}>Welcome to Chat</Text>
        </Animated.View>
      ) : (
        <>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={styles.messageList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              placeholderTextColor="#ffffff"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
// Main application component that handles navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Styles for UI elements
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
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    shadowColor: '#9400D3',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ffffff',
    paddingVertical: 10,
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: '#ffffff',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#9400D3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#3500D3',
  },
  messageText: {
    color: '#ffffff',
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
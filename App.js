import React, { useState } from 'react';
import { ScrollView, View, Text, Alert, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// Custom Question Component with styling
const Question = ({ imageSource, options, onSelectAnswer }) => {
  return (
      <View style={styles.questionContainer}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.questionText}>What animal is this?</Text>

        <RNPickerSelect
            onValueChange={(value) => onSelectAnswer(value)}
            items={options.map(option => ({ label: option, value: option }))}
            placeholder={{ label: 'Select an answer', value: null }}
            style={pickerSelectStyles}
        />
      </View>
  );
};

const QuizApp = () => {
  const [answers, setAnswers] = useState([null, null, null]);
  const [username, setUsername] = useState('');
  const correctAnswers = ['Bee', 'Kingfisher', 'Elephant'];
  const questionOptions = [
    ['Bee', 'Crocodile', 'Deer'],
    ['Kingfisher', 'Hummingbird', 'Owl'],
    ['Elephant', 'Giraffe', 'Leopard'],
  ];

  const questionImages = [
    require('./assets/bee.jpg'),     // Image path for question 1
    require('./assets/kingfisher.jpg'),     // Image path for question 2
    require('./assets/elephant.jpg') // Image path for question 3
  ];

  const handleSelectAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!username) {
      Alert.alert("Error", "Please enter your username to continue.");
      return;
    }

    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount += 1;
      }
    });

    let message = `${username}, you got ${correctCount} out of ${correctAnswers.length} correct!`;
    if (correctCount === correctAnswers.length) {
      message += " Well done!";
    } else if (correctCount > 0) {
      message += " You can do better next time.";
    } else {
      message += " Try again.";
    }

    Alert.alert("Quiz Results", message);
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with background color */}
        <View style={styles.header}>
          <Text style={styles.title}>Animal Quiz</Text>
        </View>

        {/* Username input */}
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameLabel}>User Name:</Text>
          <TextInput
              style={styles.usernameInput}
              placeholder="Enter your username"
              onChangeText={text => setUsername(text)}
              value={username}
          />
        </View>

        {/* Render each question */}
        {questionImages.map((imageSource, index) => (
            <Question
                key={index}
                imageSource={imageSource}
                options={questionOptions[index]}
                onSelectAnswer={(answer) => handleSelectAnswer(index, answer)}
            />
        ))}

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Answers</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#4a90e2', // Set header background color
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text color for contrast
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  usernameContainer: {
    width: '100%',
    marginBottom: 20,
  },
  usernameLabel: {
    fontSize: 18,
    color: '#4a4a4a',
    marginBottom: 5,
  },
  usernameInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  questionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#4a90e2',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333',
    paddingRight: 30,
    textAlign: 'center',
    backgroundColor: '#f7f9fb',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333',
    paddingRight: 30,
    textAlign: 'center',
    backgroundColor: '#f7f9fb',
  },
};

export default QuizApp;




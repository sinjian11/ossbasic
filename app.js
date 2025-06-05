import React from 'react';
import { View, Text, Button, StyleSheet, Alert, Vibration } from 'react-native';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import Haptic from 'react-native-haptic-feedback';

export default function App() {
  const speak = (text) => {
    Speech.speak(text);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      speak("위치 권한이 필요합니다.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = location.coords;
    const message = `현재 위치는 위도 ${coords.latitude}, 경도 ${coords.longitude}입니다. 택시를 부를까요?`;

    speak(message);
    Vibration.vibrate(500);
    Alert.alert("위치 정보", message, [
      { text: "택시 호출", onPress: () => callTaxi(coords) },
      { text: "취소", style: "cancel" },
    ]);
  };

  const callTaxi = (coords) => {
    speak("택시를 호출했습니다.");
    Haptic.trigger("notificationSuccess");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚖 시각장애인 택시 도우미</Text>
      <Button
        title="현재 위치로 택시 호출"
        onPress={getLocation}
        color="#000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
});

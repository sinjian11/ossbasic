import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Button,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Tts from 'react-native-tts';

const App = () => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('대기 중');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: '택시 호출을 위해 위치 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

    const callTaxi = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setStatus('위치 권한이 필요합니다.');
      Tts.speak('위치 권한이 필요합니다.');
      return;
    }

    setStatus('위치 확인 중...');
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setStatus('택시 호출 완료. 도착 중입니다.');
        Tts.speak('택시를 호출했습니다. 곧 도착합니다.');
        simulateTaxiArrival(latitude, longitude);
      },
      error => {
        setStatus('위치를 가져올 수 없습니다.');
        Tts.speak('위치를 가져올 수 없습니다.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };


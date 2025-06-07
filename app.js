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

  const simulateTaxiArrival = (userLat, userLng) => {
    let taxiLat = userLat + 0.0005;
    let taxiLng = userLng + 0.0005;

    const interval = setInterval(() => {
      const distance = getDistance(userLat, userLng, taxiLat, taxiLng);
      setStatus(`택시까지 거리: ${distance.toFixed(1)}m`);
      Tts.speak(`택시까지 ${distance.toFixed(0)}미터 남았습니다.`);

      if (distance < 5) {
        clearInterval(interval);
        setStatus('택시가 도착했습니다.');
        Tts.speak('택시가 도착했습니다. 안전하게 탑승하세요.');
      } else {
        taxiLat -= 0.0001;
        taxiLng -= 0.0001;
      }
    }, 5000);
  };

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

   return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>상태: {status}</Text>
      <Button title="택시 호출" onPress={callTaxi} />
    </SafeAreaView>
  );
};



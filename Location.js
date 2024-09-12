import * as Location from 'expo-location';

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission denied', 'You need to enable location permissions to use this app.');
    return;
  }
  const location = await Location.getCurrentPositionAsync({});
  console.log(location);
};

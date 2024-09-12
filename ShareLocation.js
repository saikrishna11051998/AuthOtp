import { firestore, auth } from './firebaseConfig';
import * as Location from 'expo-location';

const shareLocation = async () => {
  const { coords } = await Location.getCurrentPositionAsync({});
  const userId = auth.currentUser.uid;

  await firestore.collection('users').doc(userId).set({
    location: new firebase.firestore.GeoPoint(coords.latitude, coords.longitude),
  }, { merge: true });
};

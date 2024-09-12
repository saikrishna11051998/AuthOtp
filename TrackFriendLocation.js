import { firestore } from './firebaseConfig';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const TrackFriendLocation = ({ friendPhoneNumber }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .where('phoneNumber', '==', friendPhoneNumber)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.location) {
            setLocation(data.location);
          }
        });
      });

    return () => unsubscribe();
  }, [friendPhoneNumber]);

  return (
    <View>
      {location ? (
        <Text>Friend's Location: Lat: {location.latitude}, Lon: {location.longitude}</Text>
      ) : (
        <Text>Waiting for location...</Text>
      )}
    </View>
  );
};

export default TrackFriendLocation;

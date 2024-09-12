import { firestore } from './firebaseConfig';

const listenForFriendLogin = (friendPhoneNumber) => {
  firestore
    .collection('users')
    .where('phoneNumber', '==', friendPhoneNumber)
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.loggedIn) {
          sendPushNotification(data.expoPushToken, `${friendPhoneNumber} has logged in!`);
        }
      });
    });
};

import { firestore, auth } from './firebaseConfig';

const addFriend = async (friendPhoneNumber) => {
  const userId = auth.currentUser.uid;
  try {
    await firestore.collection('users').doc(userId).collection('friends').add({
      phoneNumber: friendPhoneNumber,
      addedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding friend:", error);
  }
};

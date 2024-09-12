import * as Notifications from 'expo-notifications';

export const sendPushNotification = async (expoPushToken, message) => {
  const messagePayload = {
    to: expoPushToken,
    sound: 'default',
    title: 'Friend Login',
    body: message,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  });
};

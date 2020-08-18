import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log('LOCAL NOTIFICATION ==>', notification)
    },
    popInitialNotification: true,
    requestPermissions: true
})

export const LocalNotification =()=>{
    PushNotification.localNotification({
        autoCancel: true,
        bigText:
            "Ceci est une démonstration de notification locale dans l'application React Native. Uniquement affiché, une fois développé.",
        subText: 'Amassur Notification',
        title: 'Vous avez un nouveau message',
        message: 'Cliquez pour en savoir plus',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["Oui", "Non"]'
    })
}
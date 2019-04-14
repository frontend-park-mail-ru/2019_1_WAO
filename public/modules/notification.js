/* eslint-disable no-unused-vars */
export default function makeNotify(data = 'Empty') {
  if (!('Notification' in window)) {
    console.error('not not sup');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(data);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification(data);
      }
    });
  }
}

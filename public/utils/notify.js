/*
Это на потом

export default function makeNotify(data = 'Empty') {
  if (!'Notification' in window) {
    console.error('not not sup');
    return;
  }

  if (Notification.permission === 'granted') {
    const notification = new Notification(data);
    return;
  }

  if (Notification.permission !== 'denied') {
    Notification
      .requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          new Notification(data);
        }
      });
  }
}
*/

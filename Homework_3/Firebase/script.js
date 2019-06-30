// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCp3guaRnZCtf_phxhhyGoISia0F3OAdEI",
  authDomain: "web-storage-283fb.firebaseapp.com",
  databaseURL: "https://web-storage-283fb.firebaseio.com",
  projectId: "web-storage-283fb",
  storageBucket: "",
  messagingSenderId: "1035248386676",
  appId: "1:1035248386676:web:fa7e0d293c9fc8bb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().signInWithEmailAndPassword('i8yasegxqzju@mail.ru', '123456');

var db = firebase.firestore();
var accounts = db.collection("Accounts");

accounts.get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
});

document.addEventListener('DOMContentLoaded', function () {
  try {
    let app = firebase.app();
    let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] ===
      'function');
    document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
});
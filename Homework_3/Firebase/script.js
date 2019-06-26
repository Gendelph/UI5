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

var credential = firebase.auth().signInWithEmailLink("i8yasegxqzju@mail.ru", window.location.href);
firebase.auth().currentUser.linkWithCredential(credential)
  .then(function(usercred) {
    // The provider is now successfully linked.
    // The phone user can now sign in with their phone number or email.
  })
  .catch(function(error) {
    // Some error occurred.
  });

var db = firebase.firestore();
var accounts = db.collection("Accounts");
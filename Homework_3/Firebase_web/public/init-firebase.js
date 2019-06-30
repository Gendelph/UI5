// TODO: Replace the following with your app's Firebase project configuration


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
var alias = accounts.get();

alias.then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});

function validateForm()
{
  alert("Please fill out the username");
}

newFunction();

function newFunction() {
    var elem = document.getElementById("submit");
    elem.addEventListener("click", validateForm);
}

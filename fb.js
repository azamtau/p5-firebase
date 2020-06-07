const firebaseConfig = {
    apiKey: "YOUR KEYS HERE",
    authDomain: "YOUR KEYS HERE",
    databaseURL: "YOUR KEYS HERE",
    projectId: "YOUR KEYS HERE",
    storageBucket: "YOUR KEYS HERE",
    messagingSenderId: "YOUR KEYS HERE",
    appId: "YOUR KEYS HERE"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

app.auth().signInWithPopup(provider).then(function(result) {
    let user = result.user;
    console.log(user);
    new p5(sketch);

  }).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
    console.log(error)
});


function writeScoreFB(score) {
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).set({
        username: firebase.auth().currentUser.displayName,
        score: score
    });
}

function readScoreFB() {
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        console.log(snapshot.val().username, snapshot.val().score);
    });
}

  
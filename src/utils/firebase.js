import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDBDoJdr_bY6GBgHRm_5cSxyEJqei9Bhaw",
    authDomain: "ecomerce-furnitures.firebaseapp.com",
    projectId: "ecomerce-furnitures",
    storageBucket: "ecomerce-furnitures.appspot.com",
    messagingSenderId: "566376558335",
    appId: "1:566376558335:web:da230b1bdab404a85f66ca"
  };

  const app = firebase.apps.lenght ? firebase.app() : firebase.initializeApp(firebaseConfig);

  const auth =  app.auth()
  const db = app.firestore()
  const storage = firebase.storage()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  export { auth, db, timestamp, storage }
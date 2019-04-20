import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyASJnf9HWhRXjWxEvGtXsi9SQ55LtPojBo",
  authDomain: "slack-redux.firebaseapp.com",
  databaseURL: "https://slack-redux.firebaseio.com",
  projectId: "slack-redux",
  storageBucket: "slack-redux.appspot.com",
  messagingSenderId: "359902467697"
};
firebase.initializeApp(config);

export default firebase;
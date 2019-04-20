import firebase from 'firebase/app';

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
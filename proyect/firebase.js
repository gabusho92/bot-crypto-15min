const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  // Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
const firestore = db.firestore()


const database = async (result) => {
  const data = await firestore.collection('15min').doc('fMpPSaao1o4a7xdfVr4c')
  const res = await data.get()
  const sl =  res.data().stopLoss
  const tp = res.data().takeProfit

  if(result == 'sl')
  {
    data.update({stopLoss: sl + 1})
    console.log('sl + 1')
  }else if(result == 'tp'){
    data.update({takeProfit: tp + 1})
    console.log('tp + 1')

  }
  
}




  module.exports = {database, firestore}

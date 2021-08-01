const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyCoozG4B3zmieu5--epCa63ge8_bEqNQHQ",
    authDomain: "tradingbtc-b4b21.firebaseapp.com",
    projectId: "tradingbtc-b4b21",
    storageBucket: "tradingbtc-b4b21.appspot.com",
    messagingSenderId: "42940626475",
    appId: "1:42940626475:web:3d291ecff943b1c31e5c6e",
    measurementId: "G-YVFY6XPTX6"
  };
  // Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
const firestore = db.firestore()


const database = async (result) => {
  const data = await firestore.collection('resultado').doc('nFs5lRyfBKd392sWLXKc')
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

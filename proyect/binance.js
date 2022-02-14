const Binance = require('node-binance-api');
const {firestore} = require('./firebase')


const binance = new Binance().options({
    APIKEY: '',
    APISECRET: ''
  });


const actualizarBalance = async () => {
    const balance = await binance.futuresBalance()
    let bal = balance[1].balance
    firestore.collection('balance').doc('xOxsXHKixPD73WleBoxs').update({ balance: Number(bal)})
    console.log('balance actualizado')
}


const short = async () => {
    console.info(await binance.futuresLeverage( 'BTCUSDT', 10 ))
  console.info( await binance.futuresMarketSell( 'BTCUSDT', 0.002 ) ); // COMPRAR MARKET
}

const long = async () => {
    console.info(await binance.futuresLeverage( 'BTCUSDT', 10 ))
    console.info( await binance.futuresMarketBuy( 'BTCUSDT', 0.002 ) ); // enta MARKET
}

const closeShort = async () => {
    await binance.futuresLeverage( 'BTCUSDT', 10 )
    await binance.futuresMarketBuy( 'BTCUSDT', 0.002, {reduceOnly: true} )
    actualizarBalance()
}

const closeLong = async () => {
    await binance.futuresLeverage( 'BTCUSDT', 10 )
    await binance.futuresMarketSell( 'BTCUSDT', 0.002, {reduceOnly: true} )
    actualizarBalance()
}



module.exports = {
    short,
    long,
    closeShort,
    closeLong
}
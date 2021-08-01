const WebSocket = require('ws')
const {main} = require('./proyect/state')
// Symbol: ETH/USDT - Kline 30 minutes.

var socket = new WebSocket('wss://fstream.binance.com/ws/btcusdt@kline_15m');
const {bb} = require('./proyect/bandasBollinger')
const {stateType} = require('./proyect/typesStates')


socket.on('open', () => {
    console.log('Connection binance Open')
})

socket.onclose = () => {
    console.log('cerrando conexion')
    console.log('error')
}


// When message received from web socket then...
socket.onmessage = function (event) {
    // Easier and shorter.
    var data = JSON.parse(event.data);

    const time = Date.now()
    console.log(new Date(time).getSeconds())
    const ticker = {
        open: data.k.o,
        close: data.k.c,
        high: data.k.h,
        low: data.k.l,
        candleClosed: data.k.x
    }
    
    const Bollinger = bb(20, 2, '15m').then(a => {
        main(ticker, a)
        // console.log(ticker)
        // console.log(a)
    })

    
}


const {stateType} = require('./typesStates')
// const {short, long, closeShort, closeLong} = require('./binance')
const {database} = require('./firebase')

let state = stateType.preCompra
let ordenActual = {
    precio: 0,
    stopLoss: 0,
    type: null
}

let ordenesRealizadas = []


const stopLossVenta = (precio, media) => {
    return Number(precio) + (Number(precio) - media)
}

const stopLossCompra = (precio, media) => {
    return precio - (media - precio)
}


const main = (ticker, bb) => {
    switch (state) {
        case stateType.search:
            if(ticker.candleClosed)
            {
                // console.log(ticker)
                // console.log(bb)
                
                if(ticker.close > bb.bandaSuperior)
                {
                    console.log('change to Pre Venta')
                    state = stateType.preVenta
                }
                else if(ticker.close < bb.bandaInferior)
                {
                    console.log('change to Pre Compra')
                    state = stateType.preCompra
                }
                else
                {
                    
                    console.log('Searching...')
                }
            }
            break;
                
            case stateType.preVenta:
                if(ticker.candleClosed)
                {
                    if(ticker.close < bb.bandaSuperior)
                    {
                        console.log('change to Venta')
                        state = stateType.venta
                    }else{
                        console.log('Pre Venta')
                    }
                }
                break;
            
                case stateType.preCompra:
                    if(ticker.candleClosed)
                    {
                        if(ticker.close > bb.bandaInferior)
                        {
                            console.log('change to Compra')
                            state = stateType.compra
                        }else{
                            console.log('Pre Compra')
                        }
                    }
                    break;
                    
                    case stateType.venta:
                        console.log('venta:', ticker.close)
                        var slUp = stopLossVenta(ticker.close, bb.media)
                        console.log('stopLoss:', slUp)
                        
                        // short()

                        ordenActual = {
                            precio: ticker.close,
                            stopLoss: slUp,
                            type: 'venta'
                        }

                        console.log('change to Post Venta')
                        state = stateType.postVenta

                        break;

                    case stateType.compra:
                        console.log('Comprar a:', ticker.close)
                        var sl = stopLossCompra(ticker.close, bb.media)
                        console.log('stopLoss:', sl)

                        // long()

                        ordenActual = {
                            precio: ticker.close,
                            stopLoss: sl,
                            type: 'compra'
                        }

                        console.log('change to Post Compra')
                        state = stateType.postCompra

                        break;

                    case stateType.postVenta:
                        if(ticker.close < bb.media)
                        {
                            // closeShort()
                            console.log('Take Profit')
                            database('tp')
                            ordenesRealizadas.push(ordenActual)
                            state = stateType.search
                        }
                        else if(ticker.close > ordenActual.stopLoss)
                        {
                            // closeShort()
                            console.log('StopLoss')
                            console.log('Busncado reset')
                            database('sl')


                            ordenesRealizadas.push(ordenActual)
                            state = stateType.reset

                        }
                        // else{
                        //     console.log('Post Venta')
                        // }
                        break;

                    case stateType.postCompra:
                        if(ticker.close > bb.media)
                        {
                            // closeLong()
                            console.log('Take Profit')
                            database('tp')

                            ordenesRealizadas.push(ordenActual)
                            state = stateType.search
                        }
                        else if(ticker.close < ordenActual.stopLoss)
                        {
                            // closeLong()
                            console.log('StopLoss')
                            console.log('Busncado reset')
                            database('sl')

                            ordenesRealizadas.push(ordenActual)
                            state = stateType.reset

                        }
                        // else{
                        //     console.log('Post Compra')
                        // }
                        break;
        
                    case stateType.reset:
                        if(ordenActual.type == 'venta' && ticker.close < bb.media)
                        {
                            console.log('RESETEADO')
                            state = stateType.search
                        }

                        if(ordenActual.type == 'compra' && ticker.close > bb.media)
                        {
                            console.log('RESETEADO')
                            state = stateType.search
                        }


                    break;
            default:
                break;
        }

    }


    module.exports = {main}
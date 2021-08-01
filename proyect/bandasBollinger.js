const fetch = require('node-fetch')
const math = require('mathjs')


const bb = async (periodos, nStd, intervalo) => {
    const response = await fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=BTCUSDT&interval=${intervalo}&limit=${periodos}`)
    const data = await response.json()

    let sumaMedia = 0

    const precioDatos = data.map(a => Number(a[4]))

    precioDatos.forEach(a => {
        sumaMedia += a
    });

    //MEDIA MOVIL
    const media = sumaMedia / periodos

    //DESVIACION STANDAR
    const std = math.std(precioDatos, 'uncorrected')

    const bandaSuperior = (std * nStd) + media
    const bandaInferior = media - (std * nStd)

    return {
        media,
        bandaSuperior,
        bandaInferior
    }

}

module.exports = {bb}
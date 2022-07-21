let express = require('express');
const {db, Coin, Market} = require('../db');
let router = express.Router();
const axios = require('axios');
const { response } = require('express');

// router.get('/ticker/price', async (req, res) => {  
//     try {
//         //console.log (req.params.depth);
//         console.log(`https://fapi.binance.com/fapi/v1/ticker/price`);
//         const response = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price`);
//         res.send({retorno : response.data});
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// });




//  ruta para gneracion de tablas de la base de datos, tiene acceso restringido. 
router.post('/coins' , async (req, res) => {
    const {user} = req.body;
    if (user === "william") {
        try {
            const response = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price`);
            const updateCoin = await  response.data.forEach (function(element) {Coin.create({
                coin : element.symbol,
                lastPrice : element.price,
            })}) ; 
        //storeCoins(response);
        res.send (response.data);
    } catch (err) { 
        res.status(400).send(err.message);
    }
    } else {
        res.send('No estas autorizado para generar tablas')
        }
        
});
// ruta con la actualizacion de los datos de las momedas desde el exchange, valores actuales.

router.post ('/update', async (req, res) => {
    try {
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price`);
        const updateCoin = await  response.data.forEach (function(element) {Coin.update({lastPrice : element.price}, {where: {coin: element.symbol}}
        )}) ; 
        //storeCoins(response);
        const coins = await Coin.findAll();
        res.send(coins);
    } catch (err) {
        res.send(err);
    }
})

// ruta con la consulta de las monedas de ola base dde datos
router.get('/coins', async (req, res) => {
    try {
        const coins = await Coin.findAll();
        res.send(coins)       
    } catch (err) {
        res.status(400).send('No hay datos que mostrar');
    }
})

// ruta con la volatilidad de las monedas indicando cada cuanto tiempo lo debe actualizar
router.get('/volatility', async (req, res) => {
    try {
        let delayvalue = await Coin.findAll({raw: true,});
        let currentvalue = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/price`);
        let volatitable = calcVolatilityDelay(delayvalue, currentvalue);
        res.json(volatitable);
        //res.json(currentvalue.data);
    } catch (err) {
        res.status(400).send(err);
    }
})

// ruta con el libro de ordenes de spot
router.get('/:depth', async (req, res) => {  
    try {
        //console.log (req.params.depth);
        console.log(`https://fapi.binance.com/fapi/v1/depth?symbol=${req.params.depth}`);
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/depth?symbol=${req.params.depth}`);
        res.send({retorno : response.data});
    } catch (err) {
        res.status(400).send(err.message);
    }
});


// FUNCIONES MISCELANEAS

// Hace el calulo de la volatilidad
const calcVolatilityCurrent = function (delayvalue, currentvalue) {
    let volatile = currentvalue.data.map(function (element) {
        //let item = searchdata(delayvalue, element.symbol);
        //console.log (item);
        //return (item)
        //return ({...element, volatility: searchdata(delayvalue, element.symbol).price})
        //return ({...element, volatility: searchdata(delayvalue, element.coin).price/element.lastPrice})
        return ({...element, volatility: (1-(searchdata(delayvalue, element.symbol).lastPrice/element.price)) * 100 })
    });
    return volatile;
}


const calcVolatilityDelay = function (delayvalue, currentvalue) {
    let volatile = delayvalue.map(function (element) {
        //let item = searchdata(currentvalue, element.coin);
        //console.log (element.coin);
        //return (1-(searchdata(currentvalue.data, element.coin).price/element.lastPrice))*100;
        //return(element.coin);
        //return ({...element, volatility: ''})
        //return ({...element, volatility: searchdata(delayvalue, element.coin).price/element.lastPrice})
        return ({...element, volatility: (1-(searchdata(currentvalue.data, element.coin).price/element.lastPrice)) * 100 })
    });
    return volatile;
}

// busca el dato en un areglo de objetos
const searchdata = function (objarray, searchitem) {
    let object = objarray.find(function(element) {return element.symbol === searchitem});
    if (object) {return (object)
    } else {return (`NO HAY INFORMACION DE ${searchitem}`);
    }
}

module.exports = router;


// const storeCoins = function (datacoins) {
//     datacoins.data.forEach(function (element) {await Coin.create({
//         coin : element.symbol,
//         lastPrice : element.price,
//     })});
//     console.log(datacoins.data[0]);
// }
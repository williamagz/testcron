const express = require('express');
const {db, Coin, Market} = require('./db');
const morgan = require('morgan');
const futures = require('./routes/futures');
const spot = require('./routes/spot');

let server = express();
server.use(express.json());
server.use('/futures', futures);
server.use('/spot', futures);


server.post ('/coins', async (req, res) => {
    const {coin, lastPrice, fiveminprice} = req.body;
    try {
        const newCoin = await Coin.create({
            coin, lastPrice, fiveminprice 
        });
        res.json(newCoin);
    } catch (err) {
        res.send(err);
    }
});




server.listen (3500, () => {
    console.log ("Escuchando en el puerto 3000...");
    db.sync({force: false});
});
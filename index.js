var cron = require('node-cron');


// cron en fracciones de minutos  '*/10 * * * * *'
// decimo segundo de cada minutos '10 * * * * *'

const routine = function () {cron.schedule('*/10 * * * * *', () => {
    const fecha = Date.now();
    const time = new Date(fecha);
    //const segundos = time.getSeconds();
    console.log(time.toUTCString());
});}


const routine2 = function () {cron.schedule('*/5 * * * * *', () => {
    const fecha = Date.now();
    const time = new Date(fecha);
    //const segundos = time.getSeconds();
    console.log(`la rutina 2: ${time.toUTCString()}`);
});}


routine();
routine2();
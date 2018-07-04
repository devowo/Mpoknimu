const mongoose = require('mongoose');
const chalk = require('chalk');
const log = console.log;
const error = chalk.bold.red;

//require('dotenv').config({ path: 'variables.env' });
mongoose.Promise = global.Promise;
// It is necessary to explicitly declare the connection url or it will not work in production

let mongodbUri = mongoose.connect('mongodb://YOUR MONGODB URL', {
    poolSize: 5, //Number of connections in the connection pool for each server instance, set to 5 as default for legacy reasons.
    reconnectTries: 240, //try to connect 60 times every few milliseconds, default 30
    reconnectInterval: 900, //milliseconds
    autoReconnect: true,
    noDelay: true,
    loggerLevel: "error",//warn, info, debug. Default: "error"
    //appname: "RedMagic Corp."
});

//mongoose.set('debug', true);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () { log(chalk.hex('#FFEB3B')("You connected to the database without errors ðŸ‘ "),chalk.greenBright( "ðŸ˜"))}); // 1 speed

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });


const start = require('./app');



// Start the server
/* app.set('port', process.env.PORT || 9000);
const server = app.listen(app.get('port'), () => log(chalk.underline.hex('#DEADED')('Server is listening music on port:'), chalk.hex('#4CAF50')(`\uD83C\uDF0F http://localhost:${port} ðŸŽ¶`)));
 */

start.set('port', process.env.PORT || 9000);
const server = start.listen(start.get('port'), () => {
  log(chalk.underline.hex('#DEADED')('Server is listening music on port:'), chalk.hex('#4CAF50')(`\uD83C\uDF0F  PORT â†’ ${server.address().port} ðŸŽ¶`));
  //console.log(`Express running â†’ PORT ${server.address().port}`);
});

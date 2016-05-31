var mongoose = require('mongoose');
var dbURI;
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
} else {
	dbURI = "mongodb://localhost/locator";
}
mongoose.connect(dbURI);

// connection events
mongoose.connection.on('connected', function(){
	console.log("mongoose connected on " + dbURI);
})
mongoose.connection.on('error', function(err){
	console.log("mongoose connection " + err);
})
mongoose.connection.on('disconnected', function(){
	console.log("mongoose disconnected");
})

// shutdown processes
var gracefulShutdown = function(msg, callback){
	mongoose.connection.close(function(){
		console.log('mongoose disconnected through ' + msg);
		callback();
	})
}

process.once('SIGUSR2', function(){
	gracefulShutdown('nodemon restart', function(){
		process.kill(process.pid, 'SIGUSR2')
	})
})

process.on('SIGINT', function(){
	gracefulShutdown('app termination', function(){
		process.exit(0);
	})
})

process.on('SIGTERM', function(){
	gracefulShutdown('Heroku app shutdown', function(){
		process.exit(0);
	})
})

require('./locations');



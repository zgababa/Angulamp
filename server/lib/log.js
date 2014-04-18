exports.setup = function(winston){
// Add transport file
winston.add(winston.transports.File, {
	filename: './logs/api.log'
});
// Handle exceptions
winston.handleExceptions(new winston.transports.File({
	filename: './logs/exception.log'
}));
// Remove console logs
	winston.remove(winston.transports.Console);
}
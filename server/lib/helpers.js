exports.send = function(code, res, content){
	res.writeHead(code, {'content-type': 'application/json'});
	if(content != null){
		res.write(JSON.stringify(content));
	}
	res.end();
}

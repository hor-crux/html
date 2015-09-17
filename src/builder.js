var Promise = global.Promise || System._nodeRequire('es6-promise').Promise;
var fs = System._nodeRequire('fs');
var isWin = process.platform.match(/^win/);

function fromFileURL(address) {
	address = address.replace(/^file:(\/+)?/i, '');

  	if(!isWin)
    	address = '/' + address;
  	else
    	address = address.replace(/\//g, '\\');

  return address;
}
	
	
module.exports = function(loads, opts) {
	console.log("bundling html files...");
	
	var outFile = opts.outFile.replace(/\.js$/, '.html');

	var output = loads.map(function(load) {
		return fs.readFileSync(fromFileURL(load.address));
	}).join('\n');

	var stubDefines =loads.map(function(load) {
		return "System\.register('" + load.name + "', [], false, function() {});";
	}).join('\n');

	return new Promise(function(resolve, reject) {
		fs.writeFileSync(outFile, output);
		resolve(stubDefines);
	});

}
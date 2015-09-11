exports.fetch = function(load) {
	return new Promise(function(resolve, reject) {
		var link = document.createElement("link");
		link.rel = "import";
		link.href = load.address;
		link.onload = function() {resolve("")};
		link.onerror = function() {reject("")};
		
		document.head.appendChild(link);
	});
}


exports.instantiate = function(load) {
	var dom = document.querySelector("link[href='"+load.address+"']").import;
	var template = dom.querySelector("template");
	if(typeof template !== "undefined")
		dom.template = template;
	return dom;
}
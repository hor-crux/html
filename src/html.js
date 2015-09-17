if(typeof window !== "undefined") {
	
	exports.fetch = function(load) {
		return new Promise(function(resolve, reject) {
			var link = load.metadata.link = document.createElement("link");
			link.rel = "import";
			link.href = load.address;
			link.onload = function() {resolve("")};
			link.onerror = function() {reject("")};
			
			document.head.appendChild(link);
		});
	}
	
	
	exports.instantiate = function(load) {
		try {
			var dom = load.metadata.link.import;
			var template = dom.querySelector("template");
			if(typeof template !== "undefined")
				dom.template = template;
			return dom;
		} catch(e) {
			return void 0;
		}
	}
}
else {
	exports.fetch = function(load) {
    	load.metadata.build = true;
    	load.metadata.format = 'defined';
    	return '';
  	};
  	
	  exports.instantiate = function() {};
  	
	  exports.bundle = function(loads, opts) {
    	var loader = this;
    	if (loader.buildHTML === false) { return ''; }
    	return loader['import']('./builder', { name: module.id })
		.then(function(builder) {
      		return builder.call(loader, loads, opts);
    	}, function(err) {
      		throw new Error('Error while bundling html files');
    	});
  };
}
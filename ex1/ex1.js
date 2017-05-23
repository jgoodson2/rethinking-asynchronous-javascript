function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 4000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

var responses = []
var processNext = 1

function processResponses(){
	/*for(var i = processedThru; i <= responses.length; i++){
		if(responses.f)
	}*/
	responses.forEach(function(file){
		if (file.fileName.substring(file.fileName.length - 1) == processNext){
			console.log(file.responseText)
			processNext++
		}
	})

}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		responses.push({fileName:file,responseText:text})
		//console.log(newFileObject)
		//responses[file.substring(file.length - 1) - 1].value = text
		processResponses()
		
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");

setTimeout(function(){
//		processResponses()
console.log(responses)
	},6000)
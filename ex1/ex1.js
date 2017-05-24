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

var responses = {}
var processNext = 1

function processResponses(fileName,contents){

	if(!(fileName in responses)){
		responses[fileName] = contents
	}
	var fileNames = ["file1","file2","file3"]

	for (var i = 0; i < fileNames.length; i++) {
		if (fileNames[i] in responses){
			if(typeof responses[fileNames[i]] == "string"){
				output(responses[fileNames[i]])
				responses[fileNames[i]] = false
			}
		}
		else{
			return;
		}
	}

	console.log("Complete!")
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		processResponses(file,text)
		
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");


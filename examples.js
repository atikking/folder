var folder = require("./index");

var tool = new folder();

console.log(tool);

//console.log(tool.folder("./").newDir("copy/to/test/folder"))

/**
*
*File delete example
*

console.log(tool.folder("./").file("renamed.txt").delete(function(err){
	if(err) return console.log(err);
	console.log("File Deleted");
}));

/**
*
*File renaming file example
*
console.log(tool.folder("./").file("test.txt").rename("renamed",function(err){
	if(err) return console.log(err);
	console.log("File Renamed");
}));

/**
*
*File moving example
*
console.log(tool.folder("./").file("test.txt").move(function(err){
	if(err) return console.log(err);
	console.log("File Moved");
}).to("copy/to/test/folder"));

*/

/**
*
*File copying example
*
console.log(tool.folder("./").file("test.js").copy(function(err){
	if(err) return console.log(err);
	console.log("File Coppyed");
}).to("copy/to/test/folder"));
*/

/**
* New dir creating Example
*
console.log(tool.folder("./").newDir("atik/folder/testCreate"))
*/
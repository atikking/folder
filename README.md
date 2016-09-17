#Folder
A Directory Toolkit plugin for nodejs to copy, move, rename, create and delete file or folder, or listing the files of a folder

#Examples
```javascript

var folder = require("./index");

var tool = new folder();

console.log(tool);

tool.folder("./").newDir("copy/to/test/folder")

/**
*
*File delete example
*

tool.folder("./").file("renamed.txt").delete(function(err){
	if(err) return console.log(err);
	console.log("File Deleted");
});

/**
*
*File renaming example
*
tool.folder("./").file("test.txt").rename("renamed",function(err){
	if(err) return console.log(err);
	console.log("File Renamed");
});

/**
*
*File moving example
*
tool.folder("./").file("test.txt").move(function(err){
	if(err) return console.log(err);
	console.log("File Moved");
}).to("copy/to/test/folder");

*/

/**
*
*File copying example
*
tool.folder("./").file("test.js").copy(function(err){
	if(err) return console.log(err);
	console.log("File Coppyed");
}).to("copy/to/test/folder");
*/

/**
* New dir creating Example
*
tool.folder("./").newDir("atik/folder/testCreate")
*/
```

/**
 * Created by Atikur Rahman 9/10/2016
 * under MIT licence
 */
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

var Folder = function(){

    this.folder = function (root) {
        var root = root;
        //var source = ;
        const out = {
            File: function (fileName) {
                var oldPath = path.resolve(root, fileName);
                var oldDest = fs.createReadStream(oldPath);

                const fileOut = {
                    copy: function (callback) {
                        return {
                            to: function (newPath) {
                                out.newDir(newPath);// Create dir if not available
                                var pathNew =  path.resolve(newPath, fileName);
                                var dest = fs.createWriteStream(pathNew);
                                oldDest.pipe(dest);
                                oldDest.on('end', callback);
                                oldDest.on('error', callback);
                            }
                        }
                    },
                    move: function (callback) {
                        return {
                            to: function (newPath) {
                                out.newDir(newPath);
                                var pathNew =  path.resolve(newPath, fileName);

                                var dest = fs.createWriteStream(pathNew);
                                oldDest.pipe(dest);
                                oldDest.on('end', function () {
                                    fileOut.delete();
                                    if(typeof callback == 'function') callback();
                                    oldDest = fs.createReadStream(pathNew);
                                });
                                oldDest.on('error', callback);

                            }
                        }
                    },
                    rename: function (newName) {

                        var ext = "";
                        if (fileName.indexOf('.') > 0) { ext = '.' + fileName.split('.').slice(-1)[0]; }
                        else { ext = ''; }

                        var newFilename = newName + ext;
                        var pathNew =  path.resolve(root, newFilename);
                        fs.rename(oldPath, pathNew, function(err){
                            if (err) throw err;
                            console.log('renamed complete');
                        });
                    },
                    delete:function (){
                        out.delete(oldPath);
                    }
                };
                return fileOut;
            },
            list: function (callback) {
                fs.readdir(root, function(err, files){
                        if (err) throw err;
                    console.log(files);
                    if (typeof callback == 'function') callback(err, files);
                });
            },
            delete:function (file) {
                fs.unlink(file ? file : root, function(err){
                        if (err) throw err;
                    console.log('successfully deleted /tmp/hello');
                });
            },
            newDir : function (path) {
                mkdirp(path, function(err) { if (err) throw err; });
            }
        }
        return out;
    }
}
var acc = exports = module.exports = Folder;

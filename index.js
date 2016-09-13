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
            /**
             *
             * @param fileName
             * @return {{copy: fileOut.copy, move: fileOut.move, rename: fileOut.rename, delete: fileOut.delete}}
             * @constructor
             */
            file: function (fileName) {
                var oldPath = path.resolve(root, fileName);
                var oldDest = fs.createReadStream(oldPath);

                const fileOut = {
                    /**
                     * Copy files into a folder
                     * @param callback(err)
                     * @return {{to: to}}
                     */
                    copy: function (callback) {
                        return {
                            /**
                             * Into folder
                             * @param newPath
                             */
                            to: function (newPath) {
                                out.newDir(newPath, function (err) {
                                    if(err) return callback(err);

                                    var pathNew =  path.resolve(newPath, fileName);
                                    var dest = fs.createWriteStream(pathNew);
                                    oldDest.pipe(dest);
                                    oldDest.on('end', callback);
                                    oldDest.on('error', callback);
                                });// Create dir if not available

                            }
                        }
                    },

                    /**
                     * moves a file
                     * @param callback(err)
                     * @return {{to: to}}
                     */
                    move: function (callback) {
                        return {
                            /**
                             * Copy into folder
                             * @param newPath
                             */
                            to: function (newPath) {
                                out.newDir(newPath, function (err) {
                                    if(err) return callback(err);

                                    var pathNew = path.resolve(newPath, fileName);
                                    var dest = fs.createWriteStream(pathNew);
                                    oldDest.pipe(dest);
                                    oldDest.on('end', function () {
                                        fileOut.delete();
                                        if (typeof callback == 'function') callback();
                                        oldDest = fs.createReadStream(pathNew);
                                    });
                                    oldDest.on('error', callback);
                                });
                            }
                        }
                    },

                    /**
                     * rename a file
                     * @param newName
                     * @param callback(err)
                     */
                    rename: function (newName, callback) {

                        var ext = "";
                        if (fileName.indexOf('.') > 0) { ext = '.' + fileName.split('.').slice(-1)[0]; }
                        else { ext = ''; }

                        var newFilename = newName + ext;
                        var pathNew =  path.resolve(root, newFilename);
                        fs.rename(oldPath, pathNew, function(err){
                            if(typeof callback == 'function'){
                                if (err) callback(err);
                                callback();
                            }
                        });
                    },
                    /**
                     *
                     */
                    delete:function (callback){
                        out.delete(oldPath, callback);
                    }
                };
                return fileOut;
            },
            /**
             * List item
             * @param callback(err, files)
             */
            list: function (callback) {
                fs.readdir(root, function(err, files){
                    console.log(files);
                    if (typeof callback == 'function'){
                        if (err) return callback(err);
                        callback(err, files);
                    }
                });
            },

            /**
             * Delete folder
             * @param file
             * @param callback
             */
            delete:function (file, callback) {
                fs.unlink(file ? file : root, function(err){
                    if(typeof callback == 'function'){
                        if (err) callback(err);
                        callback();
                    }
                    console.log('successfully deleted'+ file);
                });
            },

            /**
             *  Create new dir
             * @param path
             */
            newDir : function (path, callback) {
                mkdirp(path, function(err) {
                    console.log("Creating dir"+path);
                    if (typeof callback == 'function') {
                        if (err) return callback(err);
                        callback();
                    }
                });
            }
        }
        return out;
    }
}
var acc = exports = module.exports = Folder;

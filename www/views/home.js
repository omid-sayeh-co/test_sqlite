var read_file;
var write_file;
test_DES.home = function (params) {
    "use strict";
   
    function log_exeption(log,success) {
        var logOb;
        try {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                fileSystem.root.getDirectory('test_DES/log', { create: true, exclusive: true }, function (logDir) {                    
                    logDir.getFile("log.mp3", { create: true }, function (file1) {
                        // console.log("got the file", file1);
                        //alert(logDir.toURL());
                            write_file = file1;
                            success();
                           // writeLog(log);
                        });

                    }, function (err) {     //directory vojod dasht

                        fileSystem.root.getDirectory('test_DES/' + "log", { create: false }, function (logDir) {

                            logDir.getFile("log.mp3", { create: true }, function (file1) {
                               // alert(logDir.toURL());
                                write_file = file1;
                                success();
                                //writeLog(log);
                            });

                        }, function (err) {
                            alert("failer 2nd  getDirectory failure: " + JSON.stringify(err));
                            alert("ساختن دایرکتوری با مشکل مواجه شد");
                        });  
                }, function (err) {
                    alert("1st getDirectory failure: " + JSON.stringify(err));
                    alert("ساختن دایرکتوری با مشکل مواجه شد");
                });
            }, function (err) {
                alert("requestFileSystem failure: " + JSON.stringify(err));
                alert("مشکل در دریافت اطلاعات سیستمی");
            });

        } catch (er) {
            alert(er);
        }
    }

    //================= read
    function read_filef(success) {//var DIR_PATH = "file:///storage/emulated/0/test_DES/log/log.enc"
        var DIR_PATH = "file:///storage/emulated/0/test_DES/log/log.enc";
        try {
            window.resolveLocalFileSystemURL(DIR_PATH, function (fileEntry) {
                    fileEntry.file( function (file) {
                        read_file = file;
                        success();
                        }, fail );
            }, fail );

            function readDataUrl(file) {
                var reader = new FileReader();
                reader.onloadend = function (evt) {
                    
                    alert(evt.target.result);
                };
                reader.readAsDataURL(file);
            }

            function readAsText(file) {
                var reader = new FileReader();
                reader.onloadend = function (evt) {
                    
                    alert(evt.target.result);
                };
                reader.readAsText(file);
            }

            function readAsbinary(file) {
                var reader = new FileReader();
                reader.onloadend = function (evt) {

                    alert(evt.target.result);
                };
                reader.readAsBinaryString(file);
            }

            //function readAsarrbuff(file) {
            //    var reader = new FileReader();
            //    reader.onloadend = function (evt) {
            //        alert(new Uint8Array(evt.target.result) );
            //    };
            //    reader.readAsArrayBuffer(file);
            //}

        } catch (eee) {
            alert(eee);
        }
    }
    //=====================================
    function readAsarrbuff() {
        alert("in readAsarrbuff");
        try{
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                // alert("in reader "+new Uint8Array(evt.target.result).length);
                var decrypted;
                
                var str = "E69FB7A368833459";
                var bytes = [];
                var charCode;

                for (var i = 0; i < str.length; ++i) {
                    charCode = str.charCodeAt(i);
                    bytes.push(charCode & 0xFF);
                }
                var des = new DES(bytes);
                var size = new Uint8Array(evt.target.result).length;
                var out = new Uint8Array(size);
                decrypted = new Uint8Array(8);
                var dd = new Uint8Array(8);
                for (var i = 0; i < size;) {

                    for (var j = 0; j < 8 && j + i < size; j++) {
                        dd[j] = new Uint8Array(evt.target.result)[i + j];
                    }
                    des.decrypt(dd, 0, decrypted, 0);
                    for (var k = 0; k < 8 && k+i<size; k++)
                    {
                        out[i + k] = decrypted[k];
                    }
                    if (i + 8 < size) i += 8;
                    else break;
                }
                alert("in writer ");
                writeLog(out);
            };
            reader.readAsArrayBuffer(read_file);
        } catch (eee) {
            alert(eee);
        }
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
    //=====================================
    function writeLog(byteArr) {
        try{        
            if (!write_file) return;
            write_file.createWriter(function (fileWriter) {
                var UTF8_STR = new Uint8Array(byteArr);  // Convert to UTF-8...                
                var BINARY_ARR = UTF8_STR.buffer;
                fileWriter.write(BINARY_ARR);
                alert("ok, in theory i worked");
            }, fail);
        } catch (eee) {
            alert(eee);
        }
    }
    //=====================================
    DBManager.Finilize = function (SuccessCB) {
        DAO.files.SelectAll(function () {
            DAO.bookmarks.SelectAll(function () {
                //DAO.lib.SelectAll(function () {
                console.log('time ' + (new Date().valueOf() - queryBeginTime));
                //console.log(DAO.lib.ALL())          //T_MyLibrary
                //console.log(DAO.files.ALL())        //T_Files
                //console.log(DAO.bookmarks.ALL())    //T_Bookmarks
                if (SuccessCB) SuccessCB();
                //});
            });
        });
    }
    var DBManager = new Object();
    DBManager.db = undefined;
    DBManager.isLoading = false;
    var viewModel = {
        
        testdecrypt: function () {          
            try{                
                //var byteArr = [15, -123, 43, 0x55];
                //log_exeption(byteArr);

                DBManager.db = window.sqlitePlugin.openDatabase({ name: 'DB_Hazar.db', createFromLocation: 1 });
                //DBManager.db = window.sqlitePlugin.openDatabase({ name: dbName, location: 1 });
                //console.log('Load DBManager.db from \"' + dbName + "\"");
                DBManager.db.transaction(function (tx) {
                    tx.executeSql('SELECT COUNT (*)', [], function (res) {
                        alert('DB LOADED:\n' + JSON.stringify(DBManager.db));
                        DBManager.Finilize(function () { if (SuccessCB) SuccessCB(); DBManager.isLoading = false; });
                    }, function (res) { alert('DB FAILED :(') });
                }, function (e) {
                    alert('DB FAILED :(\nCAUSE:\n' + e)
                });

            } catch (er) {
                alert(er);
            }
        },
        readdecrypt: function () {
            readAsarrbuff();
        },
        decrypt_file: function () {
           
            log_exeption();
           
            setTimeout(function () { read_filef(setTimeout(function () { readAsarrbuff(); }, 200)); }, 400);

        }
    };

    return viewModel;
};
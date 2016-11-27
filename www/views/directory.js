test_DES.directory = function (params) {
    "use strict";
    function create_directory_(uri,fileName) {
       // var fileName = "kimiagar.jpg";
        var data = "asdjagsdjgasjdasd";
        var ft = new FileTransfer();
       // var uri = "http://avayehazar.com/sites/default/files/styles/audiobook_product_display_275-275/public/kimiagar.jpg?itok=_p71Nggn";
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {

            directoryEntry.getDirectory('1234', { create: true }, function (subDirEntry) {
                subDirEntry.getDirectory('5678', { create: true }, function (subDirEntry1) {
               
            
                    ft.download(uri, subDirEntry1.toURL() + fileName, function (entry) {
                        //  DevExpress.ui.notify("فایل دانلود شد" + filename, "success", 1000);
                        // alert("Download successful");
                         alert(entry.fullPath); //    "/Avaye_Hazar/38/ghaleasrar.enc"

                         //subDirEntry1.getFile("1.txt", { create: true }, function (fileEntry) {
                         //    // write_file = file1;
                         //    fileEntry.createWriter(function (fileWriter) {
                         //        fileWriter.onwriteend = function (e) {
                         //            // for real-world usage, you might consider passing a success callback
                         //            console.log('Write of file "' + fileName + '"" completed.');
                         //        };

                         //        fileWriter.onerror = function (e) {
                         //            // you could hook this up with our global error handler, or pass in an error callback
                         //           alert('Write failed: ' + e.toString());
                         //        };

                         //        var blob = new Blob([data], { type: 'text/plain' });
                         //        fileWriter.write(blob);
                         //    }, errorHandler.bind(null, fileName));
                             

                         //});
                         //window.resolveLocalFileSystemURL(subDirEntry1.toURL() + fileName, function (fileEntry) {
                         //    fileEntry.file(function (file) {
                         //        // read_file = file;





                         //    }, errorHandler);
                         //}, errorHandler);
                      
                    }, function (err) { alert('خطا در دانلود فایل  ' + JSON.stringify(err))});










                //subDirEntry1.getFile(fileName, { create: true }, function (fileEntry) {

                //fileEntry.createWriter(function (fileWriter) {
                //    fileWriter.onwriteend = function (e) {
                //        // for real-world usage, you might consider passing a success callback
                //        console.log('Write of file "' + fileName + '"" completed.');
                //    };

                //    fileWriter.onerror = function (e) {
                //        // you could hook this up with our global error handler, or pass in an error callback
                //        console.log('Write failed: ' + e.toString());
                //    };

                //    var blob = new Blob([data], { type: 'text/plain' });
                //    fileWriter.write(blob);
                //}, errorHandler.bind(null, fileName));
                    //}, errorHandler.bind(null, fileName));


                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null,fileName));
        }, errorHandler.bind(null, fileName));
    }
    function errorHandler(evt) {
        alert(JSON.stringify(evt));
    }
    var viewModel = {
        create_directory: function () {
            try {
                var uri = "http://avayehazar.com/sites/default/files/styles/audiobook_product_display_275-275/public/kimiagar.jpg?itok=_p71Nggn";
                var fileName = "kimiagar.jpg";
                create_directory_(uri,fileName);

                
            } catch (err) {
                alert(JSON.stringify(err));
            }
        },
        download_file: function () {
            try {
                var fileName = "raz.jpg";
                var uri = "http://avayehazar.com/sites/default/files/styles/book_cover_list__180_x_250_/public/raz.jpg?itok=MPjMey6d";
                create_directory_(uri,fileName);
                fileName = "ghanonejazb.jpg";
                uri = "http://avayehazar.com/sites/default/files/styles/book_cover_list__180_x_250_/public/ghanoone%20jazb.jpg?itok=rXwbZwCm";
                create_directory_(uri,fileName);
                fileName = "parnian.jpg";
                uri = "http://avayehazar.com/sites/default/files/styles/book_cover_list__180_x_250_/public/parniane%20haftrang.jpg?itok=18KcTfMa";
                create_directory_(uri,fileName);
            } catch (err) {
                alert(JSON.stringify(err));
            }
        }
    };

    return viewModel;
};
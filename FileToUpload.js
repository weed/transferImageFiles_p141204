﻿'use strict';
var google = require('googleapis');
var fs = require('fs');

var http = require('http');

var FileToUpload = (function () {
    function FileToUpload(url, callback, done) {
        var _this = this;
        this.uploadToGoogleDrive = function (callback, done) {
            /**
            * Copyright 2013 Google Inc. All Rights Reserved.
            *
            * Licensed under the Apache License, Version 2.0 (the "License");
            * you may not use this file except in compliance with the License.
            * You may obtain a copy of the License at
            *
            *      http://www.apache.org/licenses/LICENSE-2.0
            *
            * Unless required by applicable law or agreed to in writing, software
            * distributed under the License is distributed on an "AS IS" BASIS,
            * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            * See the License for the specific language governing permissions and
            * limitations under the License.
            */
            //var file = fs.readFileSync('wzero3es-images-scrn0000_1.jpg');
            var file = fs.readFileSync(__dirname + '/' + _this.fileName);

            var drive = google.drive('v2');
            var OAuth2Client = google.auth.OAuth2;

            // Client ID and client secret are available at
            // https://code.google.com/apis/console
            var CLIENT_ID = '618246363748-83p3k6gcirrp96mg819lsg22sk0nkjoq.apps.googleusercontent.com';
            var CLIENT_SECRET = 'TXTQL26dHArlc8yUlIHV_JQF';
            var REDIRECT_URL = 'http://localhost';

            var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

            oauth2Client.setCredentials({
                access_token: 'ya29.5ABAMEFVbyCKmvotm2pZNNJEC5_IuOQVPkFXMnjiHfCWxl3lPx3MvkiDEJbsRjwGRgl9gcNrK4GneQ',
                refresh_token: '1/WrlVKnsBXCgCpIbIqYJtJTb3bJ-QOelFAI-ZnWgMiO8MEudVrK5jSpoR30zcRFq6'
            });

            oauth2Client.refreshAccessToken(function (err, res) {
                //if (err != null) {
                //    console.log('error: ', err);
                //};
                // insertion example
                drive.files.insert({
                    resource: {
                        title: _this.fileName,
                        parents: [
                            {
                                id: '0B1za9Zlbo6NiSGlBS0QyTmVULUE'
                            }
                        ]
                    },
                    media: {
                        mimeType: 'image/jpeg',
                        body: file
                    },
                    auth: oauth2Client
                }, function (err, response) {
                    //console.log(response);
                    _this.newUrl = response.webContentLink;
                    _this.newUrl = _this.newUrl.replace('&export=download', '');
                    callback(null, _this); // for async module
                    if (done != null) {
                        done(); // for mocha async testing
                    }
                    return _this.newUrl;
                });
            });
            return 'failed to insert';
        };
        var fileName = url;
        var rePath = /https?:\/\/weed.cocolog-nifty.com\/(.*)/;
        fileName = fileName.replace(rePath, '$1');
        fileName = fileName.replace(/\//g, '-');
        this.fileName = fileName;

        var file = fs.createWriteStream(__dirname + '/' + fileName);
        var request = http.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(function () {
                    console.log('File download is done\n');
                    callback(null, _this); // for async module
                    if (done != null) {
                        done(); // for mocha async testing
                    }
                });
            });
            file.on('error', function (err) {
                fs.unlink(fileName); // Delete the file async. (But we don't check the result)
                console.log('hoge: ', err);
            });
        });
    }
    return FileToUpload;
})();
exports.FileToUpload = FileToUpload;
//# sourceMappingURL=FileToUpload.js.map

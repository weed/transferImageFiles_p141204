/**
 * Created by weed on 14/12/18.
 */
import google = require('googleapis');
import fs = require('fs');

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

var file = fs.readFileSync('hoge.jpg');

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
    drive.files.insert(
        {
            resource: {
                title: 'hoge3.jpg',
                mimeType: 'image/jpeg',
                parents: [
                    {
                        id: '0B1za9Zlbo6NiSGlBS0QyTmVULUE'
                    }
                ],
                body: file
            },
            auth: oauth2Client
        },
        function (err, response) {
            console.log('error:', err, 'inserted:', response);
        }
    );
});
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.listenerPhoto();

    },
    listenerPhoto: function() {
        var button = document.getElementById('photo');
        var image = document.getElementById('image');

        var b64;
        button.addEventListener('click', function(){
            alert('ciao');

            function onSuccess(mediaFiles) {
                var i, path, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;
                    // do something interesting with the file
                    image.src = path;
                }
                //KO questo sotto serve per "pulire" la cache della fotocamera, altrimenti ogni volta che premi il tasto fai una foto ti apre una nuova istanza della fotocamera!
                //KO navigator.camera.cleanup(onSuccess, onFail);
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

            //questa è la funzione per accedere alla fotocamera
            navigator.device.capture.captureImage(onSuccess, onFail, {limit:1});

        }, false);

        image.addEventListener('click', function(){
		//se l'immagine è diversa dal placehoder mandala al server
            if(image.src != 'https://mozorg.cdn.mozilla.net/media/img/firefox/firefox-256.e2c1fc556816.jpg') {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "foto.php", true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log(xhr.responseText);
                    }
                };
                xhr.send(b64);
            }
        }, false);
    }
};

app.initialize();

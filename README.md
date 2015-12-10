# cordova-capture-xmas

Cordova app to take photo / video / audio
to be used for Christmas in Fabriano.

Quick testing:

* $ sudo npm install -g cordova

and in the main dir of the project

* $ cordova add plugin cordova-media-capture
* $ cordova add platform browser
* $ cordova build browser
* $ cordova serve

Then go to http://localhost:8000 and play ;)

To test updates of your project kill cordova server and do:

* $ cordova build browser && cordova serve

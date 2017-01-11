import * as firebase from "firebase";

class Firebase {
	static firebaseApp;

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebaseApp = firebase.initializeApp({
			apiKey: "AIzaSyBE1FDH2m0l4s0lCaGE0FxUegryD9c8RMQ",
			authDomain: "labcars-8e6dd.firebaseapp.com",
			databaseURL: "https://labcars-8e6dd.firebaseio.com",
			storageBucket: "labcars-8e6dd.appspot.com",
			messagingSenderId: "854385409126"
		});
		
		return firebaseApp;
    }

}

module.exports = Firebase;
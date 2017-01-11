import * as firebase from "firebase";

class Database {
	static uid = "";
	static firebaseRef = null;
	static carsRef = null;
	
	static cars = null;
	
	static initializeUid(uid) {
		this.uid = uid;
		if(this.uid != "") {
			this.carsRef = this.firebaseRef.child("users").child(this.uid).child("cars");
		}
	}
		
	static initializeFirebaseRef(firebaseRef) {
		this.firebaseRef = firebaseRef;
	}
	
	static addCar(car) {
		this.carsRef.child(car.uuid).set(car);
	}
	
	static updateCar(car) {
		this.carsRef.child(car.uuid).update(car);
	}
	
	static deleteCar(uuid) {
		this.carsRef.child(uuid).remove();
	}
	
	static initializeCars(cars) {
		this.cars = cars;
	}
	
	static getCars() {
		return this.cars;
	}

}

module.exports = Database;
import {
   AsyncStorage
} from 'react-native';
import {Car} from './Car';

export const readCar = async(model, callback) => await read(model, callback);
export const saveCar = async(car) => await save(car.model, car);
export const readAllCars = async(callback) => await readAll(callback);
export const clearAllCars = async() => await clearAll();
export const updateCar = async(car) => await update(car);
export const removeCar = async(model) => await remove(model);

export const save = async(key, object) => {
  await AsyncStorage.setItem(key, JSON.stringify(object));
}

export const read = async(key, callback) => {
  await AsyncStorage.getItem(key)
					.then(	(v1) => {
							var v = JSON.parse(v1);
							var car1 = new Car(v['make'], v['model'], v['year'], v['price'], v['stock']);
							callback(car1);
					});
}

export const readAll = async(callback) => {
	await AsyncStorage.getAllKeys()
					  .then((ks) => {
								ks.forEach(k => read(k, callback))
							}
					  );
}

export const clearAll = async() => {
	await AsyncStorage.clear();
}

export const update = async(car) => {
	await AsyncStorage.mergeItem(car.model, JSON.stringify(car));
}

export const remove = async(model) => {
	await AsyncStorage.removeItem(model);
}
const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

addOne();


async function addOne() {
	console.log('Add a new document...');
	const object = {
		id: "",
        name: "Lisa", 
        age: 2,
        favFood: "Cucumber",
        loves: "Food",
        imgName: "obj.imgName",
        wins: 0,
        defeats: 0,
        games: 0,
	}

	const docRef = await db.collection(HAMSTERS).add(object)
	console.log('Added document with the id ' + docRef.id);
}
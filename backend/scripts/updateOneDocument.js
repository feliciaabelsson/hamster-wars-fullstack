const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

updateOne();


async function updateOne(id) {
	console.log('Update a document...(named Sven)');
    //we need to collect an id to replace the data 
	const docId = id || '2H4UPLcIDw3wNg7X5iTY'

	const updates = {
		name: 'Svenni'
	}

    //merge : true is used to only change whats within the object  
	const settings = { merge: true }
    //uses set to replace the old document with the new data
	await db.collection(HAMSTERS).doc(docId).set(updates, settings)
}
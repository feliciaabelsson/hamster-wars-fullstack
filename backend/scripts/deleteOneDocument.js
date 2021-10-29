const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

deleteOne();


async function deleteOne(id) {
	console.log('Deleting a document...');
    //the id that we want to delete
	const docId = id || 'nTL9nuwEleyhlBGt3Jfs'

    //goes into the database and into collection hamsters and then into doucment and the looks for the chosen id
	const docRef = db.collection(HAMSTERS).doc(docId)
    //gest the status if the id is true or false
	const docSnapshot = await docRef.get()
	console.log('Document exists? ', docSnapshot.exists);
    //if the document reference exists then delete
	const result = await docRef.delete()
}
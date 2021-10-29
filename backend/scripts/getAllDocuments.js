const database = require('../database.js')
//gets connect object from database file
const connect = database.connect
//calls connect function
const db = connect()

const HAMSTERS = 'hamsters'

getAll();

async function getAll() {
    console.log('Retrieving all document from databse');

    //Get referens to the collection we want to use
    const hamstersRef = db.collection(HAMSTERS)
    //Get data that the collection includes
    //When we are making a request to a database the script have to wait a bit, therefore await
    const hamstersSnapshot = await hamstersRef.get()

    //checks if there are any documents in the collection
    if (hamstersSnapshot.empty) {
        console.log('No documents in collection.')
        return
    }

    const hamsterArray = []

    //If there is any documents in snapshot
    //docRef is the loop variabel (document reference)
    //Must wait for the forEach loop to be finished, or else you'll get an empty array
    await hamstersSnapshot.forEach(async docRef => {
        // console.log(`Found a docment reference: `, docRef.id)
        //gets data from server
        //waiting on the data
        const data = await docRef.data()

        //id is needed if you later want to change a document, e.g. PUT/DELETE
        data.id = docRef.id
        hamsterArray.push(data)        

    })

    console.log('data from database:' , hamsterArray)
}








//CORS - information
//const cors = require('cors)
// app.use(cors())
//cors header
// -> headers skickas med iom en get-request
//  När man skickar ett get-request så skickas det med en header
//headern innehåller mer information än det man skickar med
//en header talar tex om datum, content type
//grejen när man jobbar med api som ligger på en annan server än ens app
//för att kunna skicka request med webbläsaren och få ett svarmåste
//webservern ha en speciell header som innehåller CORS-information
//som talar om att man får skicka javascript-request
//utan header kan man inte använda requestet
//Jag måste bestämma om andra får använda det
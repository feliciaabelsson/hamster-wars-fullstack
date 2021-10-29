const { connect } = require('../database')
const db = connect()

//gets the data from data.json
const hamsterData = require('../data/data.json')

//loops through the data from data.json
//tells firestore to add a collection named hamsters
hamsterData.forEach(function(obj) {
    db.collection('hamsters').add({
        //tells firestore what data that should be written
        name: obj.name, 
        age: obj.age,
        favFood: obj.favFood,
        loves: obj.loves,
        imgName: obj.imgName,
        wins: obj.wins,
        defeats: obj.defeats,
        games: obj.games,
    }).then(function(docRef) {
        console.log('document written with id', docRef.id) //writes out all id´s that is being written from json-file
    })
    .catch(function(error) {
        console.log('Error adding document:' , error) //if something went wrong an error message will show up 
    })
})






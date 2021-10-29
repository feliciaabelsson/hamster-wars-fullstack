const { connect } = require("../database.js");
const db = connect();

//gets the data from data.json
const hamsterData = require("../data/data.json");
const HAMSTERS = "hamsters";

populate();

// Fill the collection with test data
async function populate() {
  hamsterData.forEach((object) => {
    let newObject = {
      ...object,
    };
    db.collection(HAMSTERS).add(newObject);
  });
}

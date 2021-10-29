const { connect } = require("../database.js");
const db = connect();

const HAMSTERS = "hamsters";

getOne();

//Get Sven from database
async function getOne(id) {
  console.log("Looking for Sven");
  const docId = id || "21f87cMAoIBvFCgcEMwb";

  const docSnapshot = await db.collection(HAMSTERS).doc(docId).get();

  //if the id do not exist
  if (!docSnapshot.exists) {
    console.log("Could not find him!");
    return;
  }
  //if the id do exist then return data from that specific document
  const data = await docSnapshot.data();
  console.log("Found: ", data);
  return data;
}

// module.exports = getOne

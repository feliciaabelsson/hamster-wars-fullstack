const express = require("express");
const router = express.Router();
const database = require("../database.js");
const connect = database.connect;
const db = connect();
const HAMSTERS = "hamsters";

const {isHamsterObject, isHamster} = require("../validations/validation");



// GET ENDPOINTS
router.get("/", async (req, res) => {
  let array = await getAllHamsters();
  // console.log(array);
  res.status(200).send(array);
});


// GET cutest hamster
router.get("/cutest", async (req, res) => {
  let cutest = await getCutestHamster()
  //console.log(cutest)
  res.status(200).send(cutest)
})


// GET random hamster
router.get("/random", async (req, res) => {
  let array = await getAllHamsters();
  let randomHamster =
  array[Math.floor(Math.random() * array.length)]
  res.status(200).send(randomHamster)
});


// GET :id
router.get("/:id", async (req, res) => {
  // Funktion som hämtar ett element om det finns
  const maybeHamster = await getOneHamster(req.params.id);

  if (!maybeHamster) { 
    res.sendStatus(404);
    return;
  } else {
    // console.log("The hamster object from get id" , maybeHamster);
    res.status(200).send(maybeHamster);
  }
});


//POST ENDPOINTS
router.post("/", async (req, res) => {
  const maybeBody = req.body;
  //om objektet som skickas in inte stämmer överens med valideringen
  if (!isHamsterObject(maybeBody)) {
    res.status(400).send("Bad request");
    return;
  }
  //korrekt objekt skickas in genom 
  let addHamster = await addOneHamster(maybeBody);
  res.status(200).send(addHamster);
});


//PUT ENDPOINTS
router.put("/:id", async (req, res) => { 		
	let body = req.body
	if (!isHamster(body)){
		res.sendStatus(400);
		return;
	}

	const newHamsterInfo = await updateHamster(req.params.id, body);
	if(!newHamsterInfo) {
		res.sendStatus(404);
		return;
	} else {
		res.sendStatus(200)
	}
})


//DELETE ENDPOINTS
router.delete("/:id", async (req, res) => {
  const hamsterId = req.params.id;
  const hamsterSnapshot = await db.collection(HAMSTERS).doc(hamsterId).get();

  if (hamsterSnapshot.exists) {
      await db.collection(HAMSTERS).doc(hamsterId).delete();
      res.sendStatus(200);
  } else {
      res.sendStatus(404);
  };
});


// FUNCTIONS ---- XXX

// GET ALL function
async function getAllHamsters() {
  const docRef = db.collection(HAMSTERS);
  const docSnapshot = await docRef.get();

  //Om det inte finns några hamstrar, skicka tillbaka en tom lista
  if (docSnapshot.empty) {
    return [];
  }
  
  const array = [];
  await docSnapshot.forEach(async docRef => {
    const data = await docRef.data();
    data.id = docRef.id;
    array.push(data);
  });
  return array;
}


// GET ONE function
async function getOneHamster(id) {
  const docRef = db.collection(HAMSTERS).doc(id);
  const docSnapshot = await docRef.get();

  //Kollar om jag har ett dokument eller inte
  if (docSnapshot.exists) {
    const hamster = await docSnapshot.data();
    console.log('The hamster that i requested:', hamster)
    return hamster;
  } else {
    return null;
  }
}


// UPDATE ONE function
async function updateHamster(id, body) {            
	const docRef = await db.collection(HAMSTERS).doc(id);
	const docSnapshot = await docRef.get();

	if (docSnapshot.exists) {
		const settings = { merge:true};
	  await db.collection(HAMSTERS).doc(id).set(body, settings);
		const data = await db.collection(HAMSTERS).doc(id).set(body, settings);
		return data;
	}
	return false
}


// ADD ONE function 
async function addOneHamster(object) {
  const docRef = await db.collection(HAMSTERS).add(object);
  const hamster = { id: docRef.id }
  return hamster
}


// GET CUTEST function
async function getCutestHamster() {
  let hamsters = await getAllHamsters()

  //går igenom alla hamstrar med sort och tar fram differensen 
  hamsters.sort((a, b) => {
    let diffA = a.wins - a.defeats
    let diffB = b.wins - b.defeats
    return diffB - diffA
  })
  //plockar fram den hamstern med högst poäng i listan
  let highestScore = hamsters[0].wins - hamsters[0].defeats
  //filtrerar igenom ifall någon hamster har samma poäng som någon annan
  let allWinners = hamsters.filter(hamster => hamster.wins - hamster.defeats === highestScore) 

  return allWinners
}


module.exports = router;


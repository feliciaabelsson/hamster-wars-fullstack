// const { urlencoded } = require("express");
const hamsterRouter = require("./routes/hamsters");
const express = require("express");
const app = express();
const cors = require('cors')


// first run environmental variable, if not run port 1337
// environmental variables is good for sercrets
const PORT = process.env.PORT || 1337;


// MIDDLEWARES
app.use( cors());
app.use(express.urlencoded({ extended: true }));
// för att skicka data i json format
app.use(express.json());
// Logger för att kunna se vad för requests som kommer in
app.use((req, res, next) => {
  console.log(` ${req.method}  ${req.url}`, req.body);
  next();
});

// Routes

// MIDDLEWARE - statiska sidor
app.use("/hamsters", hamsterRouter);
app.use("/img", express.static(__dirname + '/img'))
app.use("/", express.static(__dirname + '/../build'))
// talar om att hamstersRouter middleware ska användas för alla routes som börjar med /hamsters



// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/build/index.html')
// }) 

app.get('*', (req, res) => {
	var path = require('path');
  res.sendFile(path.resolve(__dirname + '/../build/index.html'))

})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});


/*
currenttime-startTime = Total time since start

Total time % whole route time = time currently taken

moment().diff(moment(startTime), 'minutes')

time left = whole route time-time currently taken

--------------------------------
name = $('#name-input').val().trim();

database.ref().set({name: name})

database.push({});
.on('child-added', function(snapshot) {
	
}*/

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJP2AR7O4UOHMjOnUQTHFtBpV3s6gH3MU",
    authDomain: "train-scheduler-9178d.firebaseapp.com",
    databaseURL: "https://train-scheduler-9178d.firebaseio.com",
    storageBucket: "train-scheduler-9178d.appspot.com",
    messagingSenderId: "806689964907"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// Button for adding new train
 $('#add-train').on('click', function(event) {
 	event.preventDefault();

 	var trainName = $('#name').val().trim();
 	var trainDestination = $('#destination').val().trim();
 	var trainFirst = moment($('#first').val().trim(), 'HH:mm').format('HH:mm');
 	var trainFrequency = $('#frequency').val().trim();

var now = moment().format('HH:mm');

console.log('train name is ' + trainName);
console.log('current military time is ' + now);

//create temp object to hold new train data
var newTrain = {
	name: trainName,
	destination: trainDestination,
	first: trainFirst,
	frequency: trainFrequency  
}

//push new object to database
database.ref().push(newTrain);
//firebase.database().ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);

//clear the text boxes
 $('#name').val('');
 $('#destination').val('');
 $('#first').val('');
 $('#frequency').val('');

 })

 //set up an event to append the data to the screen when a child is added to the database

 database.ref().on('child_added', function(childSnapshot) {
 	console.log('added ' + childSnapshot.val());

 })



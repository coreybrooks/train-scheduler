
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

 	var trainName = $('#train-name').val().trim();
 	var destination = $('#destination').val().trim();
 	var firstTrain = moment($('#first-train').val().trim(), 'HH:mm').format('HH:mm');
 	var frequency = $('#frequency').val().trim();

var now = moment().format('HH:mm');

console.log(firstTrain);
console.log('current military time is ' + now);


 })



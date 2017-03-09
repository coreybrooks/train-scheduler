
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


    // Varify if the time entered is valid, if not alert user and make them reenter
    var validTest = moment(trainFirst, 'HH:mm').isValid();

 	if (!validTest) {
	  alert('that is not a valid time');
      $('#first').val('');  	  //clear the time text box
	  return;
    }
    
    else  {
    	console.log('valid time');

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


    //clear the text boxes
     $('#name').val('');
     $('#destination').val('');
     $('#first').val('');
     $('#frequency').val('');
    }
 });

 //set up an event to append the data to the screen when a child is added to the database

 database.ref().on('child_added', function(childSnapshot) {

 	//store everything into variables
 	var name = childSnapshot.val().name;
 	var destination = childSnapshot.val().destination;
 	var first = childSnapshot.val().first;
 	var frequency = childSnapshot.val().frequency;


    var totalMinutes = moment().diff(moment(first, 'HH:mm'), 'minutes');

    console.log('totalMinutes1 ' + totalMinutes);

    var timeSinceLastArrival = totalMinutes % frequency;
    var minutesAway = frequency - timeSinceLastArrival;
    var nextArrival = moment().add(minutesAway, 'minutes').format('HH:mm');

    if (totalMinutes < 0) {
	    nextArrival = first;
	    timeSinceLastArrival = '';
	    minutesAway = (moment().diff(moment(first, 'HH:mm'), 'minutes'))*(-1) + ' *';
    }


    console.log('first ' + first);
    console.log('totalMinutes ' + totalMinutes);
    console.log('timeSinceLastArrival ' + timeSinceLastArrival);
    console.log('frequency ' + frequency);
    console.log('minutesAway ' + minutesAway);
    console.log('nextArrival ' + nextArrival);
    console.log('------------');


 	//append each train's data into the table
 	$('.display-table').append('<tr><td>' + name + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + 
 	nextArrival + '</td><td>' + minutesAway + '</td></tr>');

 })




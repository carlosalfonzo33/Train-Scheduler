//document load
$(document).ready(funcion() {

	//Initalize firebase
	 var config = {
    apiKey: "AIzaSyD2S-x_cyfJFbjC_ArK9DV705A4uWclI1w",
    authDomain: "train-scheduler-d4a50.firebaseapp.com",
    databaseURL: "https://train-scheduler-d4a50.firebaseio.com",
    projectId: "train-scheduler-d4a50",
    storageBucket: "train-scheduler-d4a50.appspot.com",
    messagingSenderId: "513474582365"
  };
  firebase.initializeApp(config);

var database = firebase.database();

	var name = "";
	var destination = "";
	var startTime = "";
	var frequency = "";
	var childSnapshotArray = [];


$("#add-train").on("click", function() {
	name = $("#train-name").val().trim();
	destionation = $("#destination").val().trim();
	startTime = $("#start-time").val();
	frequency = $("#frequency").val().trim();

	database.ref().push({
		name: name,
		destination: destionation,
		startTime: moment(startTime, "HH:mm").format("HH:mm"),
		frequency: +frequency
	});

	$("#new-train-form")[0].reset();

	return false;

										});

database.ref().on("child_added", function(childSnapshot) {

	childSnapshotArray.push(childSnapshot.val());
	render();
},
	function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
	});

fucntion minutesAway(startTime, frequency) {
	var currentTime = moment();
	var startTimeMinutes = currentTime.diff(momment(startTime, "HH:mm"), "minutes");
	var numberOfTrains = Math.floor(startTimeMinutes / frequency);
	var lastTrainTime = (numberOfTrains * frequency);

}


});


});
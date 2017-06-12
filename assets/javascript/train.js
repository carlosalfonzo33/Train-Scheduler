$(document).ready(function() {

    //initalize firebase
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

    // intialize the global variables. 

    var name = "";
    var destination = "";
    var startTime = "";
    var frequency = "";
    var childSnapshotArray = [];

    //capture the value of the input boxes on click of the submit button and set equal to the global variables
    $("#add-train").on("click", function() {
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        startTime = $("#start-time").val();
        frequency = $("#frequency").val().trim();

        //push the input values to firebase as an object
        database.ref().push({
            name: name,
            destination: destination,
            startTime: moment(startTime, "HH:mm").format("HH:mm"),
            frequency: +frequency

        });
        //reset the form
        $("#new-train-form")[0].reset();


        return false;
    });

    //call on the database everytime information is sent to the database
    database.ref().on("child_added", function(childSnapshot) {

            //push the values of childSnapshot to the childSnapShotArray
            childSnapshotArray.push(childSnapshot.val());

            render();

        }, // Handle the errors
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    function minutesAway(startTime, frequency) {

        //set the current time
        var currentTime = moment();
        console.log(currentTime);
        //set the startTimeMinutes variable equal to the difference between the current time and the start time
        var startTimeMinutes = currentTime.diff(moment(startTime, "HH:mm"), "minutes");
        console.log(startTimeMinutes);

        //calculate the number of trains bu subtracting the currentTime from the startTime and dividing by the frequency and get a whole number
        var numberOfTrains = Math.floor(startTimeMinutes / frequency);
        console.log(numberOfTrains);

        //calculate the lastTrainTime multiplied by the frequency and add to the startTime
        var lastTrainTime = (numberOfTrains * frequency);
        console.log(lastTrainTime);

        //calculate the next arrival by taking the lastTrainTime plus the frequency
        var nextArrivalMinutesPastStartTime = lastTrainTime + frequency;
        console.log(nextArrivalMinutesPastStartTime);

        //calculate minutes away by taking the current starttime and adding next arrival minutes and taking the difference from the current starttime
        var minutesAway = moment(startTime, "HH:mm").add(nextArrivalMinutesPastStartTime, "minutes").diff(currentTime, "minutes");
        console.log(minutesAway);
        //return the minutes away
        return minutesAway;
    }







// I'm implementing the experiment using a data structure that I call a **sequence**. The insight behind sequences is that many experiments consist of a sequence of largely homogeneous trials that vary based on a parameter. For instance, in this example experiment, a lot stays the same from trial to trial - we always have to present some number, the subject always has to make a response, and we always want to record that response. Of course, the trials do differ - we're displaying a different number every time. The idea behind the sequence is to separate what stays the same from what differs - to **separate code from data**. This results in **parametric code**, which is much easier to maintain - it's simple to add, remove, or change conditions, do randomization, and do testing.

// ## High-level overview
// Things happen in this order:
// 
// 1. Compute randomization parameters (which keys to press for even/odd and trial order), fill in the template <code>{{}}</code> slots that indicate which keys to press for even/odd, and show the instructions slide.
// 2. Set up the experiment sequence object.
// 3. When the subject clicks the start button, it calls <code>experiment.next()</code>
// 4. <code>experiment.next()</code> checks if there are any trials left to do. If there aren't, it calls <code>experiment.end()</code>, which shows the finish slide, waits for 1.5 seconds, and then uses mmturkey to submit to Turk.
// 5. If there are more trials left, <code>experiment.next()</code> shows the next trial, records the current time for computing reaction time, and sets up a listener for a key press.
// 6. The key press listener, when it detects either a P or a Q, constructs a data object, which includes the presented stimulus number, RT (current time - start time), and whether or not the subject was correct. This entire object gets pushed into the <code>experiment.data</code> array. Then we show a blank screen and wait 500 milliseconds before calling <code>experiment.next()</code> again.

// ## Helper functions

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

// Get a random integer less than n.
function randomInteger(n) {
	return Math.floor(Math.random()*n);

}

var response_logged = null;
function log_response(element) {
	response_logged = null
	//Array of radio buttons
	var radio = document.getElementsByName(element);
	var data={}
	// Loop through radio buttons
	for (i = 0; i < radio.length; i++) {
	    if (radio[i].checked) {
			data[element]= radio[i].value
			experiment.data.push(data);
			response_logged = true;		    
	    }
	}
}

var profileOrder = randomElement([[8,16,11,2,14,3,9,7,17,15,12,4,13,6,1,5,10,18],[11,4,6,12,5,7,15,2,18,13,10,8,14,1,16,17,3,9]]);
var profileOrder = randomElement(["Order1","Order2"]);



function beginProfiles(){
	experiment.data.push(profileOrder)
	if (profileOrder == "Order1") {
		showSlide ("profile_eight");
	}
	if (profileOrder == "Order2") {
		showSlide ("profile_eleven");
	}
}

function submitDemographics(){
	data = $('#demographicsForm').serializeArray();  
	experiment.data.push(data);
	experiment.end();
}

function submitProfileOne() {
	answered=0
	liking=document.getElementsByName("liking1");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profileoneMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}

	else{
		log_response("liking1")
		if (profileOrder == "Order1") {
			showSlide ("profile_five");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_sixteen");
		}
	}
}
function submitProfileTwo(){
	answered=0
	liking=document.getElementsByName("liking2");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profiletwoMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}

	else{
		log_response("liking2")
		if (profileOrder == "Order1") {
			showSlide ("profile_fourteen");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_eighteen");
		}
	}
}

function submitProfileThree(){
	answered=0
	liking=document.getElementsByName("liking3");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilethreeMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}

	else{
		log_response("liking3")
		if (profileOrder == "Order1") {
			showSlide ("profile_nine");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_nine");
		}
	}
}

function submitProfileFour(){
	answered=0
	liking=document.getElementsByName("liking4");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilefourMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}

	else{
		log_response("liking4")
		if (profileOrder == "Order1") {
			showSlide ("profile_thirteen");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_six");
		}

	}
}
function submitProfileFive(){
	answered=0
	liking=document.getElementsByName("liking5");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilefiveMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}

	else{
		log_response("liking5")
		if (profileOrder == "Order1") {
			showSlide ("profile_ten");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_seven");
		}
	}
}

function submitProfileSix(){
	answered=0
	liking=document.getElementsByName("liking6");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilesixMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}

	else{
		log_response("liking6")
		if (profileOrder == "Order1") {
			showSlide ("profile_one");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_twelve");
		}
	}
}
function submitProfileSeven(){
	answered=0
	liking=document.getElementsByName("liking7");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilesevenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}

	else{
		log_response("liking7")
		if (profileOrder == "Order1") {
			showSlide ("profile_seventeen");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_fifteen");
	}

	}
}
function submitProfileEight(){
	answered=0
	liking=document.getElementsByName("liking8");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profileeightMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking8")
		if (profileOrder == "Order1") {
			showSlide ("profile_sixteen");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_fourteen");
		}
	}
}
function submitProfileNine(){
	answered=0
	liking=document.getElementsByName("liking9");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilenineMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking9")
		if (profileOrder == "Order1") {
			showSlide ("profile_seven");
		}
		if (profileOrder == "Order2") {
			showSlide ("modesty_scale");
		}
	}
}

function submitProfileTen(){
	answered=0
	liking=document.getElementsByName("liking10");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profiletenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking10")
		if (profileOrder == "Order1") {
			showSlide ("profile_eighteen");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_eight");
		}
	}
}

function submitProfileEleven(){
	answered=0
	liking=document.getElementsByName("liking11");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profileelevenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking11")
		if (profileOrder == "Order1") {
			showSlide ("profile_two");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_four");
		}
	}
}

function submitProfileTwelve(){
	answered=0
	liking=document.getElementsByName("liking12");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profiletwelveMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking12")
		if (profileOrder == "Order1") {
			showSlide ("profile_four");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_five");
		}
	}
}

function submitProfileThirteen(){
	answered=0
	liking=document.getElementsByName("liking13");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilethirteenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking13")
		if (profileOrder == "Order1") {
			showSlide ("profile_six");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_ten");
		}
	}
}

function submitProfileFourteen(){
	answered=0
	liking=document.getElementsByName("liking14");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilefourteenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking14")
		if (profileOrder == "Order1") {
			showSlide ("profile_three");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_one");
		}
	}
}

function submitProfileFifteen(){
	answered=0
	liking=document.getElementsByName("liking15");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilefifteenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking15")
		if (profileOrder == "Order1") {
			showSlide ("profile_twelve");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_two");
		}
	}
}

function submitProfileSixteen(){
	answered=0
	liking=document.getElementsByName("liking16");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profilesixteenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking16")
		if (profileOrder == "Order1") {
			showSlide ("profile_eleven");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_seventeen");
		}
	}
}

function submitProfileSeventeen(){
	answered=0
	liking=document.getElementsByName("liking17");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profileseventeenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking17")
		if (profileOrder == "Order1") {
			showSlide ("profile_fifteen");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_three");
		}
	}
}

function submitProfileEighteen(){
	answered=0
	liking=document.getElementsByName("liking18");
	for (i = 0; i < liking.length; i++) {
		
		if (liking[i].checked) {
			answered=1
		}
	}	
	if (answered == 0){
		 $("#profileeighteenMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
	else{
		log_response("liking18")
		if (profileOrder == "Order1") {
			showSlide ("modesty_scale");
		}
		if (profileOrder == "Order2") {
			showSlide ("profile_thirteen");
		}
	}
}

function submitModesty(){
	var response_logged_modesty = true
	for (j = 1; j<21; j++) {
		var name = "MR" + j;
		var element = document.getElementsByName(name);
		answered=0
		for (i = 0; i < element.length; i++) {
			if (element[i].checked) {
				answered=1
			}
		}	
		if (answered == 0){
			alert('Please answer question ' + j+".")
			response_logged_modesty = false
			break;
		}
	} 
	if (response_logged_modesty == false){
		return;
	}
	log_response("MR1");
	log_response("MR2");
	log_response("MR3");
	log_response("MR4");
	log_response("MR5");
	log_response("MR6");
	log_response("MR7");
	log_response("MR8");
	log_response("MR9");
	log_response("MR10");
	log_response("MR11");
	log_response("MR12");
	log_response("MR13");
	log_response("MR14");
	log_response("MR15");
	log_response("MR16");
	log_response("MR17");
	log_response("MR18");
	log_response("MR19");
	log_response("MR20");
	if(response_logged_modesty == true){
		showSlide('demographics');
	}
}
// Get a random element from an array (e.g., <code>random_element([4,8,7])</code> could return 4, 8, or 7). This is useful for condition randomization.
function randomElement(array) {
  return array[randomInteger(array.length)];
}

showSlide("instructions");

// ## The main event
// I implement the sequence as an object with properties and methods. The benefit of encapsulating everything in an object is that it's conceptually coherent (i.e. the <code>data</code> variable belongs to this particular sequence and not any other) and allows you to **compose** sequences to build more complicated experiments. For instance, if you wanted an experiment with, say, a survey, a reaction time test, and a memory test presented in a number of different orders, you could easily do so by creating three separate sequences and dynamically setting the <code>end()</code> function for each sequence so that it points to the next. **More practically, you should stick everything in an object and submit that whole object so that you don't lose data (e.g. randomization parameters, what condition the subject is in, etc). Don't worry about the fact that some of the object properties are functions -- mmturkey (the Turk submission library) will strip these out.**

var experiment = {
  // Parameters for this sequence.
  //trials: myTrialOrder,
 // mySlideList:slideList,
  // Experiment-specific parameters - which keys map to odd/even
 // keyBindings: myKeyBindings,
  // An array to store the data that we're collecting.
  data: [],
  // The function that gets called when the sequence is finished.
  end: function() {
    // Show the finish slide.
    showSlide("finished");
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    setTimeout(function() { turk.submit(experiment) }, 1500);
  },
  // The work horse of the sequence - what to do on every trial.
}

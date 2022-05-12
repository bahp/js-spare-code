/*******************************************
 Configuration
 *******************************************/

/*******************************************
 Global variable
 *******************************************/
var questions = [];

/*******************************************
 Execute when document is ready
 *******************************************/
$(document).ready(function() {
   
  // -------------------------------
  // Dropdown
  // -------------------------------
  // Populate it with topics
  $.each(Object.keys(questions_by_topic),
    function(index, value) {
      $("#select-topic").append("<option>" + value + "</option>");
  });

  // Handle change by selecting questions
  $("#select-topic").change(function() {
    questions = questions_by_topic[$(this).val()];
  });

  // -------------------------------
  // Create audio context
  // -------------------------------
  a = new AudioContext() 

});


/*******************************************
 Helper methods
 *******************************************/
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (+max - +min)) + +min; 
}

/*******************************************
 Main methods
 *******************************************/
function next() {

  questions = questions_by_topic[$("#select-topic").val()];

  // Select a random question
  var idx = getRandomInteger(0, questions.length);

  // Display the question in the div
  document.getElementById('question').innerHTML = questions[idx];

  // Delete previous progress bar
  document.getElementById('progressbar').innerHTML = ''

  // Get the loading bar duration
  var duration = document.getElementById('duration').value

  // Create a progress bar
  var bar = new ProgressBar.Line(progressbar, {
    strokeWidth: 1,
    easing: 'easeInOut',
    duration: duration*1000,
    color: '#ffbb99',
    trailColor: '#eee',
    trailWidth: 0.5,
    svgStyle: {width: '100%', height: '100%'}
  });

  // Animate
  bar.animate(1.0);

}


function play() {
  /**
   * Starts the game.
   */
  // Execute
  next()
  // Periodically
  var duration = parseInt($('#duration').val())*1000;
  intervalID = setInterval(next, duration);
  // Disable/Enable
  $('#stop').removeAttr('disabled','disabled');
  $('#play').attr('disabled','disabled');
}

function stop() {
  /**
   * Stops the game.
   */
  clearInterval(intervalID);
  $('#play').removeAttr('disabled','disabled');
  $('#stop').attr('disabled','disabled');
}

function beep(vol, freq, duration){
  v=a.createOscillator()
  u=a.createGain()
  v.connect(u)
  v.frequency.value=freq
  v.type="square"
  u.connect(a.destination)
  u.gain.value=vol*0.01
  v.start(a.currentTime)
  v.stop(a.currentTime+duration*0.001)
}



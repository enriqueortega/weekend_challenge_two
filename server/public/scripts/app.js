var counter = 0;
var totalPeople = 0;
var fadeduration = 500;
var timer = setInterval(toggleNext, 10000);

$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        appendDom(data);
        startSquence();
      }
    });

    //next button
    $('.container').on('click', '.next', toggleNext);
    //prev button
    $('.container').on('click', '.prev', togglePrev);
    //index navigation
    $('.container').on('click', '.indexStyle', indexSelector);
});

function appendDom(data){

  for(var k = 0; k < data.kappa.length; k++){
    $('.carouselIndex').append('<div class="indexStyle" id="' + k +'"></div>');
    $('.carouselIndex').children().last().data("person", k);
  }

  for(var i = 0 ; i < data.kappa.length; i++){
  $(".carousel").append('<div style="display:none" class="kapper-' + i + '" id="kap' + i + '"></div>');

  var $el = $(".carousel").children().last();

    $el.append('<h2>' + data.kappa[i].name + '</h2>');
    $el.append('<p><span class="title">Location:</span> ' + data.kappa[i].location + '</p>');
    $el.append('<p><span class="title">Spirit Animal:</span> ' + data.kappa[i].spirit_animal+ '</p>');
    $el.append('<p><span class="title">Shoutout:</span> ' + data.kappa[i].shoutout + '</p>');
    totalPeople++;
  }
}

function startSquence(){
  $('.kapper-' + counter).fadeIn(fadeduration);
  counter++;
}

function toggleNext(){
  if(counter >= totalPeople){
    counter = 0;
  }
  $('.kapper-' + counter).delay(fadeduration).fadeIn(fadeduration);

  if(counter == 0){
    $('.kapper-' + (totalPeople - 1)).fadeOut(fadeduration);
  }
  $('.kapper-' + (counter - 1)).fadeOut(fadeduration);
  counter++;

  timerReset();
}


function togglePrev(){
  counter--;
  if(counter < 0){
    counter = (totalPeople - 1);
  }
  $('.kapper-' + counter).fadeOut(fadeduration);

  if(counter == 0){
    $('.kapper-' + (totalPeople - 1)).delay(fadeduration).fadeIn(fadeduration);
  }
  $('.kapper-' + (counter - 1)).delay(fadeduration).fadeIn(fadeduration);

  timerReset();
}

function indexSelector(){
  //TODO: Hire hitman


  console.log("foo");
  var selection = $(this).data("person");
  console.log(selection);
  $('.kapper-' + (counter - 1)).fadeOut(fadeduration);

  counter = selection;


  //targets current kappan to fade out
  //fades in new kappan
  $('.kapper-' + selection).delay(fadeduration).fadeIn(fadeduration);


  counter++;
  //resets timer
  timerReset();

}

function timerReset(){
  clearInterval(timer);
  timer = setInterval(toggleNext, 4000);
}

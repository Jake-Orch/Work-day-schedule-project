// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var time = dayjs().format('H');
var date = dayjs().format('DD-MM-YYYY')
var timeSlots = $('#hour-9, #hour-10, #hour-11, #hour-12, #hour-13, #hour-14, #hour-15, #hour-16, #hour-17',)
var textArea = document.querySelectorAll('textarea')
console.log(time);
console.log(timeSlots);

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  function init() {
  $(textArea).each(function () {
    var parent = $(this).parent().attr('id');
    var text = JSON.parse(localStorage.getItem(parent));
    console.log(text);
    $(this).text(text);
  })};
  init()

  $('button').click(function (event) {
    event.preventDefault();
    var textBox = $(this).siblings('textarea').val();
    console.log(textBox);
    var parent = $(this).parent().attr('id');
    console.log(parent);
    if (textBox !== '') {
      localStorage.setItem(parent, JSON.stringify(textBox));
      console.log('stored');
    }
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  $(timeSlots).each(function () {
    var idVal = $(this).attr('id').replace('hour-', '');
    console.log(idVal);
    var currentHour = moment().hours();
    if (idVal == currentHour) {
      $(this).addClass('present');
      $(this).removeClass('past');
      $(this).removeClass('future');
      console.log(idVal + ' is present ' + currentHour)
    } else if (idVal < currentHour) {
      $(this).addClass('past');
      $(this).removeClass('present');
      $(this).removeClass('future');
      console.log(idVal + ' is past ' + currentHour)
    } else if (idVal > currentHour) {
      $(this).addClass('future');
      $(this).removeClass('past');
      $(this).removeClass('present');
      console.log(idVal + ' is future ' + currentHour)
    }
  });
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  $('header').append(date);
  // TODO: Add code to display the current date in the header of the page.
});

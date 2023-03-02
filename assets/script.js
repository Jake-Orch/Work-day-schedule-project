var date = dayjs().format('dddd, DD MMMM YYYY');
// var hour = dayjs().format('H');
// I used the above variable for the timeSlots.each function, but the 9am box would always get the future class assigned to it. I was advised to use moment().hours() and add another dayjs cdn and it seems to work.
var timeSlots = $('#hour-9, #hour-10, #hour-11, #hour-12, #hour-13, #hour-14, #hour-15, #hour-16, #hour-17',);
var textArea = document.querySelectorAll('textarea');

$(function () {
//This function saves the users notes into the local storage and assignes the key as the ID of the div which they wrote their notes in for me to use later when assigning to notes back to the webpage.
  $('button').click(function (event) {
    event.preventDefault();
    var textBox = $(this).siblings('textarea').val();
    var parent = $(this).parent().attr('id');
    if (textBox !== '') {
      localStorage.setItem(parent, JSON.stringify(textBox));
    }
  });

  // this function checks weather the hour of each section on the page is equal to, lesser than or larger than the current time, using this information I assign the classes .past, .present and .future to the correct classes.
  $(timeSlots).each(function () {
    var idVal = $(this).attr('id').replace('hour-', '');
    // someone from askBCS reccomended using another dayjs link and using this to get the current hour as apposed to using dayjs().format(H) as it was causing issues here.
    var currentHour = moment().hours();
    if (idVal == currentHour) {
      $(this).addClass('present');
      $(this).removeClass('past');
      $(this).removeClass('future');
    } else if (idVal < currentHour) {
      $(this).addClass('past');
      $(this).removeClass('present');
      $(this).removeClass('future');
    } else if (idVal > currentHour) {
      $(this).addClass('future');
      $(this).removeClass('past');
      $(this).removeClass('present');
    }
  });
// this function is used to retrieve the data stored in the local storage and use the id of each div to select the correct peice of stored data for each section of the page.
  function init() {
    $(textArea).each(function () {
      var parent = $(this).parent().attr('id');
      var text = JSON.parse(localStorage.getItem(parent));
      $(this).text(text);
    })
  };
  init()
// this peice of code is to append the date to the header of the webpage
  $('header').append(date);
});

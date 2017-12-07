'use strict'

// self invoked when document finished loading
$(function(){


function callBoth() {
  if( formValidation() === true ) {
    createListItems();
  }
}


window.onload = createStoredItems();
$('#create-button').click(callBoth);
$('.trash-icon').click(deleteItems);
// $('#form-container').keyup(formValidation);


function formValidation() {

  if(checkTitle() === false) {
    return false;
  } else if(checkDiscription() === false) {
    return false;
  } else if(checkDate() == false) {
    return false;
  } else if(checkTime() == false) {
    return false;
  }
  return true;
}



function checkTitle() {
  var errorMsgTitle = '';

  if ($('#title').val() === '') {
    errorMsgTitle = 'Title field Cannot be empty';
  }

  if(errorMsgTitle != '') {
    $('#title-error').html(errorMsgTitle).fadeTo(0, 0);
    $('#title-error').html(errorMsgTitle).fadeTo(500, 1);
      return false;
  } else if(errorMsgTitle == '') {
      $('#title-error').fadeTo(500, 0);
  }
  return true;
}



function checkDiscription() {
  var errorMsgDiscription = '';

 if($('#discription').val() === '') {
    errorMsgDiscription = 'Discription field Cannot be empty';
}

  if(errorMsgDiscription != '') {
    $('#discription-error').html(errorMsgDiscription).fadeTo(0, 0);
    $('#discription-error').html(errorMsgDiscription).fadeTo(500, 1);
      return false;
  } else if(errorMsgDiscription == '') {
      $('#discription-error').fadeTo(500, 0);
  }
  return true;
}


function checkDate() {

    var dateInputValue = $('#date').val(),
        minYear = (new Date()).getFullYear(),
        maxYear = (new Date()).getFullYear() * 100,
        currentDay = (new Date()).getDate(),
        currentMonth = (new Date()).getMonth() + 1,
        errorMsgDate = '',
        dateRegExTest = '';
        
    // regular expression to match required date format
    var regExp = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    if(dateInputValue != '') {
      if(dateRegExTest = dateInputValue.match(regExp)) {
        
        //Day Validation
        if(dateRegExTest[1] < 1
        || dateRegExTest[1] > 31) {
          errorMsgDate = 'Invalid value for day - Must be between 1 - 31';
        } else if(dateRegExTest[2] == currentMonth 
               && dateRegExTest[1] < currentDay) {
          errorMsgDate = 'Invalid value for day - Must be Today or in the future';
        //Month Validation
        } else if(dateRegExTest[2] < 1
             || dateRegExTest[2] > 12) {
          errorMsgDate = 'Invalid value for month - Must be between 1 - 12';
        } else if (dateRegExTest[2] < currentMonth) {
          errorMsgDate = 'Invalid value for month - Must be this Month or in the future';
        //Year Validation
        } else if(dateRegExTest[3] < minYear
             || dateRegExTest[3] > maxYear) {
          errorMsgDate = 'Invalid value for year: ' + dateRegExTest[3] 
          + ' - must be between ' + minYear + ' and the future';
        }
        } else {
        errorMsgDate = 'Invalid date format - Must be DD/MM/YYYY ';
        }
    } else {
      errorMsgDate = 'Empty date field is not allowed';
    }

    if(errorMsgDate != '') {
      $('#date-error').html(errorMsgDate).fadeTo(0, 0);
      $('#date-error').html(errorMsgDate).fadeTo(500, 1);
      return false;
    } else if(errorMsgDate == '') {
      $('#date-error').fadeTo(500, 0);
    }

    return true;
}



function checkTime() {

  var timeInputValue = $('#time').val(),
      currentHour = (new Date()).getHours(),
      currentMinutes = (new Date()).getMinutes(),
      errorMsgTime = '',
      timeRegExTest = '';
  
  var dateInputValue = $('#date').val(),
      currentYear = (new Date()).getFullYear(),
      currentDay = (new Date()).getDate(),
      currentMonth = (new Date()).getMonth() + 1,
      dateString = '0' + currentDay + '/' + '0' + currentMonth + '/' + currentYear;


  // regular expression to match required time format
  var regExp = /^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/;

  if(timeInputValue != '') {
    if(timeRegExTest = timeInputValue.match(regExp)) {
      if(timeRegExTest[1] > 23) {
        errorMsgTime = 'Invalid value for hours - Must be from 1-24';
      }
      // only check hour if date input = today, no need to check otherwise.
      if(dateString === dateInputValue ) {
        if(timeRegExTest[1] < currentHour) {
          errorMsgTime = 'Invalid value for hours - Must be in the future';
       }
      }
      if(!errorMsgTime && (timeRegExTest[2] > 60 && timeRegExTest[2] < 0) ) {
        errorMsgTime = 'Invalid value for minutes - Must be 1-60';
      }
      // only check min if date input = today, no need to check otherwise.
      if(dateString === dateInputValue ) {
        if(timeRegExTest[2] < currentMinutes) {
          if(timeRegExTest[1] > currentHour) {
          } else {
            errorMsgTime = 'Invalid value for minutes - Must be in the future';
          }
        }
      }
    } else {
        errorMsgTime = 'Invalid time format - Must be HH:MM';
    }
  } else {
      errorMsgTime = 'Empty time field is not allowed';
  }

  if(errorMsgTime != '') {
    $('#time-error').html(errorMsgTime).fadeTo(0, 0);
    $('#time-error').html(errorMsgTime).fadeTo(500, 1);
      return false;
  } else if(errorMsgTime == '') {
      $('#time-error').fadeTo(500, 0);
  }
  return true;
}



function CreateObjects() {
  this.title = $('#title').val();
  this.discription = $('#discription').val();
  this.date = $('#date').val();
  this.time = $('#time').val();
}


function createListItems() {

  var title = $('#title').val(),
      discription = $('#discription').val(),
      date = $('#date').val(),
      time = $('#time').val(),
      jsonString = '',
      taskObj = '',
      taskObjHolder = [];

  var string = "<li><div class=\"task-content speech-bubble\"><span class=\"trash-icon btn btn-default glyphicon glyphicon-trash\"><\/span><div id=\"task-title\">" + title + "<\/div>  <div id=\"task-discription\">" + discription + "<\/div>  <div id=\"task-footer\">" + date + " " + time + "<\/div><\/div><\/li>";
  $('ul').prepend(string);
  $('li').addClass('animated fadeIn');
  $('.trash-icon').click(deleteItems);

  if( localStorage.length > 0 ) {
    var storedTaskArray = JSON.parse(localStorage.tasks);
    taskObj = new CreateObjects();
    storedTaskArray.push(taskObj);
    jsonString = JSON.stringify(storedTaskArray);
    localStorage.setItem('tasks', jsonString);
  } else {
    taskObj = new CreateObjects();
    taskObjHolder.push(taskObj);
    jsonString = JSON.stringify(taskObjHolder);
    localStorage.setItem('tasks', jsonString);
  }
}



function createStoredItems() {

  if( localStorage.length > 0 ) {
    var storedTaskArray = JSON.parse(localStorage.tasks);
      for( var i = 0; i < storedTaskArray.length; i++ ) {

        var discription = storedTaskArray[i].discription,
            title = storedTaskArray[i].title,
            date = storedTaskArray[i].date,
            time = storedTaskArray[i].time;

        var string = "<li><div class=\"task-content speech-bubble\"><span class=\"trash-icon btn btn-default glyphicon glyphicon-trash\"><\/span><div id=\"task-title\">" + title + "<\/div>  <div id=\"task-discription\">" + discription + "<\/div>  <div id=\"task-footer\">" + date + " " + time + "<\/div><\/div><\/li>";
        $('ul').prepend(string);
        $('li').addClass('animated fadeIn');
    }
  } else {
    return false;
  }
}



function deleteItems() {

  var storedTaskArray = JSON.parse(localStorage.tasks),
      jsonString = '',
      taskDOMValues = $('li').children('div'),
      deleted = true;

  if( localStorage.length > 0 ){

    for(var i = 0; i < storedTaskArray.length; i++ ){

      for(var j = 0; j < taskDOMValues.length; j++ ) {

        if( taskDOMValues[j].textContent ===
            storedTaskArray[i]['title'] + '  ' 
          + storedTaskArray[i]['discription'] + '  ' 
          + storedTaskArray[i]['date'] + ' ' 
          + storedTaskArray[i]['time'] ) {

          storedTaskArray.splice( i, 1 );
          jsonString = JSON.stringify(storedTaskArray);
          localStorage.setItem('tasks', jsonString);
          $(this).parent('div').parent('li').removeClass('fadeIn');
          $(this).parent('div').parent('li').addClass('fadeOut');
          $(this).parent('div').parent('li').remove();
          return deleted = true;
        } else {
          deleted = false;
        }
      }
      if ( deleted == true ) {
        break;
      } else {
        continue;
      }
    }
  } else {
    return false;
  }
  if( storedTaskArray.length == 0 ) {
      localStorage.clear();
  }
}

//collapse button + icon
$("#form-container").on("hide.bs.collapse", function(){
    $("#collapsebtn").html('<span class="glyphicon glyphicon-collapse-down"></span> Task Creator');
});
$("#form-container").on("show.bs.collapse", function(){
    $("#collapsebtn").html('<span class="glyphicon glyphicon-collapse-up"></span> Task Creator');
});


});
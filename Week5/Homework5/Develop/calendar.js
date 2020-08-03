$(document).ready(function() {

    //set test flag
    var test =  false;

    //use moment to get date
    var now = moment().format('MMMM Do YYYY');

    //use moment, commented out for testing non standard hours
    var now24hour = moment().format('H');
    var now12hour = moment().format('h');
     
    //set times for testing after hours
    if (test) {
        now24hour =13;
        now12hour = 1;
    }
    
    var $nowDate = $('#navbar-subtitle');  //add date to Heading under title
    $nowDate.text(now);

    //from localStorage, get stored objects,parse JSON string object
    var storedPlan = JSON.parse(localStorage.getItem("storedPlans"));

    if (test) { console.log(storedPlan); }

    //update array if calendar plan was found in localStorage
    if (storedPlan !==null) {
        planArray = storedPlan;
    } else {
        //happens once, the first time the browser loads,at the 4th array spot keep this open for lunch break everyday 
        planArray = new Array(9);
        planArray[4] = "Lunch time!";
    }
    if (test) { console.log("full plan array",planArray); }

    //formPlanner div, set variable plannerDiv references element
    var $plannerDiv = $('#weekly-schedule');
    //clears existing elements
    $plannerDiv.empty();

    if (test) { console.log("today's time", now12hour); }

    //make rows for calendar during normal work hours 9am to 5pm
    for (var hour = 9; hour <= 17; hour++) {
        //array index, offset from hour
        var index = hour - 9;

        //make row elements 
        var $rowDiv = $('<div>');
        $rowDiv.addClass('row');
        $rowDiv.addClass('calendarRow');
        $rowDiv.attr('hourIndex', hour);

        //make time part of row
        var $col2TimeDiv = $('<div>');
        $col2TimeDiv.addClass('col-md-2');

        //make timeBox span element where actual time block is placed
        const $timeBoxSpan = $('<span>');
        //gets value
        $timeBoxSpan.attr('class', 'timeBox');

        //displays time in the am/pm format
        var displayTime = 0;
        var ampm = "";
        if (hour > 12) {
            displayTime = hour -12;
            ampm = "pm";
        } else {
            displayTime = hour;
            ampm = "am";
        }

        //put time in the timeBox 
        $timeBoxSpan.text(`${displayTime} ${ampm}`);

        //append rowDiv, append into timeBox
        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpan);
        //end of making timeBox part of the row

        //make input parts of the row
        var $dailyPlanSpan = $('<input>');

        $dailyPlanSpan.attr('id', `input-${index}`);
        $dailyPlanSpan.attr('hourIndex',index);
        $dailyPlanSpan.attr('type', 'text');
        $dailyPlanSpan.attr('class', 'dailyPlan');

        //get index from plan array for given hour
        $dailyPlanSpan.val( planArray[index] );

        //make column for width input
        var $col9WidthDiv = $('<div>');
        $col9WidthDiv.addClass('col-md-9');

        //add column width and row features to the row
        $rowDiv.append($col9WidthDiv);
        $col9WidthDiv.append($dailyPlanSpan);
        //done making timeBox part of the row

        //make save part of the row
        var $colSaveDiv = $('<div>');
        $colSaveDiv.addClass('col-md-1');

        var $saveBtn = $('<i>');
        $saveBtn.attr('id', `saveid-${index}`);
        $saveBtn.attr('save-id',index);
        $saveBtn.attr('class',"far fa-save saveIcon");

        //add column width and row features row
        $rowDiv.append($colSaveDiv);
        $colSaveDiv.append($saveBtn);
        //done with save part of row

        //sets row color depending on current time of day
        setRowColor($rowDiv, hour);

        //adds row to the planner container
        $plannerDiv.append($rowDiv);
    };


    //function that sets row colors based on current,past, future schedule time or working day
    function setRowColor ($hourRow,hour) {

        if (test) { console.log("rowColor ",now24hour, hour); }

        if ( hour < now24hour) {
            //row color features
            if (test) {console.log("before"); }
            $hourRow.css("background-color", "#d3d3d3")
        } else if ( hour > now24hour) {
            if (test) { console.log("after"); }
            $hourRow.css("background-color","#77dd77")
        } else {
          if (test) {console.log("current"); }
          $hourRow.css("background-color","#ff6961")
        }
    };

    //uses onclick function to listen for clicks in row, saving in localStorage
    $(document).on('click','i', function(event) {
        event.preventDefault();
      
        if (test) {console.log('click before '+ planArray); }

        var $index = $(this).attr('save-id');

        var inputId = '#input-'+$index;
        var $value = $(inputId).val();

        planArray[$index] = $value;

        if (test) { console.log('value ', $value); }
        if (test) { console.log('index', $index); }
        if (test) { console.log('click afer '+ planArray); }

        //remove shadowPulse class, strinify JSON
        $(`#saveid-${$index}`).removeClass('shadowPulse');
        localStorage.setItem("storedPlans", JSON.stringify(planArray));
    });

    //save button changes with input
    $(document).on('change', 'input', function(event) {
        event.preventDefault();
        if (test) { console.log('onChange'); }
        if (test) { console.log('id', $(this).attr('hourIndex')); }

        //checks for save button
        var i = $(this).attr('hourIndex');

        //add shadowPulse class, working on feature
        $(`saveid-${i}`).addClass('shadowPulse');
    });
    });

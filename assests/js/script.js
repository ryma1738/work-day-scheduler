var currentDate = moment().format("ddd, MMM/DD/YYYY");
var interval = null;
var tasks = null;

function saveButtonClicked(event) {
    //add logic for finding out what save button was clicked.
    targetEl = $(this).attr("value");
    var text = $("#" + targetEl + "-task").val();
    console.log(text)
}

function saveTask() {
    //checks to see if the input element has text, if so save the task to localStorage
}

function currentTime() {
    //Checks for the current time every 15mins then every minute when the time till next hour is < 15mins away
    var timeNow = moment().format("H:m");
    timeNow = timeNow.split(":");
    hourNow = parseInt(timeNow[0]);;
    minuteNow = parseInt(timeNow[1]);
    console.log(hourNow, minuteNow)
    if (hourNow < 7) {
        $(".task-box").each(function() {
            $(this).removeClass("task-box-past bg-danger bg-success").addClass("bg-success");
        });
    }
    else if (hourNow > 19) {
        $(".task-box").each(function() {
            $(this).removeClass("task-box-past bg-danger bg-success").addClass("task-box-past");
        });
    }
    else {
        var i = 7;
        $(".task-box").each(function() {
            if (hourNow > i) {
                $(this).removeClass("task-box-past bg-danger bg-success").addClass("task-box-past");
            }
            else if (hourNow < i) {
                $(this).removeClass("task-box-past bg-danger bg-success").addClass("bg-success");
            }
            else if (hourNow === i) {
                $(this).removeClass("task-box-past bg-danger bg-success").addClass("bg-danger");
            }
            else {
                console.log("ERROR")
            }
            i++;
        });
    }

    if (minuteNow > 44) {
        interval = setInterval(currentTime, 90000);
    }
    else if (minuteNow < 44) {
        interval = setInterval(currentTime, 900000);
    }
    currentDate = moment().format("ddd, MMM/DD/YYYY");
    $("#currentDay").text("Todays date is: " + currentDate);
}

function loadTasks() {
    //Loads the tasks on startup
}


//event listeners and inital functions
loadTasks();
currentTime();
$(".save-button").on("click", saveButtonClicked);
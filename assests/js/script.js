var currentDate = moment().format("ddd, MMM/DD/YYYY");
var interval = null;
var tasks = null;

function currentTime() {
    //Checks for the current time every 15mins then every 2 minutes when it is 15mins to the next hour, 
    //and it updates the backgrounds on the task boxes
    var timeNow = moment().format("H:m");
    timeNow = timeNow.split(":");
    hourNow = parseInt(timeNow[0]);;
    minuteNow = parseInt(timeNow[1]);

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

function saveButtonClicked(event) {
    //add logic for finding out what save button was clicked then adding the inputs to LocalStorage
    var time = $(this).attr("value");
    var text = $("#" + time + "-task").val();
    if (tasks) {
        var alreadyThere = false;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].time === time) {
                alreadyThere = true;
                tasks[i].text = text;
            }
        }
        if (!alreadyThere) {
            var task = {text: text, time: time};
                tasks.push(task);
                console.log(tasks)
        }
        saveTask();
    }
    else {
        tasks = [
            {
                text: text,
                time: time
            }
        ];
        console.log(tasks)
        saveTask();
    }
    alert("Task Saved!");
}

function saveTask() {
    //Saves tasks to localStorage
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
}

function loadTasks() {
    //Loads the tasks on startup
    tasks = localStorage.getItem("dailyTasks");
    if (tasks) { 
        tasks = JSON.parse(tasks);
        for (var i =0; i < tasks.length; i++) {
            var time = tasks[i].time;
            var task  = tasks[i].text;
            console.log("#" + time + "-task")
            console.log(task)
            $("#" + time + "-task").val(task);
        }
    }
    else {
        tasks = null;
    }
    console.log(tasks)
}


//event listeners and inital functions
loadTasks();
currentTime();
$(".save-button").on("click", saveButtonClicked);
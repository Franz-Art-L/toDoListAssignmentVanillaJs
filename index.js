// displaya all the task that are listed
$(document).ready(function() {
   
    $.ajax({
        type: "GET",
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=293',
        dataType: "json",
        success: function(response, textStatus) {
           /*  console.log(response);
            // the response is already a parsed json data type. */
            response.tasks.forEach(task => {
                $("#toDoList").append("<p>" + task.content + "</p>");
            });
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
});

// the date on display
var dt = new Date();
  document.getElementById("date").innerHTML = dt.toLocaleDateString();

//  POST, through creating a new task
var newTask = () => {
 $.ajax({
        type: "POST",
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=293',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            task: {
                content: $("#newRequest").val(),
            }
        }),

        success: function(response, textStatus) {
            console.log(response);
            // the response is already a parsed json data type.
           
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

//To link the function to the HTML,
// When a user clicks the button, a submit event is fired on the form element.
$('#addTask').on("submit", event => {
    event.preventDefault();
    newTask();
});

// PUT
/* $.ajax({
    type: "POST",
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=293',
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
        task: {
            content: $("#newRequest").val(); 
        }
    }),

    success: function(response, textStatus) {
        console.log(response);
        // the response is already a parsed json data type.
       
    },
    error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
    }
}); */

// DELETE
 
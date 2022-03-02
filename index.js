// the current date on display
var dt = new Date();

document.getElementById("date").innerHTML = dt.toLocaleDateString();

$(document).ready(() => {

    var getAndShowLatestTasks = () => {
        $.ajax({
            type: "GET",
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=293',
            dataType: "json",
            success: function (response, textStatus) {
                console.log(response);
                // the response is already a parsed json data type. */
                $('#toDoList').empty();
                response.tasks.forEach(task => {
                    $('#toDoList').append('<li class="li-text"><p id="listItem" class="col-xs-8">' + task.content + '<button id="taskButton" class="btn btn-danger d-inline float-right" data-id="' + task.id + '">REMOVE</button><input type="checkbox" class="mark-complete float-right" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + "<br>");
                });
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

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

            success: function (response, textStatus) {
                $('#newRequest').val('');
                getAndShowLatestTasks();

            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $('#addTask').on("submit", event => {
        event.preventDefault();
        newTask();
    });

    // Removing a task through DELETE request
    var removeTask = id => {
        $.ajax({
            type: 'DELETE',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=293',
            success: function (response, textStatus) {
                getAndShowLatestTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });

    }

    $(document).on('click', '.delete', function () {
        removeTask($(this).data('id'))
    });

    var taskComplete = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=293',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndShowLatestTasks()
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }

      var taskActive = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=293',
          dataType: 'json',
          success: function (response, textStatus) {
        getAndShowLatestTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }
    
      $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
           taskComplete($(this).data('id'));
         } else {
            taskActive($(this).data('id'));
         }
       });
    

    getAndShowLatestTasks();

});

// Some random colors
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});
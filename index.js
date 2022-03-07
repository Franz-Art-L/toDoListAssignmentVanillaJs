// the current date on display
var dt = new Date();

document.getElementById("date").innerHTML = dt.toLocaleDateString();

// the main program
$(document).ready(() => {

    var getAndShowLatestTasks = () => {
        $.ajax({
            type: "GET",
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=293',
            dataType: "json",
            success: function(response, textStatus) {
                console.log(response);
                // the response is already a parsed json data type. */
                $('#toDoList').empty();

                var returnActiveTasks = response.tasks.filter(task => {
                    if (!task.completed) {
                        return task.id;
                    }
                });

                var returnCompletedTasks = response.tasks.filter(task => {
                    if (task.completed) {
                        return task.id;
                    }
                });

                var filter = $('.active').attr('id');

                if (filter === 'all' || filter === '') {
                    taskItems = response.tasks;
                };

                if (filter === 'active') {
                    taskItems = returnActiveTasks;
                };

                if (filter === 'completed') {
                    taskItems = returnCompletedTasks;
                }

                var sortedTaskItems = taskItems.sort(function(a, b) {
                    return Date.parse(a.created_at) - Date.parse(b.created_at);
                });

                sortedTaskItems.forEach(task => {
                    $('#toDoList').append('<div id="taskList" class="d-flex col-12 justify-content-between">' + '<input class="p-2 mark-complete"type="checkbox"  title="Check the box if task is done" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + '<div class="mr-auto p-2" id="li-text">' + task.content + '</div>' + '<button id="taskButton" title="click to remove task" class="px-2 delete" data-id="' + task.id + '">' + '<i class="far fa-trash-alt"></i>' + '</i>' + '</button>' + '</div>' + '</br>');


                });
                $('.to-do-amount span').text(returnActiveTasks.length);
            },
            error: function(request, textStatus, errorMessage) {
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

            success: function(response, textStatus) {
                $('#newRequest').val('');
                getAndShowLatestTasks();

            },
            error: function(request, textStatus, errorMessage) {
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
            success: function(response, textStatus) {
                getAndShowLatestTasks();
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });

    }

    $(document).on('click', '.delete', function() {
        removeTask($(this).data('id'))
    });

    var taskComplete = function(id) {
        $.ajax({
            type: 'PUT',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=293',
            dataType: 'json',
            success: function(response, textStatus) {
                getAndShowLatestTasks()
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    var taskActive = function(id) {
        $.ajax({
            type: 'PUT',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=293',
            dataType: 'json',
            success: function(response, textStatus) {
                getAndShowLatestTasks();
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $(document).on('change', '.mark-complete', function() {
        if (this.checked) {
            taskComplete($(this).data('id'));
        } else {
            taskActive($(this).data('id'));
        }
    });

    //  filter the buttons on the bottom
    $('.to-do-filter button').on('click', function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        getAndShowLatestTasks();
    });


    getAndShowLatestTasks();

});

var inputKeydown = document.querySelector('input');

var timer

var backgroundCelebration = () => {
    var body = document.querySelector('body');
    var colors = ['red', 'yellow', 'green', 'blue', 'violet', 'pink', 'grey', 'black'];
    var count = 0;
    timer = window.setInterval(() => {
        var newColor = colors[++count % colors.length];
        body.style.backgroundColor = newColor;
    }, 3000);
};

inputKeydown.addEventListener('click', backgroundCelebration);
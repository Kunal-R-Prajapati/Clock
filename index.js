var Sminutes = 0, Sseconds = 0; //Smilliseconds = 0;
var interval = null;
var Tminutes = 0 , Tseconds = 0;
var timer_interval = null;
//Main function to start sti=opwatch and timer
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#timer').style.display = 'flex';
    
    document.querySelector('#stop-time').innerHTML = ` ${Sminutes} : ${Sseconds}`;
    document.querySelector('#timer-time').innerHTML = ` ${Tminutes} : ${Tseconds} Left `;
    document.getElementById("btn").querySelectorAll('button').forEach(button => {
        button.onclick = function () {
            showpage(this.dataset.page);
        }
    })
    document.getElementById("stop-controls").querySelectorAll('button').forEach(button => {
        button.onclick = function () {
            action(this.dataset.action);
        }
    })
    document.getElementById("timer-controls").querySelectorAll('button').forEach(button => {
        button.onclick = function () {
            timer_action(this.dataset.action);
        }
    })

})
function showpage(page) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    })
    document.querySelector(`#${page}`).style.display = 'flex';
}
function time() {
    var currentdate = new Date();
    var date = ` Date: ` + currentdate.getDay() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear();
    var hours = currentdate.getHours();
    var minutes = currentdate.getMinutes();
    var seconds = currentdate.getSeconds();
    var ampm = (hours > 12 ? "PM" : "AM");
    hours = (hours > 12 ? hours - 12 : hours);
    minutes = minutes;
    seconds = seconds;
    document.querySelector('.date').innerHTML = date;
    document.querySelector('#time').innerHTML = ` ${hours} : ${minutes} : ${seconds}  ${ampm}`;
}

setInterval(time, 1000);
// Stop watch functions

function action(act) {
    if (act == "Start") {
        if ( interval == null)
            interval = setInterval(start_watch,1000);
    }
    else if( act == "Stop")
        stop_watch();
    else
        reset_watch();
    
}
function start_watch() {
    // Smilliseconds += 1;
    // if (Smilliseconds == 100) {
    //     Sseconds++;
    //     Smilliseconds = 0;
    // }
    Sseconds++;
    if (Sseconds == 60) {
        Sminutes++;
        Sseconds = 0;
    }
    document.querySelector('#stop-time').innerHTML = ` ${Sminutes} : ${Sseconds}`;
}

function stop_watch() {
    clearInterval(interval);
    interval = null;
}

function reset_watch() {
    clearInterval(interval);
    Sminutes = 0;
    Sseconds = 0;
    Smilliseconds = 0;
    document.querySelector('#stop-time').innerHTML = ` ${Sminutes} : ${Sseconds}`;
    interval = null;   
}

// Timer functions
function timer_action(act) {
    document.querySelector('#timer-time').innerHTML = `${Tminutes} : ${Tseconds} Left`;
    Tminutes = (document.getElementById('Tminutes').value );
    Tseconds = (document.getElementById('Tseconds').value);
    if (act == "Start"){
        document.querySelectorAll('.Timer-input').forEach(input =>  {
            input.disabled = true;
        })
        if ( Tminutes == NaN && Tseconds == NaN)
        {
            alert("Enter the time inetval properly");
        }
        else{
            timer_interval = setInterval(start_timer,1000);
        }
    }
    else {
        stop_timer("Timer stopped by the user !");
    }
}

function start_timer() {
    Tseconds--;
    if (Tseconds <= 0 && Tminutes > 0) {
        Tminutes --;
        Tseconds = 59;
    }
    if (Tminutes == 0 && Tseconds <= 0) {
        stop_timer("Time is Over ! ");
    }
    
    document.querySelector('#timer-time').innerHTML = `${Tminutes} : ${Tseconds} Left`;
    
}
function stop_timer(message){
    document.querySelectorAll('.Timer-input').forEach(input =>  {
        input.disabled = false;
    })
    Tminutes=0;
    Tseconds=0;
    clearInterval(timer_interval);
    document.querySelector('#timer-time').innerHTML = `${Tminutes} : ${Tseconds} Left`;
    alert(message);
}
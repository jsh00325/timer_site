const body = document.querySelector('body');

const navbar = document.querySelector('.navbar');

const reports = document.querySelectorAll('#reportBtn');
const settings = document.querySelectorAll('#settingBtn');

const timer_html = document.querySelector('.timer__clock');
const playBtn = document.querySelector('.timer__button__play');
const pauseBtn = document.querySelector('.timer__button__pause');

const setting_window = document.querySelector('.setting');

const work_input = document.querySelector('#setting__time__work');
const relax_input = document.querySelector('#setting__time__relax');

const sound_type = document.querySelector('#setting__sound__type');
const sound_volume = document.querySelector('#setting__sound__volume');
const soundBtn = document.querySelector('#setting__sound__button');

const closeBtn = document.querySelector('.setting__close');

const work_head_color = "#C65146", relax_head_color = "#379392";
const work_body_color = "#EC6A5C", relax_body_color = "#519D9E";
const work_hover_color = "#AF4034", relax_hover_color = "#548687";

const alarm = [new Audio('sound/alarm1.mp3'), new Audio('sound/alarm2.mp3')];

var work_time = 1500, relax_time = 300;
var isWork = true, time, timer, target_time = work_time;

init_var();

playBtn.addEventListener('click', () => {
    start_timer(timer_html);
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
});
pauseBtn.addEventListener('click', () => {
    stop_timer();
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";
});
reports.forEach((report) => {
    report.addEventListener('click', () => {
        view_report();
    });
});
settings.forEach((setting) => {
    setting.addEventListener('click', () => {
        setting_window.classList.toggle('active');
    });
});
closeBtn.addEventListener('click', () => {
    setting_window.classList.toggle('active');
});
soundBtn.addEventListener('click', () => {
    alarm[sound_type.value].volume = sound_volume.value / 100;
    alarm[sound_type.value].play();
});
work_input.addEventListener('input', () => {
    work_time = parseInt(work_input.value) * 60;
    if (isWork) target_time = work_time;
    timer_html.innerHTML = get_time_string(time);
});
relax_input.addEventListener('input', () => {
    relax_time = parseInt(relax_input.value) * 60;
    if (!isWork) target_time = relax_time;
    timer_html.innerHTML = get_time_string(time);
});


/**
 * ????????? ?????? ?????? ????????? ??? ????????? ?????? ??????
 */
function init_var() {
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";

    time = 0;
    target_time = isWork ? work_time : relax_time;
    timer_html.innerHTML = get_time_string(time);

    document.documentElement.style.setProperty("--head-color", 
        isWork ? work_head_color : relax_head_color);
    document.documentElement.style.setProperty("--body-color", 
        isWork ? work_body_color : relax_body_color);
    document.documentElement.style.setProperty("--hover-color", 
        isWork ? work_hover_color : relax_hover_color);
}

/**
 * timer ??????
 * @param {integer} time ????????? ????????? ?????? ??????
 * @param {object} obj ???????????? ????????? ????????? ??????
 */
function start_timer(obj) {
    timer = setInterval(function() {
        time++;

        if (time >= target_time) time_end();

        obj.innerHTML = get_time_string(time);
    }, 1000);
}
/**
 * timer ????????????
 */
function stop_timer() {
    clearInterval(timer);
}

/**
 * ??? ????????? ????????? 00:00 ????????? ??????
 * @param {integer} time ???????????? ?????? ?????? 
 */
function get_time_string(time) {
    var cur = target_time - time;
    if (cur < 0) cur = 0;

    var minute = Math.floor(cur / 60);
    var second = cur % 60;

    var rslt = "";
    if (minute < 10) rslt += "0";
    rslt += minute;

    rslt += ":";

    if (second < 10) rslt += "0";
    rslt += second;

    return rslt;    
}

/**
 * ???????????? ??? ?????? ??? ?????? ????????? ???????????? ??????
 */
function time_end() {
    stop_timer();

    alarm[sound_type.value].volume = sound_volume.value / 100;
    alarm[sound_type.value].play();
    
    isWork = !isWork;
    init_var();
}

/**
 * ???????????? ????????? ????????????
 * @todo ?????? ???????????? ???????????? ????????? ??? ?????????...?
 */
function view_report() {
    alert('??????????????????...!');
}
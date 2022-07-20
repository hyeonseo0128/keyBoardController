/**
 * Created by Wonseok, Jung in KETI on 2022-01-26.
 */

let mqtt = require('mqtt');
let keypress = require('keypress');

let keyboard = '';

let TIMEOUT = 40;
let KEY_PRESS_TIMEOUT = 1000;

let MIN = 999;  // 25;  // 19
let TRIM = 1501;  // 125;  // 7d
let MAX = 2013;  // 225;  // e1

let FLIGHT_MODES = [0, 1231, 1361, 1491, 1621, 1750];
let ch_gap = 20;

let RC_RATE = 0.64;
let SBUS_RATE = 1.6;

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
function keyboard_input() {
    process.stdin.on('keypress', function (ch, key) {
        // console.log('got "keypress"', key);
        try {
            keyboard = key.name;
            if (key.name === 'q') {
                process.exit();
            }
        } catch (e) {
            console.log('The key is not allowed. Please enter another key.');
        }
    })
}

keyboard_input();

process.stdin.setRawMode(true);
process.stdin.resume();

setInterval(channel_val, TIMEOUT);

setInterval(key_to_signal, TIMEOUT);

function key_to_signal() {
    if ((keyboard === 'left') || (keyboard === 'right') || (keyboard === 'up') || (keyboard === 'down') || (keyboard === 'w') || (keyboard === 's') || (keyboard === 'd') || (keyboard === 'a') || (keyboard === 'z') || (keyboard === 'x') || (keyboard === 'c') || (keyboard === 'v') || (keyboard === 'b') || (keyboard === 'n') || (keyboard === 'm') || (keyboard === 'e') || (keyboard === 'r') || (keyboard === 'y') || (keyboard === 'o') || (keyboard === 'p') || (keyboard === 'f') || (keyboard === 'g') || (keyboard === 'h') || (keyboard === 't') || (keyboard === 'j') || (keyboard === 'k') || (keyboard === 'l') || (keyboard === 'i')) {
        if ((keyboard === 'a') || (keyboard === 'd')) { // Yaw
            ch4_key();
        } else if ((keyboard === 'w') || (keyboard === 's')) {// Throttle
            ch3_key();
        } else if ((keyboard === 'f') || (keyboard === 'h')) {// Roll
            ch1_key();
        } else if ((keyboard === 't') || (keyboard === 'g')) { // Pitch
            ch2_key();
        } else if ((keyboard === 'j') || (keyboard === 'l')) { // Zoom
            ch19_key();
        } else if ((keyboard === 'up') || (keyboard === 'down')) { // Tilt
            ch18_key();
        } else if ((keyboard === 'left') || (keyboard === 'right')) { // Pan
            ch17_key();
        } else if ((keyboard === 'z')) {
            ch5_key(); // Flight Modes
        } else if ((keyboard === 'x')) {
            ch6_key();  // Arm or Disarm
        } else if ((keyboard === 'c')) {
            ch7_key();  // LED
        } else if ((keyboard === 'v')) {
            ch8_key(); // Landing Gear
        } else if ((keyboard === 'b')) {
            ch9_key();
        } else if ((keyboard === 'n')) {
            ch10_key();
        } else if ((keyboard === 'm')) {
            ch20_key();  // Gimbal Mode
        } else if ((keyboard === 'e')) {
            ch21_key();  // Capture
        } else if ((keyboard === 'r')) {
            ch22_key();  // Change Display
        } else if ((keyboard === 'y')) {
            ch23_key();  // Tracking
        } else if ((keyboard === 'o')) {
            ch24_key();  // Power ON/OFF
        } else if ((keyboard === 'p')) {
            ch25_key();  //
        }
    } else {
        ch1 = TRIM;
        ch2 = TRIM;
        ch3 = TRIM;
        ch4 = TRIM;

        ch17 = TRIM;
        ch18 = TRIM;
        ch19 = TRIM;

    }
}

function ch1_key() {
    if ((parseInt(ch1) > parseInt(MIN + ch_gap)) && (parseInt(ch1) < parseInt(MAX - ch_gap))) {
        if (keyboard === 'f') {
            ch1 = parseInt(ch1) - ch_gap;
        } else if (keyboard === 'h') {
            ch1 = parseInt(ch1) + ch_gap;
        }
    } else {
        if (parseInt(ch1) <= parseInt(MIN + ch_gap)) {
            if (keyboard === 'h') {
                ch1 = parseInt(ch1) + ch_gap;
            }
        } else if (parseInt(ch1) >= parseInt(MAX - ch_gap)) {
            if (keyboard === 'f') {
                ch1 = parseInt(ch1) - ch_gap;
            }
        }
    }
    keyboard = '';
}

function ch2_key() {
    if ((parseInt(ch2) > parseInt(MIN + ch_gap)) && (parseInt(ch2) < parseInt(MAX - ch_gap))) {
        if (keyboard === 't') {
            ch2 = parseInt(ch2) - ch_gap;
        } else if (keyboard === 'g') {
            ch2 = parseInt(ch2) + ch_gap;
        }
    } else {
        if (parseInt(ch2) <= parseInt(MIN + ch_gap)) {
            if (keyboard === 'g') {
                ch2 = parseInt(ch2) + ch_gap;
            }
        } else if (parseInt(ch2) >= parseInt(MAX - ch_gap)) {
            if (keyboard === 't') {
                ch2 = parseInt(ch2) - ch_gap;
            }
        }
    }
    keyboard = '';
}

function ch3_key() {
    if ((parseInt(ch3) > parseInt(MIN + ch_gap)) && (parseInt(ch3) < parseInt(MAX - ch_gap))) {
        if (keyboard === 's') {
            ch3 = parseInt(ch3) - ch_gap;
        } else if (keyboard === 'w') {
            ch3 = parseInt(ch3) + ch_gap;
        }
    } else {
        if (parseInt(ch3) <= parseInt(MIN)) {
            if (keyboard === 'w') {
                ch3 = parseInt(ch3) + ch_gap;
            }
        } else if (parseInt(ch3) >= parseInt(MAX - ch_gap)) {
            if (keyboard === 's') {
                ch3 = parseInt(ch3) - ch_gap;
            }
        }
    }
    keyboard = '';
}

function ch4_key() {
    if ((parseInt(ch4) > parseInt(MIN + ch_gap)) && (parseInt(ch4) < parseInt(MAX - ch_gap))) {
        if (keyboard === 'a') {
            ch4 = parseInt(ch4) - ch_gap;
        } else if (keyboard === 'd') {
            ch4 = parseInt(ch4) + ch_gap;
        }
    } else {
        if (parseInt(ch4) <= parseInt(MIN + ch_gap)) {
            if (keyboard === 'd') {
                ch4 = parseInt(ch4) + ch_gap;
            }
        } else if (parseInt(ch4) >= parseInt(MAX - ch_gap)) {
            if (keyboard === 'a') {
                ch4 = parseInt(ch4) - ch_gap;
            }
        }
    }
    keyboard = '';
}


// Flight Modes
function ch5_key() {
    if ((parseInt(ch5) >= parseInt(MIN)) && (parseInt(ch5) <= parseInt(MAX))) {
        if (keyboard === 'z') {
            ch5_count++;
            setTimeout(function () {
                if (ch5_count === 1) {
                    ch5 = MIN;
                } else if (ch5_count === 2) {
                    ch5 = parseInt(FLIGHT_MODES[ch5_count - 1]) + 50;
                } else if (ch5_count === 3) {
                    ch5 = parseInt(FLIGHT_MODES[ch5_count - 1]) + 50;
                } else if (ch5_count === 4) {
                    ch5 = parseInt(FLIGHT_MODES[ch5_count - 1]) + 50;
                } else if (ch5_count === 5) {
                    ch5 = parseInt(FLIGHT_MODES[ch5_count - 1]) + 50;
                } else if (ch5_count === 6) {
                    ch5 = MAX;
                } else {

                }
                ch5_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}


function ch6_key() {
    if ((parseInt(ch6) >= parseInt(MIN)) && (parseInt(ch6) <= parseInt(MAX))) {
        if (keyboard === 'x') {
            ch6_count++;
            setTimeout(function () {
                if (ch6_count === 1) {
                    ch6 = MIN;
                } else if (ch6_count === 2) {
                    ch6 = MAX;
                } else {
                }
                ch6_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}


function ch7_key() {
    if ((parseInt(ch7) >= parseInt(MIN)) && (parseInt(ch7) <= parseInt(MAX))) {
        if (keyboard === 'c') {
            ch7_count++;
            setTimeout(function () {
                if (ch7_count === 1) {
                    ch7 = MIN;
                } else if (ch7_count === 2) {
                    ch7 = TRIM;
                } else if (ch7_count === 3) {
                    ch7 = MAX;
                } else {
                }
                ch7_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}


function ch8_key() {
    if ((parseInt(ch8) >= parseInt(MIN)) && (parseInt(ch8) <= parseInt(MAX))) {
        if (keyboard === 'v') {
            ch8_count++;
            setTimeout(function () {
                if (ch8_count === 1) {
                    ch8 = MIN;
                } else if (ch8_count === 2) {
                    ch8 = TRIM;
                } else if (ch8_count === 3) {
                    ch8 = MAX;
                } else {
                }
                ch8_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}


function ch9_key() {
    if ((parseInt(ch9) >= parseInt(MIN)) && (parseInt(ch9) <= parseInt(MAX))) {
        if (keyboard === 'b') {
            ch9_count++;
            setTimeout(function () {
                if (ch9_count === 1) {
                    ch9 = MIN;
                } else if (ch9_count === 2) {
                    ch9 = TRIM;
                } else if (ch9_count === 3) {
                    ch9 = MAX;
                } else {
                }
                ch9_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}

function ch10_key() {
    if ((parseInt(ch11) >= parseInt(MIN)) && (parseInt(ch11) <= parseInt(MAX))) {
        if (keyboard === 'n') {
            ch11_count++;
            setTimeout(function () {
                if (ch11_count === 1) {
                    ch11 = MIN;
                } else if (ch11_count === 2) {
                    ch11 = TRIM;
                } else if (ch11_count === 3) {
                    ch11 = MAX;
                } else {
                }
                ch11_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}


function ch17_key() {
    if ((parseInt(ch17) > parseInt(MIN + ch_gap)) && (parseInt(ch17) < parseInt(MAX - ch_gap))) {
        if (keyboard === 'left') {
            ch17 = parseInt(ch17) - ch_gap;
        } else if (keyboard === 'right') {
            ch17 = parseInt(ch17) + ch_gap;
        }
    } else {
        if (parseInt(ch17) <= parseInt(MIN + ch_gap)) {
            if (keyboard === 'right') {
                ch17 = parseInt(ch17) + ch_gap;
            }
        } else if (parseInt(ch17) >= parseInt(MAX - ch_gap)) {
            if (keyboard === 'left') {
                ch17 = parseInt(ch17) - ch_gap;
            }
        }
    }
    keyboard = '';
}

function ch18_key() {
    if ((parseInt(ch18) > parseInt(MIN + ch_gap)) && (parseInt(ch18) < parseInt(MAX - ch_gap))) {
        if (keyboard === 'down') {
            ch18 = parseInt(ch18) - ch_gap;
        } else if (keyboard === 'up') {
            ch18 = parseInt(ch18) + ch_gap;
        }
    } else {
        if (parseInt(ch18) <= parseInt(MIN + ch_gap)) {
            if (keyboard === 'up') {
                ch18 = parseInt(ch18) + ch_gap;
            }
        } else if (parseInt(ch18) >= parseInt(MAX - ch_gap)) {
            if (keyboard === 'down') {
                ch18 = parseInt(ch18) - ch_gap;
            }
        }
    }
    keyboard = '';
}

function ch19_key() {
    if ((parseInt(ch19) > parseInt(MIN + ch_gap)) && (parseInt(ch19) < parseInt(MAX - ch_gap))) {
        if (keyboard === 'j') {
            ch19 = parseInt(ch19) - ch_gap;
        } else if (keyboard === 'l') {
            ch19 = parseInt(ch19) + ch_gap;
        }
    } else {
        if (parseInt(ch19) <= parseInt(MIN + ch_gap)) {
            if (keyboard === 'l') {
                ch19 = parseInt(ch19) + ch_gap;
            }
        } else if (parseInt(ch19) >= parseInt(MAX - ch_gap)) {
            if (keyboard === 'j') {
                ch19 = parseInt(ch19) - ch_gap;
            }
        }
    }
    keyboard = '';
}

function ch20_key() {
    if ((parseInt(ch20) >= parseInt(MIN)) && (parseInt(ch20) <= parseInt(MAX))) {
        if (keyboard === 'm') {
            ch20_count++;
            setTimeout(function () {
                if (ch20_count === 1) {
                    ch20 = TRIM;
                } else if (ch20_count === 2) {
                    ch20 = MIN;
                } else if (ch20_count === 3) {
                    ch20 = MAX;
                } else {
                }
                ch20_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}

function ch21_key() {
    if ((parseInt(ch21) >= parseInt(MIN)) && (parseInt(ch21) <= parseInt(MAX))) {
        if (keyboard === 'e') {
            ch21_count++;
            setTimeout(function () {
                if (ch21_count === 1) {
                    ch21 = TRIM;
                } else if (ch21_count === 2) {
                    ch21 = MIN;
                } else if (ch21_count === 3) {
                    ch21 = MAX;
                } else {
                }
                ch21_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}

function ch22_key() {
    if ((parseInt(ch22) >= parseInt(MIN)) && (parseInt(ch22) <= parseInt(MAX))) {
        if (keyboard === 'r') {
            ch22_count++;
            setTimeout(function () {
                if (ch22_count === 1) {
                    ch22 = TRIM;
                } else if (ch22_count === 2) {
                    ch22 = MIN;
                } else if (ch22_count === 3) {
                    ch22 = MAX;
                } else {
                }
                ch22_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}

function ch23_key() {
    if ((parseInt(ch23) >= parseInt(MIN)) && (parseInt(ch23) <= parseInt(MAX))) {
        if (keyboard === 'y') {
            ch23_count++;
            setTimeout(function () {
                if (ch23_count === 1) {
                    ch23 = TRIM;
                } else if (ch23_count === 2) {
                    ch23 = MIN;
                } else if (ch23_count === 3) {
                    ch23 = MAX;
                } else {
                }
                ch23_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}

function ch24_key() {
    if ((parseInt(ch24) >= parseInt(MIN)) && (parseInt(ch24) <= parseInt(MAX))) {
        if (keyboard === 'o') {
            ch24_count++;
            setTimeout(function () {
                if (ch24_count === 1) {
                    ch24 = TRIM;
                } else if (ch24_count === 2) {
                    ch24 = MIN;
                } else if (ch24_count === 3) {
                    ch24 = MAX;
                } else {
                }
                ch24_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}

function ch25_key() {
    if ((parseInt(ch25) >= parseInt(MIN)) && (parseInt(ch25) <= parseInt(MAX))) {
        if (keyboard === 'p') {
            ch25_count++;
            setTimeout(function () {
                if (ch25_count === 1) {
                    ch25 = TRIM;
                } else if (ch25_count === 2) {
                    ch25 = MIN;
                } else if (ch25_count === 3) {
                    ch25 = MAX;
                } else {
                }
                ch25_count = 0;
            }, KEY_PRESS_TIMEOUT);
        }
    }
    keyboard = '';
}


function RC2SBUS(x) {
    return Math.round(((x - 1500) * SBUS_RATE + 1000) / 8);
}

function SBUS2RC(x) {
    return Math.round((x * 8 + 1 - 1000) * RC_RATE + 1500);
}

global.rxbuf = '';

global.ch1 = TRIM;
global.ch2 = TRIM;
global.ch3 = TRIM;
global.ch4 = TRIM;
global.ch5 = 1158;
global.ch6 = MIN;
global.ch7 = MIN;
global.ch8 = MIN;
global.ch9 = MIN;
global.ch10 = MIN;
global.ch11 = MIN;
global.ch12 = MIN;
global.ch13 = MIN;
global.ch14 = MIN;
global.ch15 = MIN;
global.ch16 = MIN;
global.ch17 = TRIM;
global.ch18 = TRIM;
global.ch19 = TRIM;
global.ch20 = TRIM;
global.ch21 = MIN;
global.ch22 = MIN;
global.ch23 = MIN;
global.ch24 = MIN;
global.ch25 = MIN;
global.ch26 = MIN;
global.ch27 = MIN;
global.ch28 = MIN;
global.ch29 = MIN;
global.ch30 = MIN;
global.ch31 = MIN;
global.ch32 = MIN;

global.ch1_target_val = TRIM;
global.ch2_target_val = TRIM;
global.ch3_target_val = TRIM;
global.ch4_target_val = TRIM;
global.ch5_target_val = 1158;
global.ch6_target_val = MIN;
global.ch7_target_val = MIN;
global.ch8_target_val = MIN;
global.ch9_target_val = MIN;
global.ch10_target_val = MIN;
global.ch11_target_val = MIN;
global.ch12_target_val = MIN;
global.ch13_target_val = MIN;
global.ch14_target_val = MIN;
global.ch15_target_val = MIN;
global.ch16_target_val = MIN;
global.ch17_target_val = TRIM;
global.ch18_target_val = TRIM;
global.ch19_target_val = TRIM;
global.ch20_target_val = TRIM;
global.ch21_target_val = MIN;
global.ch22_target_val = MIN;
global.ch23_target_val = MIN;
global.ch24_target_val = MIN;
global.ch25_target_val = MIN;
global.ch26_target_val = MIN;
global.ch27_target_val = MIN;
global.ch28_target_val = MIN;
global.ch29_target_val = MIN;
global.ch30_target_val = MIN;
global.ch31_target_val = MIN;
global.ch32_target_val = MIN;

global.ch5_count = parseInt(0);
global.ch6_count = parseInt(0);
global.ch7_count = parseInt(0);
global.ch8_count = parseInt(0);
global.ch9_count = parseInt(0);
global.ch11_count = parseInt(0);
global.ch20_count = parseInt(0);
global.ch21_count = parseInt(0);
global.ch22_count = parseInt(0);
global.ch23_count = parseInt(0);
global.ch24_count = parseInt(0);
global.ch25_count = parseInt(0);

function channel_val() {
    rxbuf = '';
    rxbuf += 'ff';

    // CH1 - Roll
    ch1_target_val = ch1;
    ch1_target_val = RC2SBUS(ch1_target_val);
    let hex_ch1 = ch1_target_val.toString(16);
    rxbuf += hex_ch1;

    // CH2 - Pitch
    ch2_target_val = ch2;
    ch2_target_val = RC2SBUS(ch2_target_val);
    let hex_ch2 = ch2_target_val.toString(16);
    rxbuf += hex_ch2;

    // CH3 - Throttle
    ch3_target_val = ch3;
    ch3_target_val = RC2SBUS(ch3_target_val);
    let hex_ch3 = ch3_target_val.toString(16);
    rxbuf += hex_ch3;

    // CH4 - Yaw
    ch4_target_val = ch4;
    ch4_target_val = RC2SBUS(ch4_target_val);
    let hex_ch4 = ch4_target_val.toString(16);
    rxbuf += hex_ch4;

    // Switch 1
    ch5_target_val = ch5;
    ch5_target_val = RC2SBUS(ch5_target_val);
    let hex_ch5 = ch5_target_val.toString(16);
    rxbuf += hex_ch5;

    // Switch 2
    ch6_target_val = ch6;
    ch6_target_val = RC2SBUS(ch6_target_val);
    // ch6 = 225;
    let hex_ch6 = ch6_target_val.toString(16);
    rxbuf += hex_ch6;

    // Switch 3
    ch7_target_val = ch7;
    ch7_target_val = RC2SBUS(ch7_target_val);
    let hex_ch7 = ch7_target_val.toString(16);
    rxbuf += hex_ch7;

    // Switch 4
    ch8_target_val = ch8;
    ch8_target_val = RC2SBUS(ch8_target_val);
    let hex_ch8 = ch8_target_val.toString(16);
    rxbuf += hex_ch8;

    // Switch 5
    ch9_target_val = ch9;
    ch9_target_val = RC2SBUS(ch9_target_val);
    let hex_ch9 = ch9_target_val.toString(16);
    rxbuf += hex_ch9;

    // Switch 6
    ch10_target_val = ch10;
    ch10_target_val = RC2SBUS(ch10_target_val);
    let hex_ch10 = ch10_target_val.toString(16);
    rxbuf += hex_ch10;

    // Switch 7
    ch11_target_val = ch11;
    ch11_target_val = RC2SBUS(ch11_target_val);
    let hex_ch11 = ch11_target_val.toString(16);
    rxbuf += hex_ch11;

    // Switch 8
    ch12_target_val = ch12;
    ch12_target_val = RC2SBUS(ch12_target_val);
    let hex_ch12 = ch12_target_val.toString(16);
    rxbuf += hex_ch12;

    // Switch 9
    ch13_target_val = ch13;
    ch13_target_val = RC2SBUS(ch13_target_val);
    let hex_ch13 = ch13_target_val.toString(16);
    rxbuf += hex_ch13;

    // Switch 10
    ch14_target_val = ch14;
    ch14_target_val = RC2SBUS(ch14_target_val);
    let hex_ch14 = ch14_target_val.toString(16);
    rxbuf += hex_ch14;

    // Switch 11
    ch15_target_val = ch15;
    ch15_target_val = RC2SBUS(ch15_target_val);
    let hex_ch15 = ch15_target_val.toString(16);
    rxbuf += hex_ch15;

    // Switch 12
    ch16_target_val_target_val = ch16;
    ch16_target_val_target_val = RC2SBUS(ch16_target_val_target_val);
    let hex_ch16 = ch16_target_val_target_val.toString(16);
    rxbuf += hex_ch16;

    // Switch 13
    ch17_target_val_target_val = ch17;
    ch17_target_val_target_val = RC2SBUS(ch17_target_val_target_val);
    let hex_ch17 = ch17_target_val_target_val.toString(16);
    rxbuf += hex_ch17;

    ch18_target_val_target_val = ch18;
    ch18_target_val_target_val = RC2SBUS(ch18_target_val_target_val);
    let hex_ch18 = ch18_target_val_target_val.toString(16);
    rxbuf += hex_ch18;

    ch19_target_val_target_val = ch19;
    ch19_target_val_target_val = RC2SBUS(ch19_target_val_target_val);
    let hex_ch19 = ch19_target_val_target_val.toString(16);
    rxbuf += hex_ch19;

    ch20_target_val_target_val = ch20;
    ch20_target_val_target_val = RC2SBUS(ch20_target_val_target_val);
    let hex_ch20 = ch20_target_val_target_val.toString(16);
    rxbuf += hex_ch20;

    ch21_target_val_target_val = ch21;
    ch21_target_val_target_val = RC2SBUS(ch21_target_val_target_val);
    let hex_ch21 = ch21_target_val_target_val.toString(16);
    rxbuf += hex_ch21;

    ch22_target_val_target_val = ch22;
    ch22_target_val_target_val = RC2SBUS(ch22_target_val_target_val);
    let hex_ch22 = ch22_target_val_target_val.toString(16);
    rxbuf += hex_ch22;

    ch23_target_val_target_val = ch23;
    ch23_target_val_target_val = RC2SBUS(ch23_target_val_target_val);
    let hex_ch23 = ch23_target_val_target_val.toString(16);
    rxbuf += hex_ch23;

    ch24_target_val = ch24;
    ch24_target_val = RC2SBUS(ch24_target_val);
    let hex_ch24 = ch24_target_val.toString(16);
    rxbuf += hex_ch24;

    ch25_target_val = ch25;
    ch25_target_val = RC2SBUS(ch25_target_val);
    let hex_ch25 = ch25_target_val.toString(16);
    rxbuf += hex_ch25;

    ch26_target_val = ch26;
    ch26_target_val = RC2SBUS(ch26_target_val);
    let hex_ch26 = ch26_target_val.toString(16);
    rxbuf += hex_ch26;

    ch27_target_val = ch27;
    ch27_target_val = RC2SBUS(ch27_target_val);
    let hex_ch27 = ch27_target_val.toString(16);
    rxbuf += hex_ch27;

    ch28_target_val = ch28;
    ch28_target_val = RC2SBUS(ch28_target_val);
    let hex_ch28 = ch28_target_val.toString(16);
    rxbuf += hex_ch28;

    ch29_target_val = ch29;
    ch29_target_val = RC2SBUS(ch29_target_val);
    let hex_ch29 = ch29_target_val.toString(16);
    rxbuf += hex_ch29;

    ch30_target_val = ch30;
    ch30_target_val = RC2SBUS(ch30_target_val);
    let hex_ch30 = ch30_target_val.toString(16);
    rxbuf += hex_ch30;

    ch31_target_val = ch31;
    ch31_target_val = RC2SBUS(ch31_target_val);
    let hex_ch31 = ch31_target_val.toString(16);
    rxbuf += hex_ch31;

    ch32_target_val = ch32;
    ch32_target_val = RC2SBUS(ch32_target_val);
    let hex_ch32 = ch32_target_val.toString(16);
    rxbuf += hex_ch32;

    let crc = Calc_CRC_8(rxbuf, 33);
    let hex_crc = crc.toString(16);
    rxbuf += hex_crc;
    // console.log(rxbuf);
    // MSW_mobius_mqtt_client.publish('/Mobius/KETI_MUV/RC_Data/Wonseok_RC', Buffer.from(rxbuf, 'hex'))
    sbusPort.write(Buffer.from(rxbuf, 'hex'))
}

let crc8_Table = [
    0, 94, 188, 226, 97, 63, 221, 131, 194, 156, 126, 32, 163, 253, 31, 65,  // 0 ~ 15
    157, 195, 33, 127, 252, 162, 64, 30, 95, 1, 227, 189, 62, 96, 130, 220,  // 16 ~ 31
    35, 125, 159, 193, 66, 28, 254, 160, 225, 191, 93, 3, 128, 222, 60, 98,  // 32 ~ 47
    190, 224, 2, 92, 223, 129, 99, 61, 124, 34, 192, 158, 29, 67, 161, 255,      // 48 ~ 63
    70, 24, 250, 164, 39, 121, 155, 197, 132, 218, 56, 102, 229, 187, 89, 7,  // 64 ~ 79
    219, 133, 103, 57, 186, 228, 6, 88, 25, 71, 165, 251, 120, 38, 196, 154,  // 80 ~ 95
    101, 59, 217, 135, 4, 90, 184, 230, 167, 249, 27, 69, 198, 152, 122, 36,   // 96 ~ 111
    248, 166, 68, 26, 153, 199, 37, 123, 58, 100, 134, 216, 91, 5, 231, 185,  // 112 ~ 127
    140, 210, 48, 110, 237, 179, 81, 15, 78, 16, 242, 172, 47, 113, 147, 205,  // 128 ~ 143
    17, 79, 173, 243, 112, 46, 204, 146, 211, 141, 111, 49, 178, 236, 14, 80,  // 144 ~ 159
    175, 241, 19, 77, 206, 144, 114, 44, 109, 51, 209, 143, 12, 82, 176, 238,  // 160 ~ 175
    50, 108, 142, 208, 83, 13, 239, 177, 240, 174, 76, 18, 145, 207, 45, 115,  // 176 ~ 191
    202, 148, 118, 40, 171, 245, 23, 73, 8, 86, 180, 234, 105, 55, 213, 139, // 192 ~ 207
    87, 9, 235, 181, 54, 104, 138, 212, 149, 203, 41, 119, 244, 170, 72, 22,  // 208 ~ 223
    233, 183, 85, 11, 136, 214, 52, 106, 43, 117, 151, 201, 74, 20, 246, 168,  // 224 ~ 239
    116, 42, 200, 150, 21, 75, 169, 247, 182, 232, 10, 84, 215, 137, 107, 53  // 240 ~ 255
];

function Calc_CRC_8(DataArray, Length) {
    let i;
    let crc;

    crc = 0x01;
    DataArray = Buffer.from(DataArray, 'hex');
    for (i = 1; i < Length; i++) {
        crc = crc8_Table[crc ^ DataArray[i]];
    }
    return crc;
}

let SerialPort = require('serialport');

let sbusPort = null;

let sbusPortNum = 'COM3';
let sbusBaudrate = 57600;

sbusPortOpening();

function sbusPortOpening() {
    if (sbusPort === null) {
        sbusPort = new SerialPort(sbusPortNum, {
            baudRate: parseInt(sbusBaudrate, 10),
        });

        sbusPort.on('open', sbusPortOpen);
        sbusPort.on('close', sbusPortClose);
        sbusPort.on('error', sbusPortError);
        // sbusPort.on('data', sbusPortData);
    } else {
        if (sbusPort.isOpen) {

        } else {
            sbusPort.open();
        }
    }
}

function sbusPortOpen() {
    console.log('sbusPort open. ' + sbusPortNum + ' Data rate: ' + sbusBaudrate);
}

function sbusPortClose() {
    console.log('sbusPort closed.');

    setTimeout(sbusPortOpening, 2000);
}

function sbusPortError(error) {
    let error_str = error.toString();
    // console.log('[sbusPort error]: ' + error.message);
    if (error_str.substring(0, 14) === "Error: Opening") {

    } else {
        // console.log('sbusPort error : ' + error);
    }

    setTimeout(sbusPortOpening, 2000);
}


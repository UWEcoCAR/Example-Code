// If you use jslint, the following line prevents use strict from throwing an error.
/*jslint node: true */
"use strict";

var gauge = require("./modules/gauge.js");
var zmq = require('zmq');
var subscriber = zmq.socket('sub');
var myMap = [];
// subscriber.on('message', queue_message);

/*
Initializes elements, starts draw cycle
*/
function init() {
	// Settings to provide to element
	var settings = {
		size: 300,
		clipWidth: 300,
		clipHeight: 300,
		ringWidth: 60,
		maxValue: 100,
		transitionMs: 1000,
	};

	// ID of div to add element to
	var targetID = '#speed-gauge';
	var speedGauge = gauge(targetID, settings);
	speedGauge.render();


	// ID of div to add element to
	var targetID2 = '#battery-gauge';
	var batteryGauge = gauge(targetID2, settings);
	batteryGauge.render();


/*
Dont need this since the gauge just needs '.render' above
*/
// 	// Repeat every 16 ms
// 	setInterval(function(){
// 		exampleElement.draw(targetID);
// 	}, 16);

	// Data to be sent to the element
	var data = 0;

	// Picks random setpoint and increments data util setpoint is reached
	var setPoint = 0;
	var increment = 1;
	function simulatePedal() {
		if (Math.abs(setPoint -  data) < increment) {  // reset setpoint
			setPoint = Math.round(Math.random() * 100); // int from 0 to 100
			increment = 3 * (Math.random() + 0.5); 			// float between 0.5 and 3
			console.log("Value :\t" + data +
									"\tSet Point :\t" + setPoint +
									"\tIncrement :\t" + increment);		// debug
		} else if (data < setPoint) {
			data += increment;
		} else {
			data += -1*increment;
		}
		return data;
	}

	// Update every 50 ms
	var speedData = 0;
	var batteryData = 0;
	setInterval(function(){
		// Different ways to generate data
		batteryData = (batteryData + 0.5) % 100;  // count from 1 to 100
		speedData = simulatePedal(); // updates data
		speedGauge.update(speedData);
		batteryGauge.update(100 - batteryData);
	}, 50);
}

/*
When window loads run init
*/
window.onload = function() {
	init();
};

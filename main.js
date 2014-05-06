// The MIT License (MIT)

// Copyright (c) 2014 Sam Bunting

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var canvas = document.getElementById("canvas");
var bodybackground = document.getElementById("body");
var context = canvas.getContext("2d");

var radius = 10;
var colour = "Black";
var tool = "Brush";

var previousColour = "black"; //Nothing
var dragging = false;

canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.2;

var putPoint = function(e) {
	if (dragging) {
		context.lineWidth = radius * 2;
		context.strokeStyle = colour;
		context.fillStyle = colour;
		
		context.lineTo(e.clientX - 370, e.clientY - 25);
		context.stroke();
		context.beginPath();
		context.arc(e.clientX - 370, e.clientY - 25, radius, 0, Math.PI * 2);
		context.fill();
		context.beginPath();
		context.moveTo(e.clientX - 370, e.clientY - 25);
	}
}

var engage = function(e) {
	dragging = true;
	putPoint(e)
}

var disengage = function() {
	dragging = false;
	context.beginPath();
}

function saveImage() {
	var dataUrl = canvas.toDataURL();

	window.open(dataUrl, "Saved Image");
}

function setRadius(size) {
	radius = size;
	update();
}

function setColour(newColour) {
	colour = newColour;
	tool = "Brush";
	update();
}

function activateRubber () {
	previousColour = colour;
	colour = "White";
	tool = "Rubber";
	update();
}

function activateBrush () {
	colour = previousColour;
	tool = "Brush";
	update();
}

function update() {
	tool = document.getElementById("stat_tool").innerHTML = tool;
	colour = document.getElementById("stat_colour").innerHTML = colour;
	radius = document.getElementById("stat_radius").innerHTML = radius;
}

canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mousemove", putPoint);
canvas.addEventListener("mouseup", disengage);
bodybackground.addEventListener("mouseover", disengage);

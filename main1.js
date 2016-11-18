// Mike La Grouw 10626700
// change color of 4 countries
window.onload = function() {
 	 changeColor("esp", "red");
 	 changeColor("fra", "blue");
 	 changeColor("swe", "yellow");
 	 changeColor("ua", "yellow");
}

// select country by id and set color to color
function changeColor(id, color) {
	var land = document.getElementById(id);
	land.style.fill = color      
}


$(document).ready(function(){
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    var lati = position.coords.latitude;
	    var longi = position.coords.longitude;

	    //new request
	    var fiveDay = new XMLHttpRequest();
		fiveDay.open("GET", "http://api.openweathermap.org/data/2.5/forecast?lat=" + lati + "&lon="+ longi +"&appid=44db6a862fba0b067b1930da0d769e98", false);
		fiveDay.send();
		fiveDay = JSON.parse(fiveDay.response);
		//log it to the console to look through it
		console.log(fiveDay);

		var request = new XMLHttpRequest();
		request.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon="+ longi +"&appid=44db6a862fba0b067b1930da0d769e98", false);
		request.send();
		request = JSON.parse(request.response);

		var tempCelsius = parseInt(request.main.temp - 273.15);
		if (tempCelsius < 0){
			$("html").css("background-color", "#7EB2E8");
			$("#icon").css("color", "#7EB2E8");
		} else if (tempCelsius < 5){
			$("html").css("background-color", "#0DAFE8");
			$("#icon").css("color", "#0DAFE8");
		} else if (tempCelsius < 10) {
			$("html").css("background-color", "#7CFAFF");
			$("#icon").css("color", "#7CFAFF");
		} else if (tempCelsius < 15) {
			$("html").css("background-color", "#FFE652");
			$("#icon").css("color", "#FFE652");
		} else if (tempCelsius < 20) {
			$("html").css("background-color", "#FF6600");
			$("#icon").css("color", "#FF6600");
		} else if (tempCelsius < 25) {
			$("html").css("background-color", "#E8430C");
			$("#icon").css("color", "#E8430C");
		} else if (tempCelsius > 25) {
			$("html").css("background-color", "#FF250D");
			$("#icon").css("color", "#FF250D");
		}

		$("#icon").html("<i class='wi wi-owm-day-" + request.weather[0].id + "'></i>" + "<p>Click Me!</p>");
		$(".container h1").html("<strong>" + request.name + "</strong>");
		$("#temp").html(parseInt(request.main.temp - 273.15) + "<i class='wi wi-celsius'></i>");
		$(".btn").html("Switch to F&deg;");
		var celsius = true;	
		$("#temp").click(function(){
			if (celsius) {
				$("#temp").html(parseInt((request.main.temp - 273.15)*1.8+32) + "<i class='wi wi-fahrenheit'></i>");
				celsius = false;
			} else {
				$("#temp").html(parseInt(request.main.temp - 273.15) + "<i class='wi wi-celsius'></i>");
				celsius = true;
			}
		});
		$("#weather").html("<i class='wi wi-owm-day-" + request.weather[0].id + "'></i> " + request.weather[0].main);
		$("#wind").html("<i class='wi wi-strong-wind'></i> " + (request.wind.speed * 3.6).toFixed(1) + " km/h");
		$("#humidity").html("<i class='wi wi-humidity'></i> " + request.main.humidity + "%");

		var forecaster = function(number){
			for (var i = 0; i < number; i++){
				$(".forecast").append("<div class='col-xs-4'><h2><strong>" + fiveDay.list[i].dt_txt.slice(10, 16) + "</strong></h2><p>" 
					+ "<i class='wi wi-owm-day-" + fiveDay.list[i].weather[0].id + "'></i>" +  fiveDay.list[i].weather[0].main + "</p><p><strong>" + parseInt(fiveDay.list[i].main.temp - 273.15) + "<i class='wi wi-celsius'></i></strong>" + "</p>"
					+ "<p>" + "<i class='wi wi-strong-wind'></i> " + parseInt(fiveDay.list[i].wind.speed * 3.6) + "km/h</p>" + "</div>");
			}
		}
		forecaster(6);

		$("#icon").click(function(){
			$("#forecast").toggleClass("hide");
		});

	  });
	} else {
		$(".container h1").text("Unfortunately this app only works if you let it use your location!");
	}
});

$(document).ready(function() {

    var cityToSearch
    var cardEl = $("<div>")
    var cardBodyEl = $("<div>")
    var h5El = $("<h5>")
    var imgEl = $("<img>")
    var pTempEl = $("<p>")
    var pHumidEl = $("<p>")
    var SearchHistory = JSON.parse(localStorage.getItem("SearchHistory"));

    cardEl.attr({
        class: 'card text-white bg-primary m-3',
        style: 'max-width: 10rem;'
    });
    cardBodyEl.attr("class", "card-body");
    h5El.attr("class", "card-title");
    pTempEl.attr("class", "card-text");
    pHumidEl.attr("class", "card-text");
//This is the main function to call the secondary ones
    $("#searchBtn").click(function(){

        $("#forcast").empty();
        
        cityToSearch = $("#citySearch").val();
        SearchHistory.unshift(cityToSearch)
        localStorage.setItem("SearchHistory", JSON.stringify(SearchHistory));
    
        renderSearchHistory();
    
        getWeather();
    
        $("#citySearch").val("");
    });

    $(function(){
        $("#searchHist li").click(function(){
            $("#forcast").empty();
            cityToSearch = $(this).text()
            getWeather();
        });
    });
    
    //This function is to at the search to the DOM
    function renderSearchHistory(){
    
        $("#searchHist").empty();
    
        while (SearchHistory.length > 8){
            SearchHistory.splice(-1,1);
        }
        // Creates a list element at every search
        for(i=0; i<SearchHistory.length; i++){
            cityListItem = $("<li>");
            cityListItem.attr("class", "list-group-item")
            cityListItem.text(SearchHistory[i])
            $("#searchHist").append(cityListItem)
            console.log(SearchHistory[i])
        }
    }

    function getWeather(){

        var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityToSearch + "&units=imperial&appid=2b4bde6e0df50ad6369df0cb0b71565d";
        var fiveDayWeatheruRL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityToSearch + "&units=imperial&cnt=40&appid=2b4bde6e0df50ad6369df0cb0b71565d";

        console.log("fiveday forcast: " + fiveDayWeatheruRL)
    
        // This will call the api url to get the data
        $.ajax({
            url: currentWeatherURL,
            method: "GET"
            }).then(function(response) {
        
                var currentWeatherImg = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
                var dateString = moment.unix(response.dt).format("MM/DD/YYYY | h:mm a");
    
                //Data from the response to fill in the html
                $("#city").text(response.name);        
                $("#currweatherIcon").attr("src", currentWeatherImg);
                $("#curDNT").text(dateString);
                $("#curTemp").html("Tempurature: " + response.main.temp + " &degF");
                $("#curHum").text("Humidity: " + response.main.humidity + "%");
                $("#curWind").text("Wind Speed: " + response.wind.speed);
                
                var currentUVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "5&lon=" + response.coord.lon + "&appid=2b4bde6e0df50ad6369df0cb0b71565d"
                $.ajax({
                    url: currentUVIndexURL,
                    method: "GET"
                    }).then(function(UVresponse) {
                        if (UVresponse.value >= 11) {
                            $("#curUVIndex").attr('class', 'severe');
                            $("#curUVIndex").text("UV Index: " + UVresponse.value);
                        } else if (UVresponse.value >= 8) {
                            $("#curUVIndex").attr('class', 'moderate');
                            $("#curUVIndex").text("UV Index: " + UVresponse.value);
                        } else if (UVresponse.value >= 3) {
                            $("#curUVIndex").attr('class', 'good');
                            $("#curUVIndex").text("UV Index: " + UVresponse.value);
                        }
                    }); 
                }); 
                for(var i=0; i < 5 ; i++){

                    var interation = 0
                    interation = (8*i) + 6
                    getForcast(interation, fiveDayWeatheruRL);
            
                }
            
            };
    
        function getForcast(i, url){

            var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityToSearch + "&units=imperial&cnt=40&appid=2b4bde6e0df50ad6369df0cb0b71565d";


             $.ajax({
            url: forecast,
            method: "GET",
            }).then(function(response) {
            
            var dayWeatherImg = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
            var dayDateString = moment.unix(response.list[i].dt).format("MM/DD/YYYY");
                    
            h5El.text(dayDateString)
            imgEl.attr("src", dayWeatherImg);
            pTempEl.html("Temp: " + response.list[i].main.temp + " &degF");
            pHumidEl.text("Humidity: " + response.list[i].main.humidity + "%")
            
            cardBodyEl.append(h5El).append(imgEl).append(pTempEl).append(pHumidEl);
            cardEl.append(cardBodyEl);
            cardEl.clone().appendTo($("#forcast"))
            
            });
            }

            if (SearchHistory == undefined || SearchHistory == null){
                SearchHistory = ["Houston"];
                localStorage.setItem("SearchHistory", JSON.stringify(SearchHistory));
            }
    
        var cityListItem
        cityToSearch = SearchHistory[0]
    
        getWeather();
        
        renderSearchHistory();




});  
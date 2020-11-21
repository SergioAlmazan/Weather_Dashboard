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





});  
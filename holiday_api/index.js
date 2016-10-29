"use strict";

$(document).ready(function () {

    var country;
    var date;
    var y;
    var m;
    var d;

    $('#submit').click(function(){
      country = document.getElementById('country').value.toUpperCase();
      //alert(country);
      date = document.getElementById('date').value;
      //alert(date);
      y = date.substr(0, 4);
      //alert(date.length);
      if(date.length >= 7){
        m = date.substr(5, 2);
        } else {
          m = "";
      }
      //alert(m);
      if(date.length == 10){
        d = date.substr(8, 2);
        } else {
          d = "";
      }
      //alert(d);

      renderData();
      var myRequest = new Request(url + "&country=" + country + "&year=" + y + ((m) ? "&month="+m : "") + ((d) ? "&day="+d : ""));
      fetchfun(myRequest);
    })

    var i = 0; 
    var url = "https://holidayapi.com/v1/holidays?key=883a4aca-792a-4530-b5a3-8a98c290fc05";
    var renderData = function(){
        if(i == 0/*< ipAdresses.length*/){
            alert(date);
            URL = url + "&country=" + country + "&year=" + y + ((m) ? "&month="+m : '') + ((d) ? "&day="+d : '');
            alert(URL);
            var source   = $("#some-template").html();
            var template = Handlebars.compile(source);
            $.getJSON(URL, function(data){
		            if(m == ''){
                    $("#result").html(template(data.holidays));
		            } else {
		              $("#result").html(template(data));
		            }

		            if(data.holidays.length == 0){
		                alert('No holiday has been found.');
                }
                    console.log("success", data);
            });
        }
    }

    // setInterval(renderData, 1000)

    var fetchfun = function(req){
        fetch(req)  
        .then(  
            function(response) {  
              if (response.status !== 200) {  
                console.log('Looks like there was a problem. Status Code: ' +  
                response.status);  
                return;  
              }

              response.json().then(function(data) {  
                console.log("fetch method succeded", data);  
              });  
            }  
        )  
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
    };

})
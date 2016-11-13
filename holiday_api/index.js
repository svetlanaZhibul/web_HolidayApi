"use strict";

window.onerror = function(m) {
    alert("\n" + "Error: Check your Internet connection!");
  };

$(document).ready(function () {

    var country;
    var date;
    var y;
    var m;
    var d;

    var button = document.getElementById('submit');
    button.addEventListener("click", function() {
        console.log("Processing data");

      	country = document.getElementById('country').value.toUpperCase();
      	date = document.getElementById('date').value;
	    
      	y = date.substr(0, 4);
	    
        if(date.length >= 6){
          m = date.substr(5, 2);
          if( !(/\d/.test(m.charAt(1))) ){
                m = m.charAt(0);
          } else if(m.charAt(0) == '0'){
                m = m.charAt(1);
          }
        } else {
          m = "";
        }
	    
        if(date.length >= 8){
          d = date.substr(-2, 2);
          if( !(/\d/.test(d.charAt(0))) || (d.charAt(0) == '0') ){
            d = d.charAt(1);
          } 
        } else {
          d = "";
        }

        try {
          IsInCodesArr();
          IsDateValid();

          renderData();
          var myRequest = new Request(url + "&country=" + country + "&year=" + y + ((m) ? "&month="+m : "") + ((d) ? "&day="+d : ""));
          fetchfun(myRequest);
          call_xhr();

          document.getElementById("errMsg").innerHTML = '';
        } catch (e) {
            alert(e);
            console.log(e);
            document.getElementById("errMsg").innerHTML = e.message;
        }
    })

    var url = "https://holidayapi.com/v1/holidays?key=883a4aca-792a-4530-b5a3-8a98c290fc05";
	
    var IsInCodesArr = function(){
    	var elements = document.getElementsByTagName('code');
       	var flag;

        for (var i = 0; i < elements.length; i++) {
            if(country == elements[i].innerHTML){
              flag = true; break;
            } else {
              flag = false;
            }
        }

        if(!flag) throw new Error("Invalid country code: " + country);
    };

    var IsDateValid = function(){
        if(date.length < 4 || date == '' || date.length > 10) throw new Error("Date is too small/too big");

        if(m.toNumber > 12) throw new Error("Incorrect month value");

        function in_array(value, array) {
          for(var i = 0; i < array.length; i++) {
            if(array[i] == value) return true;
          }
          return false;
        }

        if( (in_array(m, ['1', '3', '5', '7', '8', '10', '12']) && Number(d) > 31) ||
            (in_array(m, ['4', '6', '9', '11']) && Number(d) > 30) ||
            (m == '2' && Number(d) > 29) ) throw new Error("Incorrect day value");
    };

    var renderData = function(){
        URL = url + "&country=" + country + "&year=" + y + ((m) ? "&month="+m : '') + ((d) ? "&day="+d : '');
	    
        var source   = $("#some-template").html();
        var template = Handlebars.compile(source);
	    
        $.getJSON(URL, function(data){
		        if(m == ''){
                $("#result").html(template(data.holidays));
		        } else {
		            $("#result").html(template(data));
		        }

		        if(data.holidays.length == 0){
		            alert('No holiday on this day has been found.');
            }

            console.log("success", data);
        });
    }

    function call_xhr() {
        var req;
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        }
        if (req != null) {
            var Url = url + "&country=" + country + "&year=" + y + ((m) ? "&month="+m : '') + ((d) ? "&day="+d : '');
            document.getElementById("txt").innerHTML = "Request Sent...";
            req.open("GET", Url, true);

            req.timeout = 4000; 
            req.ontimeout = function () { alert("Timed out!!!"); }
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    document.getElementById("txt").innerHTML = "Response Received!";
                }
            }
                
            req.send();
        } else {
          window.alert("Error creating XmlHttpRequest object.");
        }
    } 
    /*$(function () {
        var timerId = 0;

        $('textarea').focus(function () {
          timerId = setInterval(function () {
          try {
          IsInCodesArr();
          IsDateValid();

          renderData();
          var myRequest = new Request(url + "&country=" + country + "&year=" + y + ((m) ? "&month="+m : "") + ((d) ? "&day="+d : ""));
          fetchfun(myRequest);
          call_xhr();

          document.getElementById("errMsg").innerHTML = '';
        } catch (e) {
            alert(e);
            console.log(e);
            document.getElementById("errMsg").innerHTML = e.message;
        }, 5000);
      });

      $('textarea').blur(function () {
        clearInterval(timerId);
      });

    });*/

    var fetchfun = function(Req){
        fetch(Req)  
        .then(  
            function(response) {  
              if (response.status !== 200) {  
                console.log("Looks like there was a problem. Status Code: " +  
                response.status);  
                return;  
              }

              response.json().then(function(data) {  
                console.log("fetch method succeded", data);  
              });  
            }  
        )  
        .catch(function(err) {  
            console.log("Fetch Error: ", err);  
        });
    };

})

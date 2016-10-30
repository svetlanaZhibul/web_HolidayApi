"use strict";

$(document).ready(function () {

    var country;
    var date;
    var y;
    var m;
    var d;

    $('#submit').click(function(){
	try{
      	    country = document.getElementById('country').value.toUpperCase();
      	    date = document.getElementById('date').value;
	    
      	    y = date.substr(0, 4);
	    
            if(date.length >= 7){
              m = date.substr(5, 2);
            } else {
              m = "";
            }
	    
           if(date.length == 10){
             d = date.substr(8, 2);
           } else {
             d = "";
           }
		
	   if(date.length < 4 || date == '') throw new Error("Lack of data");
           if(!IsInCodesArr()) throw new Error("Invalid country code!");
		
	   renderData();
		
           var myRequest = new Request(url + "&country=" + country + "&year=" + y + ((m) ? "&month="+m : "") + ((d) ? "&day="+d : ""));
           fetchfun(myRequest);
		 
           call_xhr();
        } 
        catch(e) {
           alert(e);
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

        if(flag) return true;
        else return false;
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
		    alert('No holiday has been found.');
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
    // setInterval(renderData, 1000)

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

/*
    Client side javascript
*/

function newAlerts(){ //Populates the new alerts on the home page
    $.ajax({
        url: "/alerts",
        type: "GET",
        success: function(alerts){
            if (alerts.length != 0){
                //console.log(alerts);
                let alertLink;
                let alertAdded = false;
                const newDiv = document.getElementById("new");
                const currentDate = new Date();
                for (var alert of alerts){
                    //get the link to the correct tracking page
                    if (alert.type == "maintenance"){
                        alertLink = "AT-M";
                    }
                    if (alert.type == "earthquake"){
                        alertLink = "AT-E";
                    }
                    if (alert.type == "tsunami"){
                        alertLink = "AT-T";
                    }
                    if (alert.type == "tornado"){
                        alertLink = "AT-TOR";
                    }
                    if (alert.type == "flood"){
                        alertLink = "AT-F";
                    }
                    if (alert.type == "fire"){
                        alertLink = "AT-W";
                    }
                    let alertDate = new Date(alert.date);
                    if (alertDate.toDateString() == currentDate.toDateString()){
                        alertAdded = true;
                        let alertButton = document.createElement("button");
                        alertButton.innerHTML = "Alert #" + alert.id + " - " + alert.type;
                        //console.log(alertLink);
                        alertButton.setAttribute('onclick', "location.href='/" + alertLink + "'");
                        alertButton.type = "button";
                        alertButton.classList.add("btn");
                        alertButton.classList.add("btn-lg");
                        alertButton.classList.add("w-100");
                        //console.log(alert.level);
                        if (alert.level == "high"){
                            alertButton.classList.add("btn-danger");
                        }
                        if (alert.level == "med"){
                            //console.log("Med level");
                            alertButton.classList.add("btn-warning");
                        }
                        if (alert.level == "low"){
                            alertButton.classList.add("btn-success");
                        }
                        newDiv.appendChild(document.createElement("br"));
                        newDiv.appendChild(alertButton);
                        newDiv.appendChild(document.createElement("br"));
                    }
                }
                if (!alertAdded){
                    console.log("Alert not added");
                    document.getElementById("noAlerts").innerHTML = "No new alerts";
                }
            }
            else{
                console.log("No alerts to add");
                document.getElementById("noAlerts").innerHTML = "No new alerts";
            }
        },
        error: function (xhr,status,err){
            alert("Error getting alert data from the server");
        }
    });
}

function tracking(type){ //Populates the tracking pages with their respective alerts
    $.ajax({
        url: "/alerts",
        type: "GET",
        success: function(alerts){
            if (alerts.length != 0){
                let last30 = document.getElementById("last30Body");
                let previous = document.getElementById("Previous-issues");
                let lastMonth = new Date();
                lastMonth.setDate(lastMonth.getDate()-30);
                for (var alert of alerts){
                    if (alert.type == type){
                        let alertDate = new Date(alert.date);
                        console.log(alertDate);
                        console.log(lastMonth);
                        if (alertDate >= lastMonth){
                            console.log("lastmonth");
                            let newRow = document.createElement("tr");
                            last30.appendChild(newRow);
                            let newDate = document.createElement("th");
                            newDate.innerHTML = alertDate.toDateString();
                            newRow.appendChild(newDate);
                            let newArea = document.createElement("th");
                            newArea.innerHTML = alert.coords;
                            newRow.appendChild(newArea);
                            let newIssue = document.createElement("th");
                            newIssue.innerHTML = alert.details;
                            newRow.appendChild(newIssue);
                        }
                        else{ //This is just copy/pasted from the html with the variables added in
                            previous.innerHTML = previous.innerHTML +
                            '<button class="PI1 btn btn-lg w-100" type="button" data-bs-toggle="collapse" data-bs-target="#issuedrop"' +
                            'aria-controls="issuedtdrop" aria-expanded="false"> Alert #' + alert.id + '</button>' +
                            '<div class="collapse issues1" id="issuedrop">' +
                            //'<div class="issue-Header" id="issue-repoted">' +
                            //'<h2>Issue:' + type + '</h2>' +
                            //'</div>' +
                            '<p>' + alert.details + '</p>' +
                            '<div class="Sensor-info">' +
                            '<h3>Sensor Information</h3>' +
                            '<table class="table table-condesned"> ' +
                            '<tr>' +
                            '<th>ID</th>' +
                            '<th>Type</th>' +
                            '<th>Location</th>' +
                            '<th>Severity</th>' +
                            '</tr>' +
                            '<tbody>' +
                            '<tr>' +
                            '<td>01</td>' +
                            '<td>' + alert.type +'</td>' +
                            '<td>'+ alert.coords + '</td>' +
                            '<td>' + alert.level + '</td>' +
                            '</tr>' +
                            '</tbody>' +
                            '</table>' +
                            '</div>' +
                            '</div>';
                        }
                    }
                }
            }
            else{
                //console.log("No alerts to add");
                document.getElementById("noAlerts").innerHTML = "No recent alerts";
            }
        },
        error: function (xhr,status,err){
            alert("Error getting alert data from the server");
        }
    });
}
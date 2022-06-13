/*
    Client side javascript
*/

function newAlerts(){
    $.ajax({
        url: "/alerts",
        type: "GET",
        success: function(alerts){
            if (alerts.length != 0){
                //console.log(alerts);
                const newDiv = document.getElementById("new");
                for (var alert of alerts){
                    let alertButton = document.createElement("button");
                    alertButton.innerHTML = "New " + alert.type + " alert";
                    alertButton.href = "/";
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
            else{
                //console.log("No alerts to add");
                document.getElementById("noAlerts").innerHTML = "No new alerts";
            }
        },
        error: function (xhr,status,err){
            alert("Error getting alert data from the server");
        }
    });
}
function requestIp() {
    let url = "http://localhost:8125/findMyIp";

    console.log("Facem fetch la url-ul: " + url);
    fetch(url, {
        // credentials: 'include',
        method: 'GET',
        // mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            document.getElementById("inputValue").value = response.ip;
        })
        .catch(e => console.log(e));
    readfromfile();
}

function sendData() {

    let ip = document.getElementById('inputValue').value;
    console.log("ip: " + ip);
    let url = `http://localhost:8125?ip=${ip}`;

    console.log("Facem fetch la url-ul: " + url)

    fetch(url, {
        // credentials: 'include',
        method: 'GET',
        // mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            response = JSON.parse(response);
            document.getElementById("finalResult").innerHTML = `<p> The weather is ${response.weather[0].main} </p> 
                                                                             <p> Description: ${response.weather[0].description}
                                                                             <p> City: ${response.name}</p>
                                                                             <p> Weather: ${response.main.temp - 273} C</p>`
        })
        .catch(e => console.log(e));
    readfromfile();
}

function readfromfile() {
    let url = "http://localhost:8125/metrics";
    fetch(url, {
        // credentials: 'include',
        method: 'GET',
        // mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            document.getElementById("logs").innerText = response.file
            let data = response.file.split("\n");

            let sum = 0;
            for (let i = 0; i < data.length; i = i + 2) {
                sum += parseFloat(data[i].split(" ")[0])
            }
            document.getElementById("metrics").innerHTML = `<li> Total time: ${sum} </li>
                                                                     <li> Total requests: ${data.length}</li>`;
        })
        .catch(e => console.log(e));
}
function dateLoader() {
    let dt = new Date();
    document.getElementById("time").innerHTML = dt.toDateString();
    console.log("Worked");
}

function quoteLoader() {
    let apiUrl = 'https://quotes.rest/qod?category=art&language=en';
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        // console.log(data.contents.quotes[0].quote);
        document.getElementById("quote").innerHTML = '"' + data.contents.quotes[0].quote + '"';

    }).catch(err => {
        console.log("API Error.")
    });
}

function crosser() {
    if (document.getElementById("flexCheckDefault").checked == TRUE) {
        console.log("HI :D");

    }

}

window.onload = function() {
    dateLoader();
    quoteLoader();
}
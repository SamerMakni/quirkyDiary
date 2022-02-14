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

function backgroundLoader() {
    let apiUrl = "https://api.smk.dk/api/v1/art/search/?keys=*&fields=image_thumbnail,colors,artist,titles,labels&filters=[has_image:true],[object_names:maleri],[public_domain:true]&offset=0&rows=300";
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        let random = Math.floor(Math.random() * 300);
        console.log(data.items[random].image_thumbnail);
        let body = document.getElementById("myBody");
        document.getElementById("leftSection").classList.add("bg-[" + data.items[random].colors[1] + "]");
        console.log(data.items[random].colors[1]);

        body.style.backgroundImage = "url('" + data.items[random].image_thumbnail + "')";


    }).catch(err => {
        console.log("API Error.")
    });
}


window.onload = function() {
    dateLoader();
    quoteLoader();
    backgroundLoader();
}
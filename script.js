function colorizer(str) {
    let red = parseInt(str.substr(1, 2), 16);
    let green = parseInt(str.substr(3, 2), 16);
    let blue = parseInt(str.substr(5, 2), 16);
    let intensity = red * 0.299 + green * 0.587 + blue * 0.114;
    return intensity > 168 ? true : false;
}

i = 10;


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
    let apiUrl = "https://api.smk.dk/api/v1/art/search/?keys=*&fields=image_thumbnail,colors,artist,titles,labels,object_number&filters=[has_image:true],[object_names:maleri],[public_domain:true]&offset=0&rows=300";
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        let random = Math.floor(Math.random() * 300);
        console.log(data.items[random].image_thumbnail);
        let body = document.getElementById("myBody");
        document.getElementById("leftSection").classList.add("bg-[" + data.items[random].colors[1] + "]");
        console.log(data.items[random].colors[1]);
        document.getElementById("rightSection").classList.add("bg-[" + data.items[random].colors[2] + "]");
        console.log(data.items[random].colors[2])
        let text = data.items[random].titles[0].title + " by " + data.items[random].artist;
        body.style.backgroundImage = "url('" + data.items[random].image_thumbnail + "')";
        let link = data.items[random].object_number;
        link = "https://open.smk.dk/artwork/image/" + link.toLowerCase();
        document.getElementById("reference").innerHTML = `<a href="${link}" target="_blank">${text}</a>`;
        if (colorizer(data.items[random].colors[1]) == false)
            document.getElementById("leftSection").classList.add("text-white");
        if (colorizer(data.items[random].colors[2]) == false) {
            document.getElementById("rightSection").classList.add("text-white");
        }
        document.getElementById("modalContent").classList.add("bg-[" + data.items[random].colors[3] + "]");
        document.getElementById("input").classList.add("bg-[" + data.items[random].colors[3] + "]");
        if (colorizer(data.items[random].colors[3]) == false) {
            document.getElementById("input").classList.add("border-white");
            document.getElementById("input").classList.add("text-white");
            document.getElementById("accept").classList.add("text-white");

        }

    }).catch(err => {
        console.log(err);
    });
}

document.getElementById("add").addEventListener("click", function() {
    document.getElementById("myModal").classList.remove("hidden");
    document.getElementById("myModal").classList.add("block");
    document.getElementById("error").innerHTML = "";
    errr = false;
})

window.onload = function() {
    backgroundLoader();
    dateLoader();
    quoteLoader();
}
window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").classList.add("hidden");


    }
}
let errr = false;

document.getElementById("accept").addEventListener("click", function() {

    let newTask = document.getElementById("input").value;
    if (newTask.length == 0) {
        if (errr == false) document.getElementById("error").innerHTML += "No task entered";
        errr = true;


    } else {
        document.getElementById("tasks").innerHTML += '<br> <input class="form-check-input appearance-none h-3 w-3 border border-gray-300 rounded-sm bg-gray-300 checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   type="checkbox" value="" id="flexCheckDefault' + i + '">    <label class="form-check-label inline-block" for="flexCheckDefault' + i + '"> ' + newTask + ' </label>';
        i++;
        document.getElementById("myModal").classList.add("hidden");
        console.log(i);
    }
});
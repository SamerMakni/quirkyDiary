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
        document.getElementById("modalContent2").classList.add("bg-[" + data.items[random].colors[3] + "]");
        document.getElementById("noteDescription").classList.add("bg-[" + data.items[random].colors[3] + "]");
        document.getElementById("inputNote").classList.add("bg-[" + data.items[random].colors[3] + "]");

        if (colorizer(data.items[random].colors[3]) == false) {
            document.getElementById("input").classList.add("border-white");
            document.getElementById("input").classList.add("text-white");
            document.getElementById("accept").classList.add("text-white");
            document.getElementById("inputNote").classList.add("border-white");
            document.getElementById("inputNote").classList.add("text-white");
            document.getElementById("noteDescription").style.borderColor = "white";
            document.getElementById("noteDescription").classList.add("text-white");
            document.getElementById("acceptNote").classList.add("text-white");
            document.getElementById("myModal2").classList.add("text-white");


        }

    }).catch(err => {
        console.log(err);
    });
}

document.getElementById("add").addEventListener("click", function() {
    document.getElementById("myModal").style.visibility = "visible";
    document.getElementById("myModal").style.opacity = 1;



    document.getElementById("error").innerHTML = "";
    errr = false;
})

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.visibility = "hidden";
        document.getElementById("myModal").style.opacity = 0;

    }
}

// function onReady(callback) {
//     var intervalId = window.setInterval(function() {
//         window.clearInterval(intervalId);
//         callback.call(this);

//     }, 1000);
// }

// function setVisible(selector, visible) {
//     document.querySelector(selector).style.display = visible ? 'block' : 'none';
// }



let errr = false;
let errr2 = false;

document.getElementById("accept").addEventListener("click", function() {

    let newTask = document.getElementById("input").value;
    if (newTask.length == 0) {
        if (errr == false) document.getElementById("error").innerHTML += "No task entered";
        errr = true;


    } else {
        let labeler = document.createElement("br");
        let label = document.createElement("label");
        label.classList.add("form-check-label", "inline-block");
        let inputer = document.createElement("input", );
        inputer.setAttribute("type", "checkbox");
        let spaner = document.createElement("span");
        spaner.innerText = newTask;
        inputer.classList.add("form-check-input", "appearance-none", "h-3", "w-3", "border", "border-gray-300", "rounded-sm", "bg-gray-300", "checked:bg-black", "checked:border-black", "focus:outline-none", "transition", "duration-200", "mt-1", "align-top", "bg-no-repeat", "bg-center", "bg-contain", "float-left", "mr-2", "cursor-pointer");
        label.appendChild(inputer);
        label.appendChild(spaner);
        document.getElementById("tasks").appendChild(label);
        document.getElementById("tasks").append(labeler);
        i++;
        document.getElementById("myModal").style.visibility = "hidden";
        document.getElementById("myModal").style.opacity = 0;
        console.log(i);
    }
});

setTimeout(function() {
    document.getElementById("loading").classList.add("opacity-0");
}, 1500);
setTimeout(function() {
    document.getElementById("loading").style.display = "none";
}, 3000);

window.onload = function() {
    backgroundLoader();
    dateLoader();
    quoteLoader();

}

document.getElementById("refImage").addEventListener("click", function() {

    location.reload()
});
document.getElementById("showImage").addEventListener("mouseover", function() {
    console.log("hello");
    document.getElementById("leftSection").style.visibility = "hidden";
    document.getElementById("leftSection").style.opacity = 0;
    document.getElementById("rightSection").style.visibility = "hidden";
    document.getElementById("rightSection").style.opacity = 0;

})
document.getElementById("showImage").addEventListener("mouseleave", function() {
    console.log("hello");
    document.getElementById("leftSection").style.visibility = "visible";
    document.getElementById("leftSection").style.opacity = 1;
    document.getElementById("rightSection").style.visibility = "visible";
    document.getElementById("rightSection").style.opacity = 1;

});

document.getElementById("addNote").addEventListener("click", function() {
    document.getElementById("myModal2").style.visibility = "visible";
    document.getElementById("myModal2").style.opacity = 1;

})


document.body.onclick = function(event) {
    if (event.target == document.getElementById("myModal2")) {
        document.getElementById("myModal2").style.visibility = "hidden";
        document.getElementById("myModal2").style.opacity = 0;
        document.getElementById("error2").innerHTML = "";
        errr2 = false;


    }
}

document.getElementById("acceptNote").addEventListener("click", function() {
    let noteValue = document.getElementById("inputNote").value;
    if (noteValue.length == 0) {
        if (errr2 == false) document.getElementById("error2").innerHTML = "No title entered";
        errr2 = true;
    } else {
        document.getElementById("notes").innerHTML += `<p id=${i} class="cursor-pointer"> ${noteValue}</p> <br>`;
        document.getElementById("myModal2").style.visibility = "hidden";
        document.getElementById("myModal2").style.opacity = 0;
        i++;
        errr2 = false;

    }
})

// window.onload = displayClock();

// function displayClock() {
//     var display = new Date().toLocaleTimeString();
//     document.getElementById("currentTime").innerHTML = display;
//     setTimeout(displayClock, 1000);
// }
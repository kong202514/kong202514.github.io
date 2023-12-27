

// var blok = document.querySelectorAll(".menu_bar")


// function add_class(event) {
//     blok = event.target.style.backgroundColor = "#FFFFCC"
//     blok = event.target.style.width = "20%"
//     blok = event.target.style.height = "2em"


// }


// // image001.png

// function remove(event) {
//     blok = event.target.style.backgroundColor = ""
//     blok = event.target.style.width = ""
//     blok = event.target.style.height = ""

// }



// blok.forEach((a) => {
//     a.addEventListener('mouseover', add_class)
//     a.addEventListener('mouseout', remove)


// })



function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain attribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};


includeHTML();

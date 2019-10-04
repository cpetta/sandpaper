window.addEventListener("resize", displayDate);

function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}
async function getStats() {
    const token = localStorage.getItem('token');

    const requestObj = await fetch('/api/objective', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const responseObj = await requestObj.json();

    const caloriesText = document.getElementById("calories-text");
    const proteinText = document.getElementById("protein-text");
    const fatText = document.getElementById("fat-text");

    caloriesText.innerHTML = responseObj.calories;
    proteinText.innerHTML = responseObj.protein;
    fatText.innerHTML = responseObj.fat;

    const caloriesBar = document.getElementById("calories-bar");
    const proteinBar = document.getElementById("protein-bar");
    const fatBar = document.getElementById("fat-bar");
    fatBar.style.width = "0%";

}

getStats();
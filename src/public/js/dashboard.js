async function getStats() {
    const token = localStorage.getItem('token');

    const requestObj = await fetch('/api/goals', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const responseObj = await requestObj.json();
    console.log(responseObj);

    const caloriesText = document.getElementById("calories-text");
    const proteinText = document.getElementById("protein-text");
    const fatText = document.getElementById("fat-text");

    caloriesText.innerHTML = responseObj.calories ? responseObj.calories : '?';
    proteinText.innerHTML = responseObj.protein ? responseObj.protein : '?';
    fatText.innerHTML = responseObj.fat ? responseObj.fat : '?';

    const caloriesBar = document.getElementById("calories-bar");
    const proteinBar = document.getElementById("protein-bar");
    const fatBar = document.getElementById("fat-bar");
    fatBar.style.width = "0%";

}

getStats();
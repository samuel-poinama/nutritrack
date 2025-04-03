async function getStats() {
    const token = localStorage.getItem('token');

    const requestObj = await fetch('/api/goals', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const objective = await requestObj.json();
    console.log(objective);

    const requestMeals = await fetch('/api/meals', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    
    const meals = await requestMeals.json();
    const calc = meals.reduce((acc, meal) => 
        { acc.calories += meal.calories; acc.protein += meal.protein; acc.fat += meal.fat; return acc }, { calories: 0, protein: 0, fat: 0 });
    

    const caloriesBar = document.getElementById("calories-bar");
    const proteinBar = document.getElementById("protein-bar");
    const fatBar = document.getElementById("fat-bar");
    fatBar.style.width = `${(calc.fat / objective.fat) * 100}%`;
    proteinBar.style.width = `${(calc.protein / objective.protein) * 100}%`;
    caloriesBar.style.width = `${(calc.calories / objective.calories) * 100}%`;


    const caloriesText = document.getElementById("calories-text");
    const proteinText = document.getElementById("protein-text");
    const fatText = document.getElementById("fat-text");
    
    caloriesText.innerHTML = `${calc.calories} / ${objective.calories ? objective.calories : '?'}`;
    proteinText.innerHTML = `${calc.protein} / ${objective.protein ? objective.protein : '?'}`;
    fatText.innerHTML = `${calc.fat} / ${objective.fat ? objective.fat : '?'}`;

}

getStats();
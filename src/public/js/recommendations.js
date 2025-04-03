async function display() {
    const token = localStorage.getItem('token');

    const request = await fetch('/api/recommendations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const meals = await request.json();
    
    const mealContainer = document.getElementById("meal-container");
    
    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.className = "meal bg-white border border-gray-300 rounded-lg p-4 mb-4";
    
        mealDiv.innerHTML = `
            <h3 class="text-lg font-semibold mb-2">${meal.name}</h3>
            <p class="text-gray-700">Differences of Protein: ${meal.proteinDifference}</p>
            <p class="text-gray-700">Differences of Calories: ${meal.caloriesDifference}</p>
            <p class="text-gray-700">Differences of Fat: ${meal.fatDifference}</p>
        `;
    
        mealContainer.appendChild(mealDiv);
    });
}


display();
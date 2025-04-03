async function displayMeals() {
    const mealList = document.getElementById('mealList');
    mealList.innerHTML = '';

    const request = await fetch('/api/meals', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });

    const meals = await request.json();


    meals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.className = 'meal-item p-3 border border-gray-300 mb-2 rounded';

        const mealName = document.createElement('div');
        mealName.textContent = `Meal: ${meal.name}`;
        mealName.className = 'font-bold';

        const mealDetails = document.createElement('div');
        mealDetails.textContent = `Calories: ${meal.calories} Fats: ${meal.fat}g, Proteins: ${meal.protein}g, Date: ${meal.date}`;
        mealDetails.className = 'text-sm text-gray-600';

        mealItem.appendChild(mealName);
        mealItem.appendChild(mealDetails);

        // Append meal item to the list
        mealList.appendChild(mealItem);
    });
}

function openModal() {
    document.getElementById('mealModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('mealModal').classList.add('hidden');
}

async function saveMeal() {
    const name = document.getElementById('mealInput').value.trim();
    const fats = parseFloat(document.getElementById('fatInput').value.trim());
    const proteins = parseFloat(document.getElementById('proteinInput').value.trim());
    const calories = parseFloat(document.getElementById('caloriesInput').value.trim());
    const date = document.getElementById('dateInput').value.trim();

    
    const meal = {
        name: name,
        fat: fats,
        protein: proteins,
        calories: calories,
        date: date
    }

    const token = localStorage.getItem('token');

    const response = await fetch('/api/meals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(meal)
    });
    console.log(response.json());

    displayMeals();
    closeModal();
}

// Initial display of meals
displayMeals();
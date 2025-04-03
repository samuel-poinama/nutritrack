const meals = [
    {
        name: 'Chicken Salad',
        fats: 10,
        proteins: 30,
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Grilled Salmon',
        fats: 15,
        proteins: 25,
        date: new Date().toLocaleDateString()
    }
];

function displayMeals() {
    const mealList = document.getElementById('mealList');
    mealList.innerHTML = '';
    meals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.className = 'meal-item p-3 border border-gray-300 mb-2 rounded';

        const mealName = document.createElement('div');
        mealName.textContent = `Meal: ${meal.name}`;
        mealName.className = 'font-bold';

        const mealDetails = document.createElement('div');
        mealDetails.textContent = `Fats: ${meal.fats}g, Proteins: ${meal.proteins}g, Date: ${meal.date}`;
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

function saveMeal() {
    const name = document.getElementById('mealInput').value.trim();
    const fats = parseFloat(document.getElementById('fatInput').value.trim());
    const proteins = parseFloat(document.getElementById('proteinInput').value.trim());

    const date = document.getElementById('dateInput').value.trim();
    const meal = {
        name: name,
        fats: fats,
        proteins: proteins,
        date: date
    }

    meals.push(meal);
    displayMeals();
    closeModal();
}

// Initial display of meals
displayMeals();
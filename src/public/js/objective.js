document.getElementById('objectiveForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const calories = document.getElementById('calories').value;
    const fat = document.getElementById('fat').value;
    alert(`Objective saved!\nCalories: ${calories} kcal\nFat: ${fat} g`);
});
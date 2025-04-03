

async function getObjective() {    
    const token = localStorage.getItem('token');

    const request = await fetch('/api/goals', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    if (request.status === 200) {
        const response = await request.json();
        document.getElementById('calories').value = response.calories;
        document.getElementById('fat').value = response.fat;
        document.getElementById('proteins').value = response.protein;
    }
    else {
        window.location.href = '/login';
    }
}

getObjective();

async function setObjective() {
    const token = localStorage.getItem('token');

    const calories = document.getElementById('calories').value;
    const fat = document.getElementById('fat').value;
    const protein = document.getElementById('proteins').value;

    const data = { calories, fat, protein };

    const request = await fetch('/api/goals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    });

    if (request.status === 200) {
        await getObjective();
    }
}
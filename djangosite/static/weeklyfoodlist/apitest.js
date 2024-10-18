async function getFoods() {
    const url = 'http://192.168.69.100/api/food/';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        const foodList = document.getElementById('food-list');
        json.forEach(food => {
            const li = document.createElement('li');
            li.textContent = `${food.title} - ${food.description} (Rating: ${food.rating})`;
            foodList.appendChild(li);
        });
    } catch (error) {
        console.error(error.message);
    }
}

window.onload = getFoods;
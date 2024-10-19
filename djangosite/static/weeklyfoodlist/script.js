class FoodLists {
    constructor() {
        this.fish = [];
        this.soups = [];
        this.other = [];
    }

    addFood(food) {     // Method for adding food to the FoodLists attributes (fish list, soups, list, other list) If object.category == 'Fish' it goes to the fish list etc.

            switch (food.category) {
                case 'Fish':
                    this.fish.push(food);
                    break;
                case 'Soup':
                    this.soups.push(food);
                    break;
                default:
                    this.other.push(food);
                    break;
            }
        }

    getFishList() {     // Method for getting the fish list
        return this.fish;
    }

    getSoupList() {     // Method for getting the soups list
        return this.soups;
    }

    getOtherList() {    // Method for getting the other lists
        return this.other;
    }
}

const foodLists = new FoodLists();    // Creates a new FoodLists object

async function getFoods() {     // API call function (Gets called when the frontpage is loaded)
    const url = 'http://192.168.69.100/api/food/';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        json.forEach(food => foodLists.addFood(food));      // Uses addFood() method to add JSON objects to the lists
    } catch (error) {
        console.log(error.message);
    }
}


function random(list, weeksList) {     // A function to return a random object from a list

    const max = 10;     // MAX amount for the while loop to try getting an unique value. This dodges infinite loops from forming
    let attempts = 0;

    while (attempts < max) {

        const chosen = list[Math.floor(Math.random() * list.length)];

        if (!weeksList.includes(chosen)) {      // If the object isn't in the weekslist then add it
            return chosen;
        }

        attempts ++;
    }

    throw new Error('All the possible values have been chosen');
}


function shuffle(array) {   // A function to shuffle the array and return the array
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function refresh() {    // Function to show/refresh the list on the frontpage

    const list = document.getElementById("list");

    let weeksList = [];
    const fish = foodLists.getFishList();
    const soups = foodLists.getSoupList();
    const other = foodLists.getOtherList();

    weeksList.push(random(fish, weeksList));   // Calls the random() function and gives the function the fish list and adds the return value to the weeksList list
    weeksList.push(random(soups, weeksList));  // Calls the random() function and gives the function the soups list and adds the return value to the weeksList list

    for (let i = 2; i < 7; i++) {
        weeksList.push(random(other, weeksList));  // Calls the random() function and gives the function the other list and adds the return value to the weeksList list five times
    }

    weeksList = shuffle(weeksList);     // Calls the shuffle() funtion and gives it the weekslist list


    list.innerHTML = `
    <ul>
      <li>Ma: ${weeksList[0]?.title}</li>
      <li>Ti: ${weeksList[1]?.title}</li>
      <li>Ke: ${weeksList[2]?.title}</li>
      <li>To: ${weeksList[3]?.title}</li>
      <li>Pe: ${weeksList[4]?.title}</li>
      <li>La: ${weeksList[5]?.title}</li>
      <li>Su: ${weeksList[6]?.title}</li>
    </ul>
  `;
}

window.onload = getFoods;   // When the frontpage is loaded this calls the getFoods function to fetch the food data
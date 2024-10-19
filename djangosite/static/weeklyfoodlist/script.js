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


function random(foodlist, weeksList) {     // A function to return a random object from a list

    const max = 10;     // MAX amount for the while loop to try getting an unique value. This dodges infinite loops from forming
    let attempts = 0;

    while (attempts < max) {

        const chosen = foodlist[Math.floor(Math.random() * foodlist.length)];

        if (!weeksList.includes(chosen)) {      // If the object isn't in the weekslist then add it
            return chosen;
        }

        attempts ++;
    }

    throw new Error('All the possible values have been chosen');
}


function shuffle(foodlist) {   // A function to shuffle the array and return the array

    for (let i = foodlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [foodlist[i], foodlist[j]] = [foodlist[j], foodlist[i]];
    }

    return foodlist;
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
      <li id='Mon'>Ma: ${weeksList[0]?.title}</li>
      <li id='Tue'>Ti: ${weeksList[1]?.title}</li>
      <li id='Wed'>Ke: ${weeksList[2]?.title}</li>
      <li id='Thu'>To: ${weeksList[3]?.title}</li>
      <li id='Fri'>Pe: ${weeksList[4]?.title}</li>
      <li id='Sat'>La: ${weeksList[5]?.title}</li>
      <li id='Sun'>Su: ${weeksList[6]?.title}</li>
    </ul>
  `;

    document.getElementById('Mon').addEventListener('click', () => {
        description(weeksList[0]);
    });
    document.getElementById('Tue').addEventListener('click', () => {
        description(weeksList[1]);
    });
    document.getElementById('Wed').addEventListener('click', () => {
        description(weeksList[2]);
    });
    document.getElementById('Thu').addEventListener('click', () => {
        description(weeksList[3]);
    });
    document.getElementById('Fri').addEventListener('click', () => {
        description(weeksList[4]);
    });
    document.getElementById('Sat').addEventListener('click', () => {
        description(weeksList[5]);
    });
    document.getElementById('Sun').addEventListener('click', () => {
        description(weeksList[6]);
    });
}

function description(food) {    // Shows a popup that has the clicked food's description
    
    const popup = document.getElementById('popup');
    const closepopup = document.getElementById('closePopup');
    const popupText = document.getElementById('popup-text');

    popup.classList.add('open');
    popupText.innerText=food.description;
    
    closepopup.addEventListener('click', () => {
        popup.classList.remove('open');
    });
}

window.onload = getFoods;   // When the frontpage is loaded this calls the getFoods function to fetch the food data
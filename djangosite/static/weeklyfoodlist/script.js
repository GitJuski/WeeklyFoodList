class FoodLists {
    constructor() {
        this.fish = [];
        this.soups = [];
        this.other = [];
    }

    addFood(food) {

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

    getFishList() {
        return this.fish;
    }

    getSoupList() {
        return this.soups
    }

    getOtherList() {
        return this.other
    }
}

let foodLists = new FoodLists();

async function getFoods() {
    const url = 'http://192.168.69.100/api/food/';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const json = await response.json();
        json.forEach(food => foodLists.addFood(food));
    } catch (error) {
        console.log(error.message);
    }
}


function random(list) {

    return list[Math.floor(Math.random() * list.length)];
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function refresh() {

    const list = document.getElementById("list");

    let weeksList = [];
    const fish = foodLists.getFishList();
    const soups = foodLists.getSoupList();
    const other = foodLists.getOtherList();

    weeksList.push(random(fish));
    weeksList.push(random(soups));

    for (let i = 2; i < 7; i++) {
        weeksList.push(random(other));
    }

    weeksList = shuffle(weeksList);


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

window.onload = getFoods;
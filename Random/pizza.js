class Pizza {
    constructor(name, price, isVeggie) {
        this.name = name;
        this.price = price;
        this.isVeggie = isVeggie;
    }
}

let pizzas=[];
pizzas.push(new Pizza("Salami", 8.5, false));
pizzas.push(new Pizza("Gemuse", 10.9, true)); 
pizzas.push(new Pizza("Margherita", 9.7, true)); 
pizzas.push(new Pizza("Funghi", 10.7, true));
pizzas.push(new Pizza("Prosciutto", 6.6, false));
pizzas.push(new Pizza("Quattro Formagi", 6.7, true));
console.log("Pizzas:",pizzas); // [Pizza, Pizza, Pizza, Pizza, Pizza, Pizza]

pizzas.reverse();
console.log("Pizzas reversed:",pizzas); // [Pizza, Pizza, Pizza, Pizza, Pizza, Pizza]

pizzas.sort((pizza_a, pizza_b) => (pizza_a.price - pizza_b.price));
console.log("Pizzas sorted:",pizzas); // [Pizza, Pizza, Pizza, Pizza, Pizza, Pizza]

function comparePrice(pizza_a,pizza_b) {
   return pizza_a.price - pizza_b.price;
}
pizzas.sort(comparePrice); //das Gleiche wie Sort oben nur mit einer Funktion
console.log("Pizzas sorted by price:",pizzas); // [Pizza, Pizza, Pizza, Pizza, Pizza, Pizza]

pizzas.sort((pizza_a, pizza_b) => (pizza_a.name.localeCompare(pizza_b.name)));
console.log("Pizzas sorted by name:",pizzas); // [Pizza, Pizza, Pizza, Pizza, Pizza, Pizza]

pizzas.every(pizza => pizza.isVeggie); // false
pizzas.some(pizza => pizza.isVeggie); // true

let veggie=pizzas.filter(pizza => pizza.isVeggie); // [Pizza, Pizza, Pizza]
console.log("Veggie Pizzas:",veggie);


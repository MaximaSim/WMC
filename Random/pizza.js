class Pizza {
    constructor(name, price, isVeggie) {
        this.name = name;
        this.price = price;
        this.isVeggie = isVeggie;
    }
}

let arr=[];
arr.push(new Pizza("Salami", 8.5, false));
arr.push(new Pizza("Gemuse", 10.9, true)); 
arr.push(new Pizza("Margherita", 9.7, true)); 
arr.push(new Pizza("Funghi", 10.7, true));
arr.push(new Pizza("Prosciutto", 6.6, false));
arr.push(new Pizza("Quattro Formagi", 6.7, true));
console.log("Pizzas:",arr); // [Pizza, Pizza, Pizza, Pizza, Pizza, Pizza]

arr.reverse();
console.log("Pizzas reversed:",arr); // [Pizza, Pizza, Pizza, Pizza, Pizza, Pizza]

arr.sort();
console.log("Pizzas sorted:",arr); // [Pizza, Pizza, Pizza, Pizza, Pizza, Pizza]


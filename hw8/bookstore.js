class Book {
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }
}

class User {
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }
}

class Cart {
  constructor(user) {
    this.user = user;
    this.items = new Map();
  }

  addBook(book) {
    if (!book) {
      throw new Error("Incorrect book");
    }

    if (this.items.has(book.title)) {
      this.items.get(book.title).quantity += 1;
    } else {
      this.items.set(book.title, { book, quantity: 1 });
    }
  }

  removeBook(title) {
    if (this.items.has(title)) {
      const entry = this.items.get(title);
      if (entry.quantity > 1) {
        entry.quantity -= 1;
      } else {
        this.items.delete(title);
      }
    } else {
      throw new Error("Book not found in cart");
    }
  }

  getTotalPrice() {
    return Array.from(this.items.values()).reduce((sum, { book, quantity }) => {
      return sum + book.price * quantity;
    }, 0);
  }
}

class Order {
  constructor(user, books) {
    this.user = user;
    this.books = books;
  }

  getTotalPrice() {
    return this.books.reduce((total, { book, quantity }) => {
      return total + book.price * quantity;
    }, 0);
  }
}

// 1: Create Objects
const book1 = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  "123456789",
  11,
  true
);
const book2 = new Book("1984", "George Orwell", "234567890", 9, true);
const book3 = new Book(
  "To Kill a Mockingbird",
  "Harper Lee",
  "345678901",
  12,
  true
);
const book4 = new Book("Sapiens", "Yuval Noah Harari", "456789012", 15, true);

const user1 = new User("Alice", "alice@example.com", "U001");
const user2 = new User("Bob", "bob@example.com", "U002");

// 2: Add Books to Cart
const cart1 = new Cart(user1);
cart1.addBook(book1);
cart1.addBook(book2);
cart1.addBook(book2);
cart1.addBook(book3);

const cart2 = new Cart(user2);
cart2.addBook(book4);
cart2.addBook(book4);

console.log("----- Cart 1 -----");
console.log(cart1);
console.log(
  `Total price for ${cart1.user.name}'s cart: $${cart1
    .getTotalPrice()
    .toFixed(2)}`
);

console.log("----- Cart 2 -----");
console.log(cart2);
console.log(
  `Total price for ${cart2.user.name}'s cart: $${cart2
    .getTotalPrice()
    .toFixed(2)}`
);

// 3: Place Orders
const order1 = new Order(user1, Array.from(cart1.items.values()));
const order2 = new Order(user2, Array.from(cart2.items.values()));

console.log("----- Order 1 -----");
console.log(order1);
console.log(
  `Order total for ${order1.user.name}: $${order1.getTotalPrice().toFixed(2)}`
);

console.log("----- Order 2 -----");
console.log(order2);
console.log(
  `Order total for ${order2.user.name}: $${order2.getTotalPrice().toFixed(2)}`
);

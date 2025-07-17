// ================================
// Part 1: Class Design
// ================================

/**
 * Represents a book.
 * Acts as a base class for Fiction and NonFiction.
 */
class Book {
  /**
   * @param {string} title - Title of the book.
   * @param {string} author - Author of the book.
   * @param {string} isbn - ISBN number.
   * @param {number} price - Price of the book.
   * @param {boolean} availability - Availability in stock.
   */
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }
}

/**
 * Represents a registered user in the system.
 */
class User {
  /**
   * @param {string} name - Full name of the user.
   * @param {string} email - Email address.
   * @param {string} userId - Unique ID.
   */
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }
}

/**
 * Represents a shopping cart associated with a user.
 * Uses a Map to encapsulate cart items and their quantities.
 */
class Cart {
  /**
   * @param {User} user - Owner of the cart.
   */
  constructor(user) {
    this.user = user;
    this.items = new Map(); // key: book title, value: { book, quantity }
  }

  /**
   * Adds a book to the cart.
   * @param {Book} book - Book to add.
   */
  addBook(book) {
    if (!book) {
      throw new Error("Incorrect book");
    }

    if (!book.availability) {
      throw new Error("Book is out of stock");
    }

    if (this.items.has(book.title)) {
      this.items.get(book.title).quantity += 1;
    } else {
      this.items.set(book.title, { book, quantity: 1 });
    }
  }

  /**
   * Removes a book from the cart by title.
   * Decreases quantity or removes entry if quantity = 1.
   * @param {string} title - Book title to remove.
   */
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

  /**
   * Calculates the total price of the cart.
   * @returns {number} Total amount.
   */
  getTotalPrice() {
    return Array.from(this.items.values()).reduce((sum, { book, quantity }) => {
      return sum + book.price * quantity;
    }, 0);
  }
}

/**
 * Represents a finalized order made by a user.
 */
class Order {
  /**
   * @param {User} user - The user placing the order.
   * @param {Array<{book: Book, quantity: number}>} books - Ordered books.
   */
  constructor(user, books) {
    this.user = user;
    this.books = books;
  }

  /**
   * Calculates the total price of the order.
   * @returns {number}
   */
  getTotalPrice() {
    return this.books.reduce((total, { book, quantity }) => {
      return total + book.price * quantity;
    }, 0);
  }
}

// ================================
// Part 2: Implementation
// ================================

// Book Instances
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

// User Instances
const user1 = new User("Alice", "alice@example.com", "U001");
const user2 = new User("Bob", "bob@example.com", "U002");

// Carts
const cart1 = new Cart(user1);
cart1.addBook(book1);
cart1.addBook(book2);
cart1.addBook(book2);
cart1.addBook(book3);

const cart2 = new Cart(user2);
cart2.addBook(book4);
cart2.addBook(book4);

// Carts Summaries
console.log("----- Cart 1 -----");
console.log(cart1);
console.log(
  `Total price for ${cart1.user.name}'s cart: $${cart1.getTotalPrice()}`
);

console.log("----- Cart 2 -----");
console.log(cart2);
console.log(
  `Total price for ${cart2.user.name}'s cart: $${cart2.getTotalPrice()}`
);

// Orders
const order1 = new Order(user1, Array.from(cart1.items.values()));
const order2 = new Order(user2, Array.from(cart2.items.values()));

// Orders Summaries
console.log("----- Order 1 -----");
console.log(order1);
console.log(`Order total for ${order1.user.name}: $${order1.getTotalPrice()}`);

console.log("----- Order 2 -----");
console.log(order2);
console.log(`Order total for ${order2.user.name}: $${order2.getTotalPrice()}`);

// ================================
// Part 3: Demonstration
// ================================

/**
 * Subclass of Book: Fiction type
 */
class Fiction extends Book {
  constructor(title, author, isbn, price, availability, genre) {
    super(title, author, isbn, price, availability);
    this.genre = genre;
  }
}

/**
 * Subclass of Book: NonFiction type
 */
class NonFiction extends Book {
  constructor(title, author, isbn, price, availability, subject) {
    super(title, author, isbn, price, availability);
    this.subject = subject;
  }
}

// Users
const user3 = new User("Emma", "emma@example.com", "U1003");
const user4 = new User("Liam", "liam@example.com", "U1004");

// Polymorphic Book Instances
const fiction1 = new Fiction(
  "Dune",
  "Frank Herbert",
  "9780441013593",
  15,
  true,
  "Sci-Fi"
);
const fiction2 = new Fiction(
  "Pride and Prejudice",
  "Jane Austen",
  "9780141439518",
  10,
  true,
  "Romance"
);

const nonfiction1 = new NonFiction(
  "Educated",
  "Tara Westover",
  "9780399590504",
  13.5,
  true,
  "Memoir"
);
const nonfiction2 = new NonFiction(
  "Brief History of Time",
  "Stephen Hawking",
  "9780553380163",
  16,
  true,
  "Science"
);

// Carts
const cart3 = new Cart(user3);
cart3.addBook(fiction1);
cart3.addBook(nonfiction1);
cart3.addBook(fiction1);

const cart4 = new Cart(user4);
cart4.addBook(fiction2);
cart4.addBook(nonfiction2);

// Carts Summaries
console.log(
  `\nTotal price for ${cart3.user.name}'s cart: $${cart3.getTotalPrice()}`
);
console.log(
  `Total price for ${cart4.user.name}'s cart: $${cart4.getTotalPrice()}`
);

// Orders
const order3 = new Order(user3, Array.from(cart3.items.values()));
const order4 = new Order(user4, Array.from(cart4.items.values()));

// Orders Summaries
console.log(`${order3.user.name} placed an order with the following books:`);
order3.books.forEach(({ book, quantity }) => {
  console.log(`- ${book.title} x${quantity} ($${book.price} each)`);
});
console.log(`Total: $${order3.getTotalPrice()}`);

console.log(`${order4.user.name} placed an order with the following books:`);
order4.books.forEach(({ book, quantity }) => {
  console.log(`- ${book.title} x${quantity} ($${book.price} each)`);
});
console.log(`Total: $${order4.getTotalPrice()}`);

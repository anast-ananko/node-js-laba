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

class Product {
  constructor({ name, price, quantity }) {
    Object.defineProperties(this, {
      name: {
        value: name,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      price: {
        value: price,
        writable: false,
        enumerable: false,
        configurable: true,
      },
      quantity: {
        value: quantity,
        writable: false,
        enumerable: false,
        configurable: true,
      },
    });
  }

  getTotalPrice() {
    const price = Object.getOwnPropertyDescriptor(this, "price").value;
    const quantity = Object.getOwnPropertyDescriptor(this, "quantity").value;

    return price * quantity;
  }

  deleteNonConfigurable(obj, propName) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, propName);

    if (!descriptor) {
      return;
    }

    if (!descriptor.configurable) {
      throw new Error(`Cannot delete non-configurable property '${propName}'`);
    }

    delete obj[propName];
  }
}

const product = new Product({
  name: "Laptop",
  price: 1000,
  quantity: 5,
});

console.log(product.getTotalPrice());

try {
  product.deleteNonConfigurable(product, "name");
} catch (e) {
  console.error(e.message);
}
console.log("Name after delete attempt:", product.name);

product.deleteNonConfigurable(product, "price");
console.log("Price after deleting price:", product.price);

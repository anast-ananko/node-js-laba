function calculateDiscountedPrice(array, discount) {
  if (!Array.isArray(array)) {
    throw new TypeError("The first argument must be an array.");
  }

  if (typeof discount !== "number" || discount < 0 || discount > 100) {
    throw new RangeError("Discount must be a number between 0 and 100.");
  }

  return array.map((item) => {
    return {
      ...item,
      price: item.price - item.price * (discount / 100),
    };
  });
}

function calculateTotalPrice(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("The argument must be an array.");
  }

  return array.reduce((acc, item) => acc + item.price, 0);
}

const products = [
  { name: "Shirt", price: 100 },
  { name: "Shoes", price: 200 },
  { name: "Hat", price: 50 },
];

const discountedProducts = calculateDiscountedPrice(products, 20);
console.log(discountedProducts);

const totalPrice = calculateTotalPrice(products);
console.log(totalPrice);

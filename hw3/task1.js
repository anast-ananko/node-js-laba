function calculateDiscountedPrice(array, discount) {
  return array.map((item) => {
    return {
      ...item,
      price: item.price - item.price * (discount / 100),
    };
  });
}

function calculateTotalPrice(array) {
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

const addToCart = (product, selectedSize = null) => {
  if (!selectedSize) {
    alert('Please select a size');
    return;
  }

  const existingCart = JSON.parse(localStorage.getItem('userCart')) || [];

  const existingItem = existingCart.find(
    (item) => item.id === product.id && item.size === selectedSize
  );

  let updatedCart;

  if (existingItem) {
    updatedCart = existingCart.map((item) =>
      item.id === product.id && item.size === selectedSize
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [
      ...existingCart,
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: selectedSize,
        quantity: 1,
      },
    ];
  }

  localStorage.setItem('userCart', JSON.stringify(updatedCart));
  alert('✅ Product added to cart');
};

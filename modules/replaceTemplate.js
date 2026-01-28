module.exports = (temp, product) => {
  let output = temp.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(
    /{%NOT_ORGANIC%}/g,
    product.organic ? "" : "not-organic"
  );
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);

  // product only
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);

  return output;
};

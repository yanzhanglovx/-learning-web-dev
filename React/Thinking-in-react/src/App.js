import { useState } from 'react'

function FilterableProductTable({ PRODUCTS }) {
  const [ifCheck, setIfCheck] = useState(false);
  const [textContent, setTextContent] = useState('');
  console.log(ifCheck);
  return (
    <>
      <SearchBar ifCheck={ifCheck} setIfCheck={setIfCheck} textContent={textContent} setTextContent={setTextContent} />
      <ProductTable PRODUCTS={PRODUCTS} ifCheck={ifCheck} textContent={textContent} />
    </>
  );
}

function SearchBar({ ifCheck, setIfCheck, textContent, setTextContent }) {

  return (
    <div>
      <label><input type="text" placeholder='Search for food...' value={textContent} onChange={e => setTextContent(e.target.value)} /></label>
      <label> Only show products in stock<input type="checkbox" checked={ifCheck} onChange={e => setIfCheck(e.target.checked)} /></label>
    </div>
  );
}

function ProductTable({ PRODUCTS, ifCheck, textContent }) {
  let category = PRODUCTS[0].category;
  let product = "";
  let raw = [];
  raw.push(<ProductCategoryRow category={category} />);

  PRODUCTS.forEach((item) => {
    if (category != item.category) {
      raw.push(
        < ProductCategoryRow category={item.category} />
      );
      category = item.category;
    }
    product = item;
    raw.push(
      <ProductRow product={product} ifCheck={ifCheck} textContent={textContent} />
    );
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {raw}
        </tbody>

      </table>
    </>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  )
}

function ProductRow({ product, ifCheck, textContent }) {
  let name;
  let status = product.name.toLowerCase().startsWith(textContent.toLowerCase());

  if (!status) {
    return;
  }
  if (!ifCheck) {
    name = product.stocked ? <><td>{product.name}</td><td>{product.price}</td></> : <><td style={{ color: 'red' }}>{product.name}</td><td>{product.price}</td></>
  }
  else {
    name = product.stocked ? <><td>{product.name}</td><td>{product.price}</td></> : null
  }
  return (
    <>
      <tr>
        {name}
      </tr>
    </>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable PRODUCTS={PRODUCTS} />;
}

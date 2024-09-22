import {useState} from "react";

export default function App(){

  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );

}

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function Logo(){
  return <h1>🌴 Far Away ✈️</h1>
}

function Form({handleAddItems}){
  
  const [description , setDescription] = useState("");
  const [quantity , setQuantity] = useState(1)

  function handleSubmit(e){
    e.preventDefault();
    if(!description)return;
    const newItem ={description:description,quantity:quantity,packed:false ,id:Date.now()}
    handleAddItems(newItem)

    setDescription("")
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e)=>setDescription(e.target.value)} />
      <button>Add Item</button>
    </form>
  );
}
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({item}){
  return (
    <li>
      <span style={item.packed ? {textDecoration:"line-through"}: {}}>{item.quantity} {item.description}</span>
      <button>❌</button>
    </li>
  );
}
function Stats(){
  return <footer className="stats"><em>You have X item on your list, and you already packed X (X%)</em></footer>
}
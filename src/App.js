import {useState} from "react";

export default function App(){

  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(item){
    setItems((items)=>(items.filter((i)=>i.id!==item.id)));
  }

  function handleUpdatePacked(item){
    setItems((items)=>(items.map((i)=>(i.id===item.id ? {...i , packed:!i.packed}:i))))
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItems={handleDeleteItems}
        handleUpdatePacked={handleUpdatePacked}
      />
      <Stats items={items} />
    </div>
  );

}

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
function PackingList({ items, handleDeleteItems, handleUpdatePacked }) {

  const [sortBy , setSortBy] = useState("input")
  let sortedItems;

  if(sortBy==="input") sortedItems = items
  if(sortBy==="description") sortedItems = items.slice().sort((a,b)=>a.description.localeCompare(b.description));
  if(sortBy==="packed") sortedItems = items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed));


  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            handleDeleteItems={handleDeleteItems}
            handleUpdatePacked={handleUpdatePacked}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description </option>
          <option value="packed">Sort by Packed Status </option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, handleDeleteItems, handleUpdatePacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleUpdatePacked(item)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItems(item)}>❌</button>
    </li>
  );
}

function Stats({items}){
  const totalItems = items.length;
  const packedItems = (items.filter((item)=>item.packed===true)).length;
  const percentage = totalItems !== 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        {percentage===100.00? 'You got everything! ready to go ✈️':`You have ${totalItems} item on your list, and you
        already packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
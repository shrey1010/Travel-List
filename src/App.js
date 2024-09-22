import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(item) {
    setItems((items) => items.filter((i) => i.id !== item.id));
  }

  function handleUpdatePacked(item) {
    setItems((items) =>
      items.map((i) => (i.id === item.id ? { ...i, packed: !i.packed } : i))
    );
  }

  function deleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure? you want to delete all items"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItems={handleDeleteItems}
        handleUpdatePacked={handleUpdatePacked}
        deleteAllItems={deleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

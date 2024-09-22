export function Item({ item, handleDeleteItems, handleUpdatePacked }) {
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

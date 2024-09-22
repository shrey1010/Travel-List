export function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentage =
    totalItems !== 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        {percentage === 100.0
          ? "You got everything! ready to go ✈️"
          : `You have ${totalItems} item on your list, and you
        already packed ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}



interface Props {
  items: string[];
  selected: Set<number>;
  onSelect: (index: number) => void;
  onDoubleClickDelete: (index: number) => void;
}

const ItemList: React.FC<Props> = ({ items, selected, onSelect, onDoubleClickDelete }) => (
  <ul role="listbox" className="item-list">
    {items.map((item, i) => (
      <li
        key={i}
        className={selected.has(i) ? 'selected' : ''}
        onClick={() => onSelect(i)}
        onDoubleClick={() => onDoubleClickDelete(i)}
        role="option"
      >
        {item}
      </li>
    ))}
  </ul>
);

export default ItemList;

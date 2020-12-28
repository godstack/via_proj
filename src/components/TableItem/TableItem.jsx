import React, { memo } from 'react';
import { formatRelative } from 'date-fns';
import { Item, Column } from './TableItem.styled';

const TableItem = ({ item, setSelectedItem, selectedItem, onKeyPress }) => {
  const { time, color, name, comment, id } = item;

  return (
    <Item
      // onMouseOver={() => setSelectedItem(item)}
      // onMouseLeave={() => setSelectedItem(null)}
      onClick={() => {
        if (selectedItem) {
          setSelectedItem(null);
        } else {
          setSelectedItem(item);
        }
      }}
    >
      <Column>
        <input
          type='text'
          defaultValue={name}
          onKeyPress={e => onKeyPress(e, 'name', id)}
        />
      </Column>
      <Column>
        <input
          type='text'
          defaultValue={color}
          onKeyPress={e => onKeyPress(e, 'color', id)}
        />
      </Column>
      <Column>{formatRelative(time, new Date())}</Column>
      <Column>
        <input
          type='text'
          defaultValue={comment}
          onKeyPress={e => onKeyPress(e, 'comment', id)}
        />
      </Column>
    </Item>
  );
};

export const MemoizedTableItem = memo(TableItem);

export default MemoizedTableItem;

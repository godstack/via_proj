import React, { memo } from 'react';
import { formatRelative } from 'date-fns';
import { Item, Column } from './TableItem.styled';

const TableItem = ({ item, setSelectedItem, selectedItem }) => {
  const { time, color, name, comment } = item;

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
      <Column>{name}</Column>
      <Column>{color}</Column>
      <Column>{formatRelative(time, new Date())}</Column>
      <Column>{comment ? comment : 'No comment'}</Column>
    </Item>
  );
};

export const MemoizedTableItem = memo(TableItem);

export default MemoizedTableItem;

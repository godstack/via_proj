import styled from 'styled-components';

export const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 20px;
  background-color: #ebf0f2;
  border: solid 1px #dce5e8;

  &:hover {
    cursor: pointer;
    background-color: #96d9b3;
  }
`;

export const Column = styled.div`
  padding: 5px;
  white-space: pre-wrap;
`;

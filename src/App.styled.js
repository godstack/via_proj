import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const StyledTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TableContent = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  height: 500px;
`;

export const TableHead = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 20px;
  background-color: #ebf0f2;
  border: solid 1px #dce5e8;
  font-size: 1.5rem;
`;

export const StyledLoading = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-decoration: underline;
`;

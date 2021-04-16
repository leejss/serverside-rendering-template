import React from "react";
import styled from "styled-components";

const RedBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RedBox = styled.div`
  height: 300px;
  width: 300px;
  background-color: red;
`;

const Red = () => {
  return (
    <RedBlock>
      <RedBox />
    </RedBlock>
  );
};

export default Red;

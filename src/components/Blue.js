import React from "react";
import styled from "styled-components";

const BlueBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BlueBox = styled.div`
  height: 300px;
  width: 300px;
  background-color: blue;
`;

const Blue = () => {
  return (
    <BlueBlock>
      <BlueBox />
    </BlueBlock>
  );
};

export default Blue;

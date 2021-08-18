import React from 'react';
import styled from 'styled-components';

import './style.css';

const PageWrapper = ({ children }) => {
  return (
    <Wrapper>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      {children}
    </Wrapper>
  )
}

export default PageWrapper;

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  position: relative;
`

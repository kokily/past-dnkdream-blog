import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import oc from 'open-color';
import { mobile } from '../../lib/style';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
    background: ${oc.gray[4]};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  .areas {
    height: calc(100vh - 4rem);
    display: flex;
    position: relative;
    .area {
      display: flex;
      min-width: 0;
      overflow: auto;
    }
    .divide {
      height: 100%;
      position: absolute;
      transform: translate(-50%);
      cursor: col-resize;
      background: silver;
    }
    ${mobile`
      .content {
        flex: 1!important;
      }
      .preview, .divide {
        display: none;
      }
    `}
  }
`;

const WriteTemplate = ({ header, content, preview }) => {
  const [leftRatio, setLeftRatio] = useState(0.5);

  const leftLand = {
    flex: leftRatio,
  };

  const rightLand = {
    flex: 1 - leftRatio,
  };

  const divideLand = {
    left: `${leftRatio * 100}%`,
  };

  const onMouseMove = e => {
    setLeftRatio(e.clientX / window.innerWidth);
  };

  const onMouseUp = e => {
    document.body.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const onDivideMouseDown = e => {
    document.body.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        {header}
        <div className="areas">
          <div className="area content" style={leftLand}>
            {content}
          </div>
          <div className="area preview" style={rightLand}>
            {preview}
          </div>
          <div className="divide" style={divideLand} onMouseDown={onDivideMouseDown} />
        </div>
      </Container>
    </>
  );
};

export default WriteTemplate;

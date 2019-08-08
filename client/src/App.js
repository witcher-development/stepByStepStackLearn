import React, { Component } from 'react';
import styled from 'styled-components';

import Menu from './components/Menu';

const AppWrapper = styled.div`
  position:relative;
  
  padding-top: 50px;
`;

const StyledMenu = styled(Menu)`
  width: 100%;
  height: 50px;
  
  position:fixed;
  top: 0;
  left: 0;
`;

class App extends Component {

  constructor(props) {
    super(props);

    this.theme = 'light';
    this.taskList = [];
  }

  render() {
    const { theme, taskList } = this;

    return (
      <AppWrapper>
        <StyledMenu theme={theme}/>
      </AppWrapper>
    );
  }
}

export default App;

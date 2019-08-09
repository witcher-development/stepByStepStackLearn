import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import lightTheme from './themes/light';
import darkTheme from './themes/dark';

import Menu from './components/Menu';

const AppWrapper = styled.div`
  position:relative;
  
  padding-top: 50px;
  
  background-color: ${props => props.theme.content.backgroundColor};
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

    this.state = {
      isDarkMode: false,
      taskList: [],
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001');
    const tasks = await response.json();

    this.setState({
      taskList: tasks,
    });

    setTimeout(() => {
      this.setState({
        isDarkMode: true,
      });
    }, 5000);
  }

  render() {
    const { isDarkMode, taskList } = this.state;

    return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <AppWrapper>
          <StyledMenu />
          {taskList && taskList.map(t => <p>{t.name}</p>)}
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;

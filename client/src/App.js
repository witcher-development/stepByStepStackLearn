import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import lightTheme from './themes/light';
import darkTheme from './themes/dark';

import Menu from './components/Menu';
import Content from './components/Content';

const AppWrapper = styled.div`
  height: 100%;
  
  padding-top: 50px;
  
  color: ${props => props.theme.content.textColor};
  background-color: ${props => props.theme.content.backgroundColor};
  
  position:relative;
`;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      taskList: [],
    }
  }

  async componentDidMount() {
    const theme = localStorage.getItem('theme');
    theme && this.setState({ theme });

    const response = await fetch('http://localhost:3001');
    const tasks = await response.json();

    this.setState({
      taskList: tasks,
    });
  }

  toggleTheme() {
    const { theme } = this.state;

    let newTheme = '';
    if (theme === 'light') newTheme = 'dark';
    if (theme === 'dark') newTheme = 'light';

    localStorage.setItem('theme', newTheme);
    this.setState({
      theme: newTheme
    });
  }

  render() {
    const { theme, taskList } = this.state;

    return (
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <AppWrapper>

          <Menu toggleTheme={() => this.toggleTheme()} theme={theme} />

          <Content taskList={taskList} />

        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;

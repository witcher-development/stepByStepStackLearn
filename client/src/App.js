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
    }
  }

  async componentDidMount() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setState({ theme });
    }
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
    const { theme } = this.state;

    return (
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <AppWrapper>

          <Menu toggleTheme={() => this.toggleTheme()} theme={theme} />

          <Content />

        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;

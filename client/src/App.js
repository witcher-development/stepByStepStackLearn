import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import lightTheme from './themes/light';
import darkTheme from './themes/dark';

import Menu from './components/Menu';
import Content from './components/Content';
import { setTheme } from './store/actions';

const AppWrapper = styled.div`
  height: 100%;
  
  padding-top: 50px;
  
  color: ${props => props.theme.content.textColor};
  background-color: ${props => props.theme.content.backgroundColor};
  
  position:relative;
`;

class App extends Component {
  componentDidMount() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.props.dispatch(setTheme(theme));
    }
  }

  render() {
    const { theme } = this.props;

    return (
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <AppWrapper>

          <Menu />

          <Content />

        </AppWrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
};

const mapDispatchToProps = { setTheme };

export default connect(mapStateToProps)(App);

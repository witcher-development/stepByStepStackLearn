import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.var = 'start';
  }

  render() {
    return (
      <div className="App">
        { this.var }
      </div>
    );
  }
}

export default App;

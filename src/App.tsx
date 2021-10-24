import logo from './logo.png';
import Container from './Container';

import './main.scss';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h5>
          Conway's game of life
        </h5>
      </header>
      <Container />
    </div>
  );
}

export default App;

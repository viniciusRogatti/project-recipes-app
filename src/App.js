import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './pages/Login';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE 2.0</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      {/* <Login /> */}
      <SearchBar />
    </div>
  );
}

export default App;

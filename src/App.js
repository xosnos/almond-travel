import './App.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Header } from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <Router>
      </Router>
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {  Route, BrowserRouter } from 'react-router-dom';
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import TodoInput from './components/todoInput/TodoInput';
import TodoList from './components/todoList/TodoList'
function App() {

 
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/SignUp"  component={SignUp} />
        <Route path="/TodoList"  component={TodoList} />
        
      </BrowserRouter>
     
    </div>
  );
}

export default App;

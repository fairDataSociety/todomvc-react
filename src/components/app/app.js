import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLoad } from '../../store/actions/todo';
import { TodoLocal } from '../../services/todo-local';
import { Header } from '../header/header';
import { List } from '../list/list';
import { Footer } from '../footer/footer';
import { CopyRight } from '../copy-right/copy-right';
import LoginForm from '../login/login';
import UserContext from '../../context/UserContext';

export function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const logout = () => {
    setIsLoggedIn(false)
    setUser('');
  }
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    dispatch(onLoad(TodoLocal.loadTodos()));
  }, [dispatch]);

  useEffect(() => {
    TodoLocal.storeTodos(todos);
  }, [todos]);

  return (
    <UserContext.Provider value={{isLoggedIn: isLoggedIn, user: user, setUser: setUser, setIsLoggedIn: setIsLoggedIn}}>
    <div id="app">
      <div className="login-form">
        <div style={{display: 'flex',justifyContent: 'flex-end'}}>
          {
            isLoggedIn ? (<>
              <p>{user}</p>
              <input
                type="button"
                value="Logout"
                onClick={logout}
              />
              </>) : (
              <input
                type="button"
                value="Login"
                onClick={togglePopup}
              />
            )
          }
        </div>
      </div>
      <section className="todoapp">
        <Header />
        {!!todos.length && <List />}
        {!!todos.length && <Footer />}
      </section>
      <CopyRight />
      {isOpen && <LoginForm handleClose={togglePopup}/>}
    </div>
    </UserContext.Provider>
  );
}

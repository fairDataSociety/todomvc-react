import { useContext, useState } from 'react';

import UserContext from '../../context/UserContext';
import classes from '../inputs/Popup/Popup.module.css';
import '../inputs/Login/Login.module.css';

const LoginForm = ({handleClose}) => {
  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];


  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const { clearPodContext } = useContext(PodContext);
  // Generate JSX code for error message
  const renderErrorMessage = name =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  
  const handleSubmit = event => {
    // Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find(user => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsLoggedIn(true);
        setUser(uname.value);
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
    return false;
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  )

  return (
    <div className={`${classes.popupBox}`}>
      <div className={`${classes.box}`}>
        <span className={`${classes.closeIcon}`} onClick={handleClose}>x</span>
          <div className="w-98 mt-12">
            {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
          </div>
      </div>
    </div>
  );
};

export default LoginForm;

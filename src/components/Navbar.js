import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useTheme } from '../hooks/useTheme';
import { useUserContext } from '../hooks/useUserContext';
import { Theme } from '../svg';

const Navbar = () => {
  const { user } = useUserContext();
  const { toggleTheme } = useTheme();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  function handleTheme() {
    toggleTheme();
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>UserTheme</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleTheme} className="theme-button">
              {<Theme />}
            </button>
            {user?.token && (
              <>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </>
            )}
            {!user?.token && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

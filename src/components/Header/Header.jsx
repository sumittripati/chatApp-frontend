import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/contextapi";

const Header = () => {

  const { islogin, setIslogin, logOut } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    // setIslogin(false);
    navigate("/login");
  };

  const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    backgroundColor: "#0f172a",
    color: "#fff",
    alignItems: "center",
  },
  logo: {
    margin: 0,
  },
  ul: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    margin: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  btn: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    cursor: "pointer",
  },
};


  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>MyApp</h2>

      <nav>
        <ul style={styles.ul}>
          <li>
            <NavLink to="/" style={styles.link}>Home</NavLink>
          </li>

          {/* 🔐 Protected link */}
          {islogin && (
            <li>
              <NavLink to="/service" style={styles.link}>Service</NavLink>
            </li>
          )}

          {!islogin ? (
            <>
              <li>
                <NavLink to="/login" style={styles.link}>Login</NavLink>
              </li>
              <li>
                <NavLink to="/register" style={styles.link}>Register</NavLink>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} style={styles.btn}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

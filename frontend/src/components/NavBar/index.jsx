import "./styles.css";

function NavBar(props) {
    const handleSignout = () => {
        // Implement your sign out logic here
        props.logout();
      };
    
   return (<nav className="main-header">
    <h1>TaskHub</h1>
    <button className="signout-button" onClick={handleSignout}>Sign Out</button>
  </nav>);
}

export default NavBar;
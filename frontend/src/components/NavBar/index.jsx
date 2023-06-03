import "./styles.css";

function NavBar(props) {
    const handleSignout = () => {
        // Implement your sign out logic here
        props.logout();
      };
    
   return (<nav className="main-header">
    <div className="left-container">
      <h1>TaskHub</h1>
      <div className="link-container">
        <a href="/all-group">Groups</a>
        <a href="/">Profile</a>      
      </div>
    </div>
    {props.user && <button className="signout-button" onClick={handleSignout}>Sign Out</button>}
  </nav>);
}

export default NavBar;
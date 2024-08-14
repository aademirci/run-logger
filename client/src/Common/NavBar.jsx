
const NavBar = () => {
  return (
    <nav className="nav-bar">
        <h1>RunLogger</h1>
        <ul className="nav-menu">
            <li>Leaderboard</li>
            <li>Search</li>
            <li><button>Log run</button></li>
            <li>Profile</li>
        </ul>
    </nav>
  )
}

export default NavBar
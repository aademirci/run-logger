/* eslint-disable react/prop-types */


const Sidebar = ({ user }) => {
    return (
        <aside className="sidebar">
            <div className="profile-pic">Profile pic</div>
            <ul>
                {user.fullName && <li>{user.fullName}</li>}
                <li>@{user.userName}</li>
                {user.height && <li>{user.height}cm</li>}
                {user.weight && <li>{user.weight}kg</li>}
                {user.shoesBrand && <li>{user.shoesBrand} {user.shoesModel && `(${user.shoesModel})`}</li>}
                <li>Total run: {user.totalRun}km</li>
            </ul>
            
        </aside>
    )
}

export default Sidebar
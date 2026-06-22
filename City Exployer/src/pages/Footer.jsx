import { NavLink } from "react-router-dom";

const Footer = () => {
    const navItems = [
        { to: "/Places", label: "Places", icon: "Pin" },
        { to: "/Activities", label: "Events", icon: "Date" },
        { to: "/Weather", label: "Weather", icon: "Sun" },
        { to: "/Settings", label: "Settings", icon: "Set" },
    ];

    return (
        <footer className="app-footer">
            <nav className="footer-container" aria-label="Main navigation">
                {navItems.map((item) => (
                    <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                            isActive ? "footer-btn active" : "footer-btn"
                        }
                        key={item.to}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </footer>
    );

}; 

export default Footer;

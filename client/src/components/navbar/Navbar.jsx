import { Link } from "react-router-dom";
import './Navbar.css';
import { Component } from "react";


class Navbar extends Component {
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }
    render() {
        return (
            <div className='header'>
                <div className="logo"><Link to="/home">Nice H&R</Link></div>
                <div id='navbar' className={this.state.clicked ? "#navbar active": "navbar"}>
                    <li><Link to="/home">Hotel</Link></li>
                    <li><Link to="/rooms-page">Rooms</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/about">About and Contact</Link></li>
                    <li><Link to="/feedback">Feedback</Link></li>
                    <li><Link to="/log">Login</Link></li>
                    <Link to="/book" className="action-btn">Book Now</Link>
                </div>
                <div className="dropdown-menu" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </div>
        );
    }
};


export default Navbar;

import React,{useState} from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {

    const [active,setActive] = useState('Streamer');

    return (
        <div className="ui secondary pointing menu">
            <Link onClick={()=>setActive('Streamer')} to="/" className={`item ${active === 'Streamer'?'active':''}`}>
                <img src="../streamerLogo" alt="logo" />
            </Link>
            <Link onClick={()=>setActive('All Stream')} to="/" className={`item ${active === 'All Stream'?'active':''}`}>
                All Stream
            </Link>
            <div className="right menu">
                <div className="item">
                    <div className="ui icon input disabled">
                        <input type="text" placeholder="Search..." data-ms-editor="true"/>
                        <i className="search link icon"></i>
                    </div>
                </div>
                <GoogleAuth />
            </div>
        </div>
    );
};

export default Header;
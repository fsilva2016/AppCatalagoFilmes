import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { GoSearch } from "react-icons/go";
import { BiCameraMovie } from "react-icons/bi";

import './Navbar.css'
export default function Navbar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search)
        if(!search) return;

        navigate(`/search?q=${search}`);
        setSearch("");
    }

    return (
        <nav id="navbar">
            <h2>
                <Link to="/"className='linkHome'> <BiCameraMovie /> Home </Link>
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="" placeholder='Busque um filme' onChange={(e) => setSearch(e.target.value)} />
                <button type="submit">
                    <GoSearch />
                </button>
            </form>
        </nav>
    )
}

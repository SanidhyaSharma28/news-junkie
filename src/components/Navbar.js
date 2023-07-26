import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const Navbar = (props) => {




  const [SearchInput, setSearchInput] = useState('')

  const HandleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const HandleSubmit = (e) => {
    e.preventDefault();
    props.onsearch(SearchInput);

  }


  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top bg-${props.mode} navbar-${props.mode}`}>
        <div className="container-fluid"  >
          <Link className="navbar-brand" to="/">News Junkie</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/home">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            <div className="form-check d-flex form-switch mx-4">
              <input className="form-check-input  " type="checkbox" id="flexSwitchCheckDefault" onClick={props.togglemode}/>
                <label className="form-check-label " htmlFor="flexSwitchCheckDefault" style={{color:props.mode==='dark'?'white':'black'}}>Enable {capitalizeFirstLetter(props.mode==='light'?'dark':'light')}Mode</label>
            </div>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={HandleInputChange} />
              <button className="btn btn-outline-primary" type="submit" onClick={HandleSubmit}>Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )

}

export default Navbar

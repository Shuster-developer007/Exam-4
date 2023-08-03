import React from 'react'

const Header = () => {
    return (
        <header className='py-4 header'>
            <nav className="container gap-5 d-flex align-items-center justify-content-between ">
                <div className="user d-flex gap-3 align-items-center">
                    <img src="" alt="" />
                    <h5>Timur</h5>
                </div>
                <div className='d-flex align-items-center w-100 gap-3'>
                    <input type="text" className='form-control' />
                    <button className="btn btn-success">Search</button>
                </div>
                <i className="fa-solid fa-message text-primary fs-4"></i>
            </nav>
        </header>
    )
}

export default Header

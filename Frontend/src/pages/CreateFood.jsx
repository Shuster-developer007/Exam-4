import React, { useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const CreateFood = () => {
    const [use, setus] = useState()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    if (!token) {
        navigate("/login")
    }

    let Restaurants = gql`
    query Query {
        restaurant {
          _id
          res_name
          file
          created_at
        }
    }`;

    const { loading, error, data } = useQuery(Restaurants);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className=''>
            <Header />
            <div className='urab'>
                <div className='container-fluid  d-flex'>
                    <section className='sidebar'>
                        <div className="container">
                            <div className="gop d-flex gap-2 flex-column py-4 px-3">
                                <Link to='/admin-panel' className='text-decoration-none text-dark'>
                                    <div className="ul  d-flex align-items-center gap-4">
                                        <i className="fa-solid fa-check"></i>
                                        <p>Order Tasdiqlash</p>
                                    </div>
                                </Link>
                                <Link to='/create_restaurant' className='text-decoration-none text-dark'>
                                    <div className="ul  d-flex align-items-center gap-4">
                                        <i className="fa-solid fa-plus"></i>
                                        <p>Create Restaurant</p>
                                    </div>
                                </Link>
                                <Link to='/create-food' className='text-decoration-none text-dark'>
                                    <div className="ul d-flex align-items-center gap-4">
                                        <i className="fa-solid fa-plus"></i>
                                        <p>Create Food</p>
                                    </div>
                                </Link>
                                <Link to="/restaurant/update" className='text-decoration-none text-dark'>
                                    <div className="ul d-flex align-items-center gap-4">
                                        <i className="fa-solid fa-pen-nib"></i>
                                        <p>Update Restaurant</p>
                                    </div>
                                </Link>
                                <Link to='/food' className='text-decoration-none text-dark'>
                                    <div className="ul d-flex align-items-center gap-4">
                                        <i className="fa-solid fa-pen-nib"></i>
                                        <p>Update Food</p>
                                    </div>
                                </Link>
                                <Link to="/restaurant/delete" className='text-decoration-none text-dark'>
                                    <div className="ul d-flex align-items-center gap-4">
                                        <i className="fa-solid fa-delete-left"></i>
                                        <p>Deleted Restaurant</p>
                                    </div>
                                </Link>
                                <Link to='/delete-food' className='text-decoration-none text-dark'>
                                    <div className="ul d-flex align-items-center gap-4">
                                        <i className="fa-solid fa-delete-left"></i>
                                        <p>Deleted Food</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <h3 className='ko text-danger py-2'>Create Food</h3>

                            <div className="divb d-flex flex-wrap gap-4">
                                {data.restaurant.map((item) => (
                                    <div key={item._id} className="cardb d-flex">
                                        <div className='rasm'>
                                            <img src={`http://localhost:4000/${item.file}`} alt="" />
                                        </div>
                                        <div className='lol'>
                                            <h3>{item.res_name}</h3>
                                            <p>Lorem ipsum dolor sit amet consectet</p>
                                            <p>{(item.created_at).slice(8, 25)}</p>

                                            <div className='chisiz'></div>
                                            <div className='d-flex align-items-center justify-content-between mt-4'>
                                                <div>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                </div>
                                                <Link to={`/create/food/inputs/${item._id}`} >
                                                    <button className="btn btn-danger">
                                                        Make category food
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default CreateFood

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

const DeleteFoodPage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    if (!token) {
        navigate("/login")
    }
    let Foods = gql`
		query Query {
            foodAll {
                _id
                food_name
                food_price
                food_image
                res_id {
                res_name
                }
            }
        }`;
    const DeleteFood = gql`
        mutation CreateFood($deletedFoodId: ID) {
            deletedFood(id: $deletedFoodId)
        }`;

    const [deletedFood] = useMutation(DeleteFood);

    const { loading, error, data } = useQuery(Foods);
    if (loading) return "Loading"

    const handleDeleteFood = async (id) => {
        try {
            const { data } = await deletedFood({
                variables: { deletedFoodId: id },
                context: {
                    headers: {
                        authorization: `${token}`,
                    },
                },
            });
            if (data) {
                toast("Success deleted Food", { type: "success" })
            }
        } catch (error) {
            toast(error.message, { type: "error" })
        }
    }

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
                                <Link to='/delete/food' className='text-decoration-none text-dark'>
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
                            <h3 className='text-danger py-2 ko'>Deleted Food</h3>
                            <div className="updatediv d-flex flex-wrap gap-4">
                                {data.foodAll.length == 0 ? (<h4>No Foods</h4>) : (data.foodAll?.map((item) => (
                                    <div key={item._id} className="cardb d-flex">
                                        <div className='rasm'>
                                            <img src={`http://localhost:4000/${item.food_image}`} alt="" />
                                        </div>
                                        <div className='lol'>
                                            <h3>{item.food_name}</h3>
                                            <p>Lorem ipsum dolor sit amet consectet</p>
                                            <p>Price: {item.food_price} so'm</p>
                                            <h6>Category: {item.res_id?.map((item) => (
                                                item.res_name
                                            ))}</h6>
                                            <div className='chisiz'></div>
                                            <div className='d-flex align-items-center justify-content-between mt-4'>
                                                <div>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                    <i className="fa-solid fa-star text-warning"></i>
                                                </div>
                                                <Link>
                                                    <button onClick={() => handleDeleteFood(item._id)} className='btn btn-danger'>
                                                        Deleted Food
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                )))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default DeleteFoodPage

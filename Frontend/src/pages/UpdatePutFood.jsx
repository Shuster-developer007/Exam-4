import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import "../styles/UpdateFood.css"
import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

const UpdatePutFood = () => {
    const [id_food, setIDFood] = useState()
    const foodNameRef = useRef()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    if (!token) {
        navigate("/login")
    }
    const food_update = gql`
                mutation UpdateFood($foodName: String!, $updateFoodId: ID) {
                    updateFood(food_name: $foodName, id: $updateFoodId)
                }
            `;

    const [updateFood] = useMutation(food_update);
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

    const { loading, error, data } = useQuery(Foods);
    if (loading) return 'Loading...';



    const submitUpdate_food = async (e) => {
        e.preventDefault()

        const food_name = foodNameRef.current.value
        const { data } = await updateFood({
            variables: { foodName: food_name, updateFoodId: id_food },
            context: {
                headers: {
                    authorization: `${token}`,
                },
            },
        });
        if (data) {
            toast("Success Updated Food", { type: "success" })
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
                                <Link to="/create-food" className='text-decoration-none text-dark'>
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
                            <h3 className='text-danger py-2 ko'>Updated Food</h3>
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
                                                    <button onClick={() => setIDFood(item._id)} className='btn btn-danger' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >
                                                        Update Food
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                )))}
                            </div>
                        </div>
                    </section>
                    <div className="offcanvas offcanvas-end bg-dark" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title text-white" id="offcanvasRightLabel">Offcanvas right</h5>
                            <button type="button" className="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <form action="" onSubmit={submitUpdate_food} >
                                <label className='text-white mt-2' htmlFor="res_name">Food Name</label>
                                <input type="text" ref={foodNameRef} className='form-control mt-1' name='food_name' id='food_name' />
                                <button className='btn btn-danger mt-5 w-100'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePutFood

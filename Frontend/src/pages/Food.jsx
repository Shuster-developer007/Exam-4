import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation, gql, useQuery } from "@apollo/client"
import Typewriter from "typewriter-effect";

import Header from '../components/Header'
import "../styles/Food.css"
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

const Food = () => {
    const [count, setCount] = useState(1);
    const [foodid, setId] = useState()
    const usernameRef = useRef()
    const phoneRef = useRef()

    const CreateOrder = gql`
    mutation Mutation($username: String!, $phone: String!, $count: String!, $foodId: ID) {
        createOrder(username: $username, phone: $phone, count: $count, foodId: $foodId) {
            success
            message
            data {
                _id
                username
                phone
                count
                tasdiqlanish
            }
        }
    }`;

    const [createOrder] = useMutation(CreateOrder);



    const handleOrderSubmit = async (id) => {
        try {
            setId(id)
        } catch (error) {
            toast("Admin parol yoki username xato!", { type: "error" })
        }
    };


    const handleOrderZakaz = async (e) => {
        try {
            e.preventDefault()
            const username = usernameRef.current.value
            const phone = phoneRef.current.value
            const { data } = await createOrder({
                variables: { username: username, phone: phone, count: count + '', foodId: foodid },
            });
            console.log(data);

            if (data) {
                toast("Success order", { type: 'success' })
            }
        } catch (error) {
            toast(error.message, { type: "error" })
        }
    }

    const handlePlus = () => {
        setCount(count + 1);
    };

    const handleMinus = () => {
        if (!count == 1) {
            setCount(count)
        } else {
            setCount(count - 1)
        }
    }

    const { id } = useParams()
    let Food = gql`
    query Query($resId: ID!) {
        foods(res_id: $resId) {
        _id
        food_name
        food_price
        food_image

    }
}`;

    const { loading, error, data } = useQuery(Food, { variables: { resId: id } });
    if (loading) return 'Loading...';


    return (
        <div>
            <div className='UmmumiyFood'>
                <header className='py-4'>
                    <nav className="container d-flex justify-content-between align-items-center">
                        <div className='logo'>
                            <h3 className='text-white'>Food <span className='text-danger'>Express</span></h3>
                        </div>
                        <ul className='list-style-none d-flex gap-4'>
                            <li className='list=style-none'>
                                <Link className='text-white text-decoration-none'>Home</Link>
                            </li>
                            <li>
                                <Link className='text-white text-decoration-none'>About Us</Link>
                            </li>
                            <li>
                                <Link className='text-danger text-decoration-none'>Foods</Link>
                            </li>
                            <li>
                                <Link className='text-white text-decoration-none'>Contact</Link>
                            </li>
                        </ul>
                        <button className="btn btn-danger">Get O Quite </button>
                    </nav>
                </header>
                <section>
                    <div className="container d-flex">
                        <div className="fs-1 no  text-white ">
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString("Foods")
                                        .pauseFor(1000)
                                        .deleteAll()
                                        .typeString("Category foods")
                                        .start();
                                }}
                            />
                            <p className='text-white w-50 fs-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum numquam cumque perspiciatis.</p>
                            <button className="btn btn-danger">View Reciptes</button>
                        </div>
                    </div>
                </section>
            </div>
            <section className='mt-5'>
                <div className="container align-items-center d-flex justify-content-between">
                    <p className='p1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A sed ipsum, doloribus esse tenetur nesciunt deleniti rem consectetur eaque nihil!</p>
                    <p className='p2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia libero, a vero voluptatem officiis deleniti placeat distinctio excepturi qui? Officia reiciendis obcaecati officiis illum accusantium odio rerum facere sequi ipsam.</p>
                </div>
            </section>
            <section className='py-5'>
                <div className="container">
                    <div className="obshi d-flex justify-content-between gap-3 flex-wrap">
                        {data.foods.length == 0 ? (<h2 className='text-center'>No Results</h2>) : data.foods?.map((item) => (
                            <div key={item._id} className="cardio">
                                <img src={`http://localhost:4000/${item.food_image}`} alt="" />
                                <div className='d-flex flex-column'>
                                    <h4 className='mt-1'>{item.food_name}</h4>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>{item.food_price} so'm</p>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <button type='button ' className='counter form-control' onClick={handleMinus}>-</button>
                                            <p className='mt-3'>{count}</p>
                                            <button type='button ' className='counter form-control' onClick={handlePlus}>+</button>
                                        </div>
                                    </div>
                                    <button className='btn btn-danger' onClick={() => handleOrderSubmit(item._id)} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >Place an order</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="offcanvas offcanvas-end bg-dark" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-white" id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" className="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form action="" onSubmit={handleOrderZakaz}>
                        <label className='text-white mt-2' htmlFor="username">Username</label>
                        <input placeholder='Username' type="text" ref={usernameRef} className='form-control mt-1' name='username' id='username' />
                        <label className='text-white mt-2' htmlFor="phone">Phone Number</label>
                        <input placeholder='998902345678' type="text" ref={phoneRef} name='phone' className='form-control mt-1' id='phone' />
                        <button className='btn btn-danger mt-5 w-100'>Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Food

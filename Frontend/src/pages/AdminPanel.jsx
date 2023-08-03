import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../styles/AdminPanel.css"
import Header from '../components/Header'
import { gql, useMutation, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'

const AdminPanel = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    if (!token) {
        navigate("/login")
    }
    let Orders = gql`
		query Query {
            orders {
                _id
                username
                phone
                count
                tasdiqlanish
                foodId {
                    food_name
                }
            }
        }
	`;
    let TasdiqlashOrder = gql`
        mutation TasdiqlashOrder($id: ID!) {
            tasdiqlashOrder(_id: $id) {
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
        }
    `;

    const [tasdiqlashOrder] = useMutation(TasdiqlashOrder);
    const { loading, error, data } = useQuery(Orders);
    if (loading) return <h1>Loading ....</h1>;
    if (error) return `Error! ${error.message}`;

    const ClickedTasdiqlash = async (id) => {
        try {
            const { data } = await tasdiqlashOrder({
                variables: { id: id },
                context: {
                    headers: {
                        authorization: `${token}`,
                    },
                },
            });
            if (data.tasdiqlashOrder.success == true) {
                toast("Order Tasdiqlandi!", { type: "success" })
            }
        } catch (error) {
            toast("Bu Order avvaldan tasdiqlangan!!!", { type: "error" })
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
                    <section className='jadval'>
                        <div className="container">
                            <table className="table rs table-white table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Username</th>
                                        <th scope="col">phone</th>
                                        <th scope="col">count</th>
                                        <th scope="col">FoodName</th>
                                        <th scope='col'>Tasdiqlash</th>
                                    </tr>
                                </thead>
                                {data.orders?.map((item) => (
                                    <tbody key={item._id}>
                                        <tr >
                                            <td>{item.username}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.count}</td>
                                            <td>{item.foodId.map((item) => (
                                                <p key={item._id}>{item.food_name}</p>
                                            ))}</td>
                                            {item?.tasdiqlanish == false ? (<td className='okef' onClick={() => ClickedTasdiqlash(item._id)}><i className="fa-solid fa-thumbs-up"></i></td>) : (<td className='okef' onClick={() => ClickedTasdiqlash(item._id)}><i className="fa-solid fa-clipboard-check text-success"></i></td>)}
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel

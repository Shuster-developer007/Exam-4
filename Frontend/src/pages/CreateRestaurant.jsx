import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';
import "../styles/CreateRestaurant.css"
import Header from '../components/Header';
const CreateRestaurant = () => {
    const restaurantNameRef = useRef();
    const restaurantImageRef = useRef();
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    if (!token) {
        navigate("/login")
    }
    const CREATE_RESTAURANT_MUTATION = gql`
    mutation CreateRestaurant($resName: String!, $file: Upload!) {
      createRes(res_name: $resName, file: $file) {
        success
        message
        data {
          _id
          res_name
          file
        }
      }
    }
  `;

    const [createRes, { loading, error }] = useMutation(CREATE_RESTAURANT_MUTATION);
    const handleCreateRestaurant = async (e) => {
        e.preventDefault()
        const res_name = restaurantNameRef.current.value;
        const file = restaurantImageRef.current?.files[0];

        try {
            const { data } = await createRes({
                variables: { resName: res_name, file: file },
                context: {
                    headers: {
                        authorization: `${token}`,
                    },
                },
            });
            console.log(data);
            // Handle the response from the server, e.g., show a success toast
            if (data.createRes.success == true) {
                toast('Restaurant created successfully!', { type: 'success' });
            } else if (data.createRes.success == false) {
                toast('Restaurant creation failed.', { type: 'error' });
            }
        } catch (error) {
            toast('Error while creating restaurant.', { type: 'error' });
        }
    };

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
                    <section className='w-100'>
                        <div className="container">
                            <h2 className='text-danger text-center'>Create Restaurant</h2>
                            <div className="inputs">
                                <form action="" onSubmit={handleCreateRestaurant} className='klsd align-items-center'>
                                    <label className='mt-3' htmlFor="res_name">Restaurant Name</label>
                                    <input type="text" ref={restaurantNameRef} className='mt-2 form-control w-50' name='res_name' id='res_name' />
                                    <label className='mt-3' htmlFor="file">Restaurant Image</label>
                                    <input type="file" className='form-control mt-2 w-50' ref={restaurantImageRef} name='file' id='file' />
                                    <button className='btn btn-danger w-50 mt-5'>Create Restaurant</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CreateRestaurant;


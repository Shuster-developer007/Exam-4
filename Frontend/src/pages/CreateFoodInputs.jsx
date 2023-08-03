import React, { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

const CreateFoodInputs = () => {
    const { id } = useParams()
    const foodNameRef = useRef()
    const foodPriceRef = useRef()
    const FoodImageRef = useRef()
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.replace("/login")
    }
    const CREATE_FOOD = gql`
      mutation CreateFood($foodName: String!, $foodPrice: String!, $foodImage: Upload!, $resId: ID) {
            createFood(food_name: $foodName, food_price: $foodPrice, food_image: $foodImage, res_id: $resId) {
                success
                message
                data {
                    _id
                    food_name
                    food_price
                    food_image
                }
        }
    }  
    `;

    const [createFood, { loading, error }] = useMutation(CREATE_FOOD);

    const handleCreateFood = async (e) => {
        e.preventDefault()
        const food_name = foodNameRef.current.value;
        const food_price = foodPriceRef.current.value
        const foodImage = FoodImageRef.current?.files[0];
        // Create a FormData object and append the file to it

        try {
            const { data } = await createFood({
                variables: { foodName: food_name, foodPrice: food_price, foodImage: foodImage, resId: id },
                context: {
                    headers: {
                        authorization: `${token}`,
                    },
                },
            });
            // Handle the response from the server, e.g., show a success toast
            if (data.createFood.success == true) {
                toast('Food created successfully!', { type: 'success' });
            } else if (data.createFood.success == false) {
                toast('Food creation failed.', { type: 'error' });
            }
        } catch (error) {
            toast('Error while creating food.', { type: 'error' });
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
                            <h2 className='text-danger text-center'>Create Food</h2>
                            <div className="inputs">
                                <form action="" onSubmit={handleCreateFood} className='klsd align-items-center'>
                                    <label className='mt-3' htmlFor="food_name">Food Name</label>
                                    <input type="text" ref={foodNameRef} className='mt-2 form-control w-50' name='food_name' id='food_name' />
                                    <label className='mt-3' htmlFor="food_price">Food Price</label>
                                    <input type="text" ref={foodPriceRef} className='mt-2 form-control w-50' name='food_price' id='food_price' />
                                    <label className='mt-3' htmlFor="foodImage">Food Image</label>
                                    <input type="file" ref={FoodImageRef} className='form-control mt-2 w-50' name='foodImage' id='foodImage' />
                                    <button className='btn btn-danger w-50 mt-5'>Create Food</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default CreateFoodInputs

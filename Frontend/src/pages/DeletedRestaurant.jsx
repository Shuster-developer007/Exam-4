import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react'
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeletedRestaurant = () => {
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

    let DeleteRestaurant = gql`
        mutation Mutation($deletedResId: ID) {
            deletedRes(id: $deletedResId)
}
    `;

    const [deletedRes] = useMutation(DeleteRestaurant);

    const handleDeleteRestaurant = async (id) => {
        try {
            const { data } = await deletedRes({
                variables: { deletedResId: id },
                context: {
                    headers: {
                        authorization: `${token}`,
                    },
                },
            });
            if (data) {
                toast("Success deleted Restaurant", { type: "success" })
            }
        } catch (error) {
            toast(error.message, { type: "error" })
        }
    };

    const { loading, error, data } = useQuery(Restaurants);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div>
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
                                <Link to='/restaurant/delete' className='text-decoration-none text-dark'>
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
                            <h3 className='ko text-danger py-2'>Delete Restaurant</h3>

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
                                                <Link >
                                                    <button onClick={() => handleDeleteRestaurant(item._id)} className="btn btn-danger">
                                                        Deleted Card
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

export default DeletedRestaurant

import React from 'react'
import Header from '../components/Header'
import "../styles/Home.css"
import { gql, useQuery } from '@apollo/client'
import Typewriter from "typewriter-effect";
import { Link } from 'react-router-dom'
import ShoppingImage from "../assets/shopping.png"
import OrderImage from "../assets/order.avif"
import BurgerImage from "../assets/burger1.jpg"
import SushiImage from "../assets/sushi.jpg"
import SushiTwoImage from "../assets/sushi2.jpg"
import dev from "../assets/young.avif"
import ChickenImage from "../assets/chicken.jpg"
import Person1 from "../assets/person1.jpg"
import Person2 from "../assets/person2.jpg"
import Person3 from "../assets/person3.jpg"

import FoodDeliverImage from "../assets/drive.jpg"
import Footer from '../components/Footer';


const Home = () => {

    let Restaurants = gql`
		query Query {
			restaurant {
              _id
              res_name
              file
              created_at
            }
		}
	`;

    const { loading, error, data } = useQuery(Restaurants);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    return (
        <div>
            <div className='Ummumiy'>
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
                                <Link className='text-white text-decoration-none'>Product</Link>
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
                        <div className="fs-1 twriter text-white ">
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString("Welcome to the Food Express site")
                                        .pauseFor(1000)
                                        .deleteAll()
                                        .typeString("Welcomes You")
                                        .start();
                                }}
                            />
                            <p className='text-white w-50 fs-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum numquam cumque perspiciatis.</p>
                            <button className="btn btn-danger">View Reciptes</button>
                        </div>
                    </div>
                </section>
            </div>
            <section className='pt-5'>
                <div className="container d-flex flex-column align-items-center">
                    <h4 className='text-center text-danger'>How it works</h4>
                    <h3 className='text-center'>What We Serve</h3>
                    <p className='text-center w-50'>Products Quality Is Our  Priority.And Always Gurantees Halal And Safety Until It is In Your Hands </p>
                    <div className='cards justfify-content-between d-flex'>
                        <div className="Card">
                            <img src={ShoppingImage} alt="" />
                            <h5 className='text-center mt-1'>Easy To Order</h5>
                            <p className='text-center th'>You only  order through the app</p>
                        </div>
                        <div className="Card">
                            <img src={OrderImage} alt="" />
                            <h5 className='text-center mt-1'>Fastest Delivery</h5>
                            <p className='text-center th'>Delivery will be on time</p>
                        </div>
                        <div className="Card">
                            <img src={FoodDeliverImage} alt="" />
                            <h5 className='text-center mt-1'>Fastest Delivery</h5>
                            <p className='text-center th'>The best quality of food for you</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 className='text-center fs-2 text-danger py-4'>Our Gallery</h2>
                <div className='images'>
                    <img src={SushiImage} alt="" />
                    <img src={ChickenImage} alt="" />
                    <img src={SushiTwoImage} alt="" />
                    <img src={BurgerImage} alt="" />
                </div>
            </section>
            <section className='category py-5'>
                <div className="container">
                    <div className='d-flex flex-column gap-2 align-items-center'>
                    <h2 className='text-danger text-center'>Categories</h2>
                    <p className='text-center plf'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora earum nemo nisi optio ullam impedit eveniet quos, explicabo reiciendis harum enim laudantium. Quisquam mollitia assumenda et qui repudiandae inventore delectus.</p>
                    </div>
                    <div className="c-cards mt-3 d-flex flex-wrap">
                        {data?.restaurant.map((item) => (
                            <div key={item._id} className="c-card">
                                <img src={`http://localhost:4000/${item.file}`} alt="image" />
                                <p className='kn mt-2'>Desc {(item.created_at).slice(8,25)}</p>
                                <h3>{item.res_name}</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa hic officia quo vel recusandae eius voluptatem nemo.</p>
                                <Link to={`/foods/${item._id}`}>
                                    <button className="btn btn-danger">
                                        View More Foods
                                    </button>
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>
            </section>   
            <section className='nimadir'>
                <div className="container">
                    <div className="vor d-flex justify-content-around align-items-center">
                        <div className='text-white'>
                            <h2>We deliver  throuphout the Uk</h2>
                            <p className='para'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum iure nobis tempore enim aspernatur iusto! Distinctio ullam earum corporis reprehenderit.</p>
                            <button className="btn btn-outline-light">Read More</button>
                        </div>
                        <img src={dev} alt="" />
                    </div>
                </div>
            </section>
            <section className='py-5'>
                <div className="container d-flex flex-column align-items-center">
                    <h2 className='text-danger'>What Customers Says</h2>
                    <p className='w-50 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quibusdam dolorem incidunt deleniti architecto molestias!</p>
                    <div className="customers mt-3 d-flex justify-content-between">
                        <div className="custom">
                            <div className="div d-flex align-items-center gap-3">
                                <img src={Person2} alt="" />
                                <div>
                                    <h4>Brie Larson</h4>
                                    <p className='pg'>Happy Customer</p>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias, eveniet voluptas vel dignissimos fugiat.</p>
                            <div className="icons">
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                            </div>
                        </div>
                        <div className="custom">
                            <div className="div d-flex align-items-center gap-3">
                                <img src={Person1} alt="" />
                                <div>
                                    <h4>Ali valiey</h4>
                                    <p className='pg'>Happy Customer</p>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias, eveniet voluptas vel dignissimos fugiat.</p>
                            <div className="icons">
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                            </div>
                        </div>
                        <div className="custom">
                            <div className="div align-items-center d-flex gap-3">
                                <img src={Person3} alt="" />
                                <div>
                                    <h4>Aqlli odam</h4>
                                    <p className='pg'>Happy Customer</p>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam molestias, eveniet voluptas vel dignissimos fugiat.</p>
                            <div className="iconss">
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                                <i className="fa-solid fa-star text-warning"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home





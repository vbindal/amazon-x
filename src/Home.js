import React from 'react';
import './Home.css';
import Product from './Product';

const Home = () => {
    return (
        <div className='home'>
            <div className='home_container'>
                <img className="home_image"
                    src="https://i.pcmag.com/imagery/articles/05qp7E8Z6G2lM79Y6Epl0tl-11..v1660159907.jpg"
                />
            </div>
            <div className='home__row'>
                <Product
                    id = {1}
                    title='Noise Pulse 2 Max 1.85" Display, Bluetooth Calling Smart Watch, 10 Days Battery, 550 NITS Brightness, Smart DND, 100 Sports Modes, Smartwatch for Men and Women (Jet Black)'
                    price={29.99}
                    image='https://m.media-amazon.com/images/I/71Q8czKqSIL._AC_SY170_.jpg'
                    rating={5} />
                <Product
                    id = {2}
                    title='ZEBRONICS Zeb-Jaguar Wireless Mouse, 2.4GHz with USB Nano Receiver, High Precision Optical Tracking, 4 Buttons, Plug & Play, Ambidextrous, for PC/Mac/Laptop (Black+Grey)'
                    price={9.99}
                    image='https://m.media-amazon.com/images/I/41nclnxOSLL._AC_SY200_.jpg'
                    rating={4} />
            </div>
            <div className='home__row'>
                {/* More products can be added here */}
                <Product
                    id = {3}
                    title='CARTADEN Wooden Serving Trays Modern Style With Cutout Handle Large, Medium And Small For Food, Wooden Trays For Breakfast - Natural Wood And Brown (Set of 3) Rectangular'
                    price={12.99}
                    image='https://m.media-amazon.com/images/I/51Jg7dAJlGL._SX300_SY300_QL70_FMwebp_.jpg'
                    rating={3} />
                <Product
                    id = {4}
                    title='Prime Lemon Lime Hydration Drink Sports Beverage Naturally Flavored, 10% Coconut Water, 250mg BCAAs, B Vitamins, Antioxidants, 16.9 Fl Oz Bottle 500ml'
                    price={4.99}
                    image='https://m.media-amazon.com/images/I/61PilEBHicL._SX679_.jpg'
                    rating={2} />
                <Product
                    id = {5}
                    title='Storio Toy Octopus Plushie Reversible Soft Toys for Kids | Plush Soft Toys for Baby Boys and Girls | Octopus Soft Toy for Kids -18cm'
                    price={3.58}
                    image='https://m.media-amazon.com/images/I/517tM2o269L._SX522_.jpg'
                    rating={5} />
                <Product
                    id = {6}
                    title='Karsaer Square Flat Top Shield Sunglasses One Piece Frameless Stylish Women Men UV400 E1037'
                    price={11.99}
                    image='https://m.media-amazon.com/images/I/512uyz6rXNL._SX679_.jpg'
                    rating={3} />
            </div>
            <div className='home__row'>
                {/* More products can be added here */}
                <Product
                    id = {7}
                    title='CAROTE Knife Kitchen Knife Chef Knife Color Printing Santoku Knife & Non-Slip Handle with Blade Cover, Blue, 5 inch, Stainless Steel'
                    price={2.99}
                    image='https://m.media-amazon.com/images/I/61FEhOUf1UL._SX679_.jpg'
                    rating={5} />
                <Product
                    id = {8}
                    title='Tribit Upgraded Version XSound Go 16W 5.0 Bluetooth Speaker with Loud Sound & Rich Bass, 24H Playtime, IPX7 Waterproof, Wireless Stereo Pairing, Type-C, Portable Speaker for Home/Outdoor/Travel Black'
                    price={35.99}
                    image='https://m.media-amazon.com/images/I/71b122pwbpL._SX522_.jpg'
                    rating={5} />
            </div>
        </div>
    );
}

export default Home;

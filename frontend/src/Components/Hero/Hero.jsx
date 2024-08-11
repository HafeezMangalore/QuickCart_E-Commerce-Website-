import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icom from '../Assets/arrow.png'
import hero_image from '../Assets/image_hero.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
        <h1>Introducing our latest arrivals</h1>
        <h3> The freshest styles and trends to elevate your wardrobe</h3>
        <div>
            <div className="hero-hand-icon">
                <p>new</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>Collections</p>
            <p>For Everyone</p>
         </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icom} alt="" /> 
        </div> 
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero

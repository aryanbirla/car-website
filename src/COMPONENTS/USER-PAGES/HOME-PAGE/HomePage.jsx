import React from "react";
import "./HomePage.css";
import { Carousel } from 'react-responsive-carousel';

const HomePage = () => {

    return (
        <div className="container   ">
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                <div>
                    <img src="carouselImage1.jpg" alt="Slide 1" />
                    <p className="legend">Slide 1</p>
                </div>
                <div>
                    <img src="carouselImage2.jpg" alt="Slide 2" />
                    <p className="legend">Slide 2</p>
                </div>
                <div>
                    <img src="carouselImage3.jpg" alt="Slide 3" />
                    <p className="legend">Slide 3</p>
                </div>
            </Carousel>

        </div>
    )

}

export default HomePage;
import React from "react";
import "./HomePage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 👈 Add this

const HomePage = () => {
    return (
        <div className="container">
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                <div>
                    <img src="carouselImage1.jpg" alt="Slide 1" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="carouselImage2.jpg" alt="Slide 2" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="carouselImage3.jpg" alt="Slide 3" />
                    <p className="legend"></p>
                </div>
            </Carousel>
        </div>
    );
};

export default HomePage;

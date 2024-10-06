import React from "react";
import "../../../styles/Carousel.css"

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css/core';
import '@splidejs/splide/css';
// import drag from "flickity/js/drag";

export default function Carousel({ products, selectedProductIndex, setSelectedProductIndex }) {


    const getImage = (productName) => {
        return `/images/${productName}.png`;
    };

    const onMovedEnd = (splide, newIndex) => {
        setSelectedProductIndex(newIndex)
    };

    return (

        <div className="panel">

            <Splide
                className="splide"
                hasTrack={false}
                aria-label="Carousel"
                onMoved={(splide, newIndex) => { onMovedEnd(splide, newIndex) }}
                options={{
                    type: "loop",
                    gap: '5%',
                    padding: '10%',
                    arrows: true,
                    pagination: true,
                    width: "100%",
                    height: "100%",
                    start: selectedProductIndex,
                    easing: "ease",
                    speed: 400,
                    // drag: false
                }}
            >
                <SplideTrack>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <SplideSlide key={index}>
                                <div className="product-text">{product.name}</div>
                                <img className="product-image" src={getImage(product.name)} />
                            </SplideSlide>
                        ))
                    ) : (
                        <SplideSlide>
                            <p>No products available.</p>
                        </SplideSlide>
                    )}
                </SplideTrack>


                {/* <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev" >{"<"} </button>
                    <button className="splide__arrow splide__arrow--next" >{">"} </button>
                </div> */}

            </Splide>

        </div>

    );
}


// <div className="horizontal-organizer">

//      <button className="carousel-button" onClick={handlePrev} disabled={currentIndex === 0}>{"<"}</button>

// <div className="carousel-container">



//         data-flickity-options='{ "wrapAround": true }'>
//             {products.map((product, index) => (
//             <div
//                 key={index}
//                 className="gallery-cell"
//             >
//                 <div>
//                     {product.name}
//                 </div>
//                 <img src={getImage(product.name)} alt={product.name} width={300} height={300}/>
//             </div>
//         ))}
//     </div>

// </div>

//      <button className="carousel-button" onClick={handleNext} disabled={currentIndex === products.length - 1}>{">"}</button>

// </div>





import React from "react";

import Carousel from "./Carousel"
import Preferences from "./Preferences"
import Generate from "./Generate"
import Personalize from "./Personalize"


export default function Panel({ stepNum, setStepNum, products, setProducts, selectedProductIndex, setSelectedProductIndex }) {

    // Define components/pages to render for each step
    if (stepNum === 0) {
        return <Carousel
            products={products}
            selectedProductIndex={selectedProductIndex}
            setSelectedProductIndex={setSelectedProductIndex} />;
    } else if (stepNum === 1) {
        return <Preferences
            products={products} selectedProductIndex={selectedProductIndex} />;
    } else if (stepNum === 2) {
        return <Generate />;
    } else {
        // Default or final step
        return <Personalize />;
    }
}

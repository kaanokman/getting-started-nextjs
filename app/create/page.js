// establish as client-side
'use client';

// import react
import React from "react";

// import user context
// import { UserContext } from '../context/UserContext';

// import components
import Panel from "./components/Panel"

// import stylesheet
import "../../styles/Create.css"


// function
export default function Create() {

    // const { user, setUser } = React.useContext(UserContext);

    // dummy store products in place of shopify data
    class Product {
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }
    }

    const storeProducts = [
        new Product("Swimshorts", 50),
        new Product("Buttondown", 40),
        new Product("Tshirt", 30),
        new Product("Phonecase", 20),
        new Product("Poster", 250)
    ]

    // const { user, setUser } = React.useContext(UserContext);
    const [stepNum, setStepNum] = React.useState(0);
    const [products, setProducts] = React.useState([]);
    const [selectedProductIndex, setSelectedProductIndex] = React.useState(0);

    const steps = ['Step 1: Select Product',
        'Step 2: Generate Design',
        'Step 4: Make It Yours']

    const [title, setTitle] = React.useState(steps[stepNum]);

    const handleForward = () => {
        setTitle(steps[stepNum + 1])
        setStepNum(stepNum + 1)
    }

    const handleBack = () => {
        setTitle(steps[stepNum - 1])
        setStepNum(stepNum - 1)
    }

    React.useEffect(() => {
        // call to fetch available products in store from Shopify API
        setProducts(storeProducts)

    }, [])

    return (

        <>

            <div className="title-text">
                {title}
            </div>

            <Panel
                stepNum={stepNum} setStepNum={setStepNum}
                products={products} setProducts={setProducts}
                selectedProductIndex={selectedProductIndex}
                setSelectedProductIndex={setSelectedProductIndex} />

            <div className="buttons">
                {stepNum !== 0 ? (
                    <button
                        className="mybutton back"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                ) :
                    (
                        <button
                            className="mybutton back disabled">
                            Back
                        </button>
                    )
                }
                {stepNum !== (steps.length - 1) ? (
                    <button className="mybutton next" onClick={handleForward}>
                        Next
                    </button>
                ) :
                    (<button className="mybutton next disabled">
                        Next
                    </button>
                    )}


            </div>


        </>

    );
}
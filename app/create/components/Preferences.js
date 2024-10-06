import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "../../../styles/Preferences.css";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Preferences({ products, selectedProductIndex }) {

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const promptInputRef = useRef(null);

    const productName = products[selectedProductIndex]?.name;
    const [generatedImage, setGeneratedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const getImage = (productName) => {
        return `/images/${productName}.png`;
    };

    useEffect(() => {
        promptInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (productName) {
            setGeneratedImage(getImage(productName));
        }

    }, [productName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: e.target.prompt.value,
            }),
        });
        let prediction = await response.json();
        if (response.status !== 201) {
            setError(prediction.detail);
            setLoading(false)
            return;
        }
        setPrediction(prediction);

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
        ) {
            await sleep(5000);
            const response = await fetch(`/api/predictions/${prediction.id}`);
            prediction = await response.json();
            if (response.status !== 200) {
                setError(prediction.detail);
                setLoading(false)
                return;
            }
            console.log({ prediction });
            setPrediction(prediction);
            setLoading(false)
        }
    };

    if (productName && ["Swimshorts", "Buttondown"].includes(productName)) {
        return (
            <div className="panel">
                <div className="grid-preferences">
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="r1"
                            placeholder="Enter prompt..."
                            ref={promptInputRef}
                            name="prompt"
                            required />
                        <button type="submit" className="r2">Generate</button>
                    </form>

                    <div className="r3">
                        {error && <div>{error}</div>}
                        {loading ? (
                            <div className="loading-spinner">Loading...</div>
                        ) : (
                            <>
                                {prediction && prediction.output ? (
                                    <Image
                                        className="mockup"
                                        src={prediction.output[prediction.output.length - 1]} // Only render if prediction.output exists
                                        alt="output"
                                        width={500}
                                        height={500}
                                    />
                                ) : (
                                    <>
                                        {generatedImage && (
                                            <Image
                                                className="mockup"
                                                src={generatedImage} // Fallback to generatedImage
                                                alt="output"
                                                width={500}
                                                height={500}
                                            />
                                        )}
                                    </>

                                )}

                            </>
                        )}
                    </div>


                    <button className="r4-left">Like</button>
                    <button className="r4-right">Add To Cart</button>
                </div>
            </div>
        );
    }

    return null;
}

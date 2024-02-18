import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { formatPrice } from "../../utils/utility";
import instance from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

function CartProduct(props) {
    const { token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    const { productCart, onUpdateCart, totalValue } = props;
    let i = 0;
    const handlingSendCart = async (productCart) => {
        const postData = await instance.post(
            "http://localhost:8000/api/transaction",
            {
                transaction: productCart,
            },
            {
                headers: {
                    token: token,
                },
            }
        );
    };
    return (
        <div className="flex flex-col gap-4 w-full">
            <p className="font-medium text-2xl">Cart</p>
            <div className="flex flex-col justify-start items-start">
                {"" ||
                    productCart.map((value) => {
                        i++;
                        return (
                            <div
                                className="w-full border-2 border-red-700 px-4 py-2 rounded-xl flex flex-row justify-between items-center mt-4"
                                key={i}
                            >
                                <div className="flex flex-row justify-center items-center gap-4 text-lg font-base">
                                    <div className="bg-blue-400 rounded-lg w-20 h-20">
                                        {/* Gambar */}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {value.productName}
                                        </p>
                                        <input
                                            type="number"
                                            className="border-2 border-black w-16 ps-2"
                                            defaultValue={value.qty}
                                            onChange={(e) =>
                                                onUpdateCart(
                                                    value.productCode,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <p>
                                            subtotal :{" "}
                                            {formatPrice(value.subtotal)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="w-full">
                <div className="border-2 border-blue-400 px-2 py-2">
                    <p>
                        Total : <span>{formatPrice(totalValue)}</span>
                    </p>
                </div>
                <button
                    className="py-2 px-4 bg-slate-500 rounded-lg text-white"
                    onClick={() => handlingSendCart(productCart)}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default CartProduct;

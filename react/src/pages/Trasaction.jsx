import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CartProduct from "../components/fragments/CartProduct";
import MenuProduct from "../components/fragments/MenuProduct";
import { formatPrice } from "../utils/utility";
import { useStateContext } from "../context/ContextProvider";
import instance from "../axios-client";

function Trasaction() {
    const { token } = useStateContext();
    let i = 0;
    if (!token) {
        return <Navigate to="/login" />;
    }
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalValueCart, setTotalValueCart] = useState(0);
    const [productDetail, setProductDetail] = useState({});
    const [open, setOpen] = useState(false);
    const handlingOpenModal = (
        productName,
        price,
        priceAfterDiscount,
        dimension,
        unit
    ) => {
        setProductDetail({
            productName,
            price,
            priceAfterDiscount,
            dimension,
            unit,
        });
        setOpen(!open);
    };

    const handlingDiscount = (price, priceAfterDiscount) => {
        if (priceAfterDiscount !== price) {
            return (
                <>
                    <p className="line-through font-thin ">
                        {formatPrice(price)}
                    </p>
                    <p className="font-medium">
                        {formatPrice(priceAfterDiscount)}
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <p className="font-medium">{priceAfterDiscount}</p>
                </>
            );
        }
    };

    const handlingFetching = (data) => {
        setProduct(data);
    };
    useEffect(() => {
        async function fetchingData() {
            const data = await instance.get(
                "http://localhost:8000/api/product"
            );
            handlingFetching(data.data.data);
            console.log(data.data.data);
        }
        fetchingData();
    }, []);

    const handleAddCart = (
        productCode,
        productName,
        priceAfterDiscount,
        unit,
        qty
    ) => {
        const findIdCart = cart.find(
            (element) => element.productCode === productCode
        );
        if (!findIdCart) {
            setCart([
                ...cart,
                {
                    productCode,
                    productName,
                    priceAfterDiscount,
                    subtotal: priceAfterDiscount,
                    unit,
                    qty,
                },
            ]);
        }
        handlingTotalCart();
    };

    const handleUpdateCart = (id, qty = 1) => {
        setCart(
            cart.map((element) => {
                if (element.productCode === id) {
                    let tmpQTY = qty;
                    let currentPrice = element.priceAfterDiscount;
                    let tmpSubTotal = element.subtotal;
                    tmpSubTotal = tmpQTY * currentPrice;
                    return { ...element, qty: tmpQTY, subtotal: tmpSubTotal };
                } else {
                    return { ...element };
                }
            })
        );
        handlingTotalCart();
    };

    const handlingTotalCart = () => {
        let result = 0;
        cart.map((element) => {
            result += element.subtotal;
        });
        setTotalValueCart(result);
        return result;
    };
    return (
        <div className="w-full flex flex-row justify-start items-start">
            <div
                className={`absolute flex justify-center items-center z-20 bg-slate-500 w-screen h-screen opacity-85 ${
                    open ? "" : "hidden"
                }`}
            >
                <div className="flex flex-col justify-start items-center bg-white w-96 h-72 rounded-xl gap-4 z-40 py-4 px-8 border-2 border-green-300">
                    <div className="flex flex-row justify-between items-center w-full ">
                        <p>Product Detail</p>
                        <button
                            onClick={() => {
                                handlingOpenModal();
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-8 w-full self-center">
                        <div className="bg-blue-400 rounded-lg w-20 h-20">
                            {/* Gambar */}
                        </div>
                        <div className="flex flex-col justify-start items-start text-sm">
                            <p className="font-semibold">
                                {productDetail.productName}
                            </p>
                            {handlingDiscount(
                                productDetail.price,
                                productDetail.priceAfterDiscount
                            )}
                            <p>
                                Dimension :
                                <span>{productDetail.dimension}</span>
                            </p>
                            <p>
                                Price Unit :<span>{productDetail.unit}</span>
                            </p>
                            <div className="w-full">
                                <button className="text-white bg-blue-400 w-full py-2 rounded-lg hover:bg-blue-200">
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-2 border-blue-500 rounded-lg px-4 py-2 w-3/5 ps-10">
                <p className="text-2xl font-bold pb-4">Product</p>
                <div className="flex flex-row flex-wrap justify-start items-start gap-4 ">
                    {product.map((value) => {
                        return (
                            <MenuProduct
                                data={value}
                                key={value.productCode}
                                onClickDetail={handlingOpenModal}
                                onAddButton={handleAddCart}
                                sumValue={handlingTotalCart}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="border-2 border-red-600 rounded-lg w-full px-4 py-2 max-w-md">
                <CartProduct
                    productCart={cart}
                    onUpdateCart={handleUpdateCart}
                    totalValue={totalValueCart}
                />
            </div>
        </div>
    );
}

export default Trasaction;

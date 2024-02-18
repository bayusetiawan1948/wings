import React from "react";
import { formatPrice } from "../../utils/utility";
function MenuProduct(props) {
    const {
        productCode,
        productName,
        price,
        priceAfterDiscount,
        dimension,
        unit,
    } = props.data;
    const { onClickDetail, onAddButton, sumValue } = props;
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
                    <p className="font-medium">
                        {formatPrice(priceAfterDiscount)}
                    </p>
                </>
            );
        }
    };
    return (
        <div
            className="flex flex-col justify-center items-center gap-2 p-2 cursor-pointer"
            productid={productCode}
        >
            <div className="bg-blue-400 rounded-lg w-20 h-20">
                {/* Gambar */}
            </div>
            <div>
                <p className="font-semibold">{productName}</p>
                {handlingDiscount(price, priceAfterDiscount)}
            </div>
            <div className="w-full">
                <button
                    className="text-blue-400 border-2 border-blue-400 w-full py-2 rounded-lg hover:bg-blue-200"
                    onClick={() =>
                        onClickDetail(
                            productName,
                            price,
                            priceAfterDiscount,
                            dimension,
                            unit
                        )
                    }
                >
                    Detail Product
                </button>
            </div>
            <div className="w-full">
                <button
                    className="text-white bg-blue-400 w-full py-2 rounded-lg hover:bg-blue-200"
                    onClick={() =>
                        onAddButton(
                            productCode,
                            productName,
                            priceAfterDiscount,
                            unit,
                            1
                        )
                    }
                >
                    Buy
                </button>
            </div>
        </div>
    );
}

export default MenuProduct;

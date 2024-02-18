const formatPrice = (price) => {
    const priceToString = price.toString();
    let tmp = "";
    let increment = 0;
    for (let index = priceToString.length - 1; index >= 0; index--) {
        if (increment % 3 === 0) {
            tmp += ".";
        }
        tmp += priceToString[index];
        increment++;
    }
    increment = 0;
    let result = "";
    for (let index = tmp.length - 1; index >= 0; index--) {
        result += tmp[index];
        increment++;
    }
    if (result[result.length - 1] === ".") {
        result = result.substring(result.length - 1, 0);
    }
    return `Rp.${result},-`;
};

export { formatPrice };

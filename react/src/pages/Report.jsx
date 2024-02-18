import React, { useEffect, useState } from "react";
import instance from "../axios-client";
import { formatPrice } from "../utils/utility";
function Report() {
    let i = 0;
    const [data, setData] = useState([]);
    const handlingDataReport = (data) => {
        setData(data);
    };
    useEffect(() => {
        async function fetchingData() {
            const data = await instance.get("http://localhost:8000/api/report");
            console.log(data.data.data);
            handlingDataReport(data.data.data);
        }
        fetchingData();
    }, []);
    return (
        <div>
            <table className="table-auto w-screen flex flex-col justify-between items-start gap-4">
                <thead className="flex flex-col gap-4 ">
                    <tr className="flex flex-row gap-10">
                        <th>Transaction</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody className="flex flex-col gap-4 justify-center items-center">
                    {data.map((value) => {
                        return (
                            <tr key={i++} className="flex flex-row gap-10">
                                <td>{value.trasaction}</td>
                                <td>{value.user}</td>
                                <td>{formatPrice(value.total)}</td>
                                <td>{value.date}</td>
                                <td
                                    dangerouslySetInnerHTML={{
                                        __html: value.items,
                                    }}
                                ></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Report;

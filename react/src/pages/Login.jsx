import React from "react";
import { useStateContext } from "../context/ContextProvider";
import instance from "../axios-client";
function Login() {
    const { handlingSetToken, setUser } = useStateContext();

    const handlingSubmit = async (e) => {
        e.preventDefault();
        const postData = await instance.post(
            "http://localhost:8000/api/login",
            {
                username: e.target.username.value,
                password: e.target.password.value,
            }
        );
        const token = postData.data.data.token;
        handlingSetToken(token);
        setUser(e.target.username.value);
        window.location.href = "/transaction";
    };
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <form
                className="p-4 flex flex-col justify-center items-center w-64 gap-6 border-2 border-slate-600 rounded-lg"
                onSubmit={handlingSubmit}
            >
                <div className="text-center font-semibold">
                    <p>Masukan username dan password anda</p>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username">Nama User :</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Smit"
                            className="border-2 border-black rounded-md ps-2 py-1"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Kata Sandi :</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="******"
                            className="border-2 border-black rounded-md ps-2 py-1"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <button
                        type="submit"
                        className="bg-slate-600 text-white w-full py-2 rounded-lg hover:bg-slate-400"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;

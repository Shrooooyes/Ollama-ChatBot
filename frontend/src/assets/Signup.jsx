import React, { useState } from 'react'
import ReactJsAlert from "reactjs-alert";

const Signup = (props) => {

    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginOrSignup, setLoginOrSignup] = useState("login");

    const [status, setStatus] = useState(false);
    const [type, setType] = useState("success");
    const [title, setTitle] = useState("This is a success alert");

    const handleLogin = () => {
        // e.preventDefault();

        fetch("http://localhost:8000/login", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                console.log(data);

                if (data.error != '') {
                    setStatus(true);
                    setType("error");
                    setTitle(data.error);
                }
                else{
                    props.setUser({
                        name: data.name,
                        email: email,
                        chats: data.chats
                    })
                    console.log("user set with all details");
                }

            })
            .catch(error => {
                console.error(error);
                setStatus(true);
                setType("error");
                setTitle(error);
            });
    }

    const handleSignup = () => {
        // e.preventDefault();

        fetch("http://localhost:8000/signup", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                chats: []
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error != '') {
                    setStatus(true);
                    setType("error");
                    setTitle(data.error);
                }
                else {
                    props.setUser({
                        name: name,
                        email: email,
                        chats: [
                            {
                                chat_id: 0,
                                messages: []
                            }
                        ]
                    })
                    console.log("user set with all details");
                }
            })
            .catch(error => {
                console.error(error);
                setStatus(true);
                setType("error");
                setTitle(error);
            });

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (loginOrSignup == "login") {
            handleLogin(e);
        } else {
            handleSignup(e);
        }

    }

    return (
        <>
            <ReactJsAlert
                status={status}
                type={type}
                title={title}
                Close={() => setStatus(false)}
            />

            {
                login ? <div>
                    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img class="mx-auto h-20 w-auto" src="https://img.icons8.com/3d-fluency/94/chatbot.png" alt="chatbot" />
                            <h2 class="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Log in to your account</h2>
                        </div>

                        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} class="space-y-6" method='post'>
                                <div>
                                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                                    <div class="mt-2">
                                        <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                </div>

                                <div>
                                    <div class="flex items-center justify-between">
                                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                                    </div>
                                    <div class="mt-2">
                                        <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    </div>
                                </div>

                                <div>
                                    <button onClick={() => { setLoginOrSignup("login") }} class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                </div>
                            </form>

                            <p class="mt-10 text-center text-sm/6 text-gray-500">
                                New user?
                                <button class="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => { setLogin(!login) }}>Sign Up</button>
                            </p>
                        </div>
                    </div>

                </div> :
                    <div>
                        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img class="mx-auto h-20 w-auto" src="https://img.icons8.com/3d-fluency/94/chatbot.png" alt="chatbot" />
                                <h2 class="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Welcome {name === '' ? 'User' : name}!!</h2>
                            </div>

                            <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form onSubmit={handleSubmit} class="space-y-6" method='post'>
                                    <div>
                                        <label for="name" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
                                        <div class="mt-2">
                                            <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} id="name" autocomplete="name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                                        <div class="mt-2">
                                            <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div>
                                        <div class="flex items-center justify-between">
                                            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                                        </div>
                                        <div class="mt-2">
                                            <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div>
                                        <button onClick={() => { setLoginOrSignup("signup") }} class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                                    </div>
                                </form>

                                <p class="mt-10 text-center text-sm/6 text-gray-500">
                                    Already a user?
                                    <button class="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => { setLogin(!login) }}>Sign In</button>
                                </p>
                            </div>
                        </div>

                    </div>
            }

        </>
    )
}

export default Signup;
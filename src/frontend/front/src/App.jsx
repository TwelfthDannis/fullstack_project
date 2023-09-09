import React, {useEffect} from 'react';
import Nav from "./components/navigation.jsx"
import Sign from "./components/sign.jsx"
import Content from "./components/content.jsx"
import Profile from "./components/profile.jsx";
import Cart from "./components/cart.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProductAdd from "./components/productAdd.jsx";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*">
                    <Route path="" element={<><Nav/><Content/></>} />
                    <Route path="profile/:id" element={<><Nav/><Profile/></>} />
                    <Route path="cart" element={<><Nav/><Cart/></>}/>
                </Route>
                <Route path="/identity/*">
                    <Route path="login" element={<Sign />} />
                    <Route path="register" element={<Sign />} />
                    <Route path="" element={<Navigate to="/identity/login" />} />
                </Route>
                <Route path="/product/add" element={<ProductAdd/>}/>
            </Routes>
        </BrowserRouter>
    )
}

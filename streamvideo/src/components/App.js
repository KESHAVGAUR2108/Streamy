import React from "react";
import { Route,Routes } from "react-router-dom";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamCreate from "./streams/StreamCreate";
import Header from "./Header";
import history  from "../customRoutes/history";
import CustomRouter from "../customRoutes/CustomRouter"

const App = () => {
    return (
        <div >
            <CustomRouter history = {history}>
                <Header />
                <Routes>
                    <Route path="/" element={<StreamList />}></Route>
                    <Route path="/streams/:id" element={<StreamShow />}></Route>
                    <Route path="/streams/new" element={<StreamCreate />}></Route>
                    <Route path="/streams/edit/:id" element={<StreamEdit />}></Route>
                    <Route path="/streams/delete/:id" element={<StreamDelete />}></Route>
                </Routes>
            </CustomRouter>
        </div>
    );
};

export default App;
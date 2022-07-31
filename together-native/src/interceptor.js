import React, {useContext} from "react";
import Axios from 'axios';
import Cookies from 'js-cookie';
// import GlobalContext from "./context/GlobalContext";

const deleteAllCookies = () => {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

const useInterCeptor = () => {
    const instance = Axios.create({
        baseURL:"http://192.168.40.15:5000/",
        withCredentials: true,
        timeout: 10000,
    });


    instance.defaults.timeout = 10000;
    instance.defaults.headers.common['Content-Type'] = 'application/json';
    instance.defaults.headers.common['Accept'] = 'application/json';
    // instance.defaults.headers.common['Accept-Language'] = router.locale;
   
    return (instance);
}

export default  useInterCeptor;
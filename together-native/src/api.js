import useInterCeptor from './interceptor';

const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        //  authentication
        login: (data, params={}) => axios.post(`login/`, data, {params : params}),
        signUp: (data, params={}) => axios.post(`users/`, data, {params : params}),
        getUsers: (params={}) => axios.get(`users/`, {params : params}),
    };

    return api;
}

export default  useApiHelper;
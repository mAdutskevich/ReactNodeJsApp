import axios, { AxiosRequestConfig } from 'axios';
import { IRequestMethod } from 'interfaces/IRequestMethod';


export const request = async (config: AxiosRequestConfig<any>) => {
    const axiosConfig = {...config};

    !config.data && delete axiosConfig.data;
    !config.params && delete axiosConfig.params;
    !config.headers && delete axiosConfig.headers;

    try {
        const response = await axios(config);
    } catch (err) {
        
    }
};

// No overload matches this call.
//   Overload 1 of 2, '(config: AxiosRequestConfig<any>): AxiosPromise<any>', gave the following error.
//     Argument of type '{ method: IRequestMethod; url: string; data: T; params: P; headers: H; }' is not assignable to parameter of type 'AxiosRequestConfig<any>'.
//       Types of property 'headers' are incompatible.
//         Type 'H' is not assignable to type 'AxiosRequestHeaders'.
//   Overload 2 of 2, '(url: string, config?: AxiosRequestConfig<any>): AxiosPromise<any>', gave the following error.
//     Argument of type '{ method: IRequestMethod; url: string; data: T; params: P; headers: H; }' is not assignable to parameter of type 'string'.

// axios
//     .post('http://localhost:3001/auth/login', data)
//     .then((response) => {
//         localStorage.setItem('Authorization', response.data.token);
//         localStorage.setItem('RefreshToken', response.data.refreshToken);
//         setFormErrors([]);
//         navigate(routes.home);
//     })
//     .catch((err) => {
//         console.log('err', err);

//         if (err.response.data?.errors?.length) {
//             setFormErrors(err.response.data.errors);
//         } else {
//             setFormErrors(err.message);
//         }
//     });

// axios
//     .get<IEvent[]>('http://localhost:3001/events', {
//         headers: {
//             Authorization: localStorage.getItem('Authorization'),
//         },
//     })
//     .then((res) => {
//         console.log('res', res);
//         setEvents(res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

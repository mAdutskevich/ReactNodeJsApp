import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, CodeResponse } from '@react-oauth/google';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonType } from 'enums/ButtonType';
import { ButtonDesignType } from 'enums/ButtonDesignType';
import { InputType } from 'enums/InputType';
import { IAuth } from 'interfaces/IAuth';
import { routes } from 'utils/routes';
import { api } from 'api/axiosSettings';
import { requestApi } from 'api/requests';
import { Button } from 'atoms/Button/Button';
import { Input } from 'atoms/Input';
import { GoogleIcon } from 'icons/index';
import classes from './Login.module.scss';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = React.useState([]);

    const initialValues: IAuth = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Incorrect email').required('login is required'),
        password: Yup.string()
            .min(8, 'password should contain 8 chars minimum')
            .matches(/(?=.*?[A-Z])/, 'password should contain 1 uppercase letter')
            .matches(/(?=.*?[a-z])/, 'password should contain 1 lowercase letter')
            .matches(/(?=.*?[0-9])/, 'password should contain 1 number')
            .matches(/(?=.*?[#?!@$%^&*-])/, 'password should contain 1 special character')
            .required('password is required'),
    });

    const onSubmit = (data: IAuth) => {
        api(requestApi.login(data))
            .then((response) => {
                localStorage.setItem('Authorization', response.data.token);
                localStorage.setItem('RefreshToken', response.data.refreshToken);

                setFormErrors([]);
                navigate(routes.home);
            })
            .catch((err) =>
                setFormErrors(
                    err.response.data?.errors?.length ? err.response.data.errors : err.code,
                ),
            );
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleSignUp = (): void => {
        navigate(routes.register);
    };

    const handleGoogleSuccess = (data: CodeResponse) => {
        api(requestApi.authGoogle(data))
            .then((response) => {
                localStorage.setItem('Authorization', response.data.token);
                localStorage.setItem('RefreshToken', response.data.refreshToken);

                setFormErrors([]);
                navigate(routes.home);
            })
            .catch((err) => console.warn('err', err));
    };

    const handleGoogleLogIn = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        flow: 'auth-code',
    });

    return (
        <div className={classes.login}>
            <h2 className={classes.title}>Log In</h2>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Input
                    id="email"
                    label="Email"
                    name="email"
                    placeholder="Email"
                    type={InputType.TEXT}
                    className={classes.input}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email}
                />
                <Input
                    id="password"
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type={InputType.PASSWORD}
                    className={classes.inputLast}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password}
                />

                {!!formErrors.length && (
                    <div className="">
                        {formErrors.map((item) => (
                            <p key={`error-${item.error}`} className={classes.error}>
                                {item.code}
                            </p>
                        ))}
                    </div>
                )}
                <Button type={ButtonType.SUBMIT} label="Submit" isFullWidth />
            </form>
            <Button
                type={ButtonType.BUTTON}
                label="Sign Up"
                isFullWidth
                onClick={handleSignUp}
                designType={ButtonDesignType.SECONDARY}
                className={classes.signupButton}
            />
            <div className={classes.lineWrapper}>
                <div className={classes.line} />
                <div className={classes.text}>or</div>
            </div>
            <Button
                type={ButtonType.BUTTON}
                label="Log in with Google"
                isFullWidth
                onClick={handleGoogleLogIn}
                designType={ButtonDesignType.SECONDARY}
                leftIcon={<GoogleIcon />}
                className={classes.googleButton}
            />
        </div>
    );
};

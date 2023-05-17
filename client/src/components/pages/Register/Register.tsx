import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
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
import classes from './Register.module.scss';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = React.useState([]);

    const initialValues: IAuth = {
        email: '',
        password: '',
        confirmpassword: '',
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
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('password is required'),
    });

    const onSubmit = (data: IAuth) => {
        api(requestApi.register(data))
            .then((response) => {
                localStorage.setItem('Authorization', response.data.token);
                localStorage.setItem('RefreshToken', response.data.refreshToken);

                setFormErrors([]);
                navigate(routes.home);
            })
            .catch((err) => {
                setFormErrors(
                    err.response.data?.errors?.length ? err.response.data.errors : err.code,
                );
            });
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleSignUp = (): void => {
        navigate(routes.login);
    };

    const handleGoogleSignUp = useGoogleLogin({
        onSuccess: (codeResponse) => console.warn(codeResponse),
        flow: 'auth-code',
    });

    return (
        <div className={classes.register}>
            <h2 className={classes.title}>Register</h2>
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
                <Input
                    id="confirmpassword"
                    label="Repeat password"
                    name="confirmpassword"
                    placeholder="Repeat password"
                    type={InputType.PASSWORD}
                    className={classes.inputLast}
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmpassword && formik.errors.confirmpassword}
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
                <Button type={ButtonType.SUBMIT} label="Create account" isFullWidth />
            </form>
            <Button
                type={ButtonType.BUTTON}
                label="Log In"
                isFullWidth
                onClick={handleSignUp}
                designType={ButtonDesignType.SECONDARY}
                className={classes.loginButton}
            />
            <div className={classes.lineWrapper}>
                <div className={classes.line} />
                <div className={classes.text}>or</div>
            </div>
            <Button
                type={ButtonType.BUTTON}
                label="Sign up with Google"
                isFullWidth
                onClick={handleGoogleSignUp}
                designType={ButtonDesignType.SECONDARY}
                leftIcon={<GoogleIcon />}
                className={classes.googleButton}
            />
        </div>
    );
};

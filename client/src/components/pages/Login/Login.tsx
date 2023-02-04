import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonType } from 'enums/ButtonType';
import { ButtonDesignType } from 'enums/ButtonDesignType';
import { InputType } from 'enums/InputType';
import { routes } from 'utils/routes';
import { Button } from 'atoms/Button/Button';
import { Input } from 'atoms/Input';
import classes from './Login.module.scss';

interface IAuth {
    email: string;
    password: string;
}

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
        axios
            .post('http://localhost:3001/auth/login', data)
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

    return (
        <div className={classes.login}>
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
            />
        </div>
    );
};

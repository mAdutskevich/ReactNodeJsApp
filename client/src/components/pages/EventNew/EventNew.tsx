import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonType } from 'enums/ButtonType';
import { InputType } from 'enums/InputType';
import { routes } from 'utils/routes';
import { Button } from 'atoms/Button/Button';
import { Input } from 'atoms/Input';
import { TextArea } from 'atoms/TextArea';
import { Datepicker } from 'atoms/Datepicker';
import classes from './EventNew.module.scss';

interface INewEvent {
    title: string;
    description: string;
    address: string;
    participantsMin: number | undefined;
    participantsMax: number | undefined;
    dateFrom: number | null;
    dateTo: number | null;
}

export const EventNew: React.FC = () => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = React.useState([]);

    const initialValues: INewEvent = {
        title: '',
        description: '',
        address: '',
        participantsMin: 0,
        participantsMax: undefined,
        dateFrom: null, //format(new Date(), DATE_FORMAT)
        dateTo: null, //format(new Date(), DATE_FORMAT)
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('title is required'),
        description: Yup.string().required('description is required'),
        address: Yup.string().required('address is required'),
        participantsMin: Yup.number()
            .required('participants quantity is required')
            .positive('quantity must be positive')
            .integer('quantity must be integer'),
        participantsMax: Yup.number()
            .nullable(true)
            // .required('participants quantity is required')
            .when('participantsMin', (participantsMin) => {
                if (participantsMin) {
                    return Yup.number()
                        .positive('quantity must be positive')
                        .integer('quantity must be integer')
                        .min(
                            participantsMin,
                            'max quantity must be more or equal then min quantity',
                        )
                        .nullable(true);
                }
            }),
        dateFrom: Yup.number().nullable(true).required('start date is required'),
        dateTo: Yup.number()
            .nullable(true)
            .when('dateFrom', (dateFrom) => {
                if (dateFrom) {
                    return Yup.number()
                        .min(dateFrom, 'End Date must be after Start Date')
                        .nullable(true);
                }
            }),
    });

    const handleSubmit = (data: INewEvent) => {
        console.log('data submit', data);

        axios
            .post('http://localhost:3001/events/new', data, {
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                },
            })
            .then((response) => {
                console.log('response', response);

                if (response.data?.errors?.length) {
                    console.log('errors');
                    setFormErrors(response.data.errors);
                } else {
                    console.log('success');
                    // localStorage.setItem('Authorization', response.data.token);
                    setFormErrors([]);
                    navigate(routes.home);
                }
            });
    };

    return (
        <div className={classes.container}>
            <div className={classes.title}>Create event</div>
            <div className={classes.formContainer}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(props) => (
                        <Form className={classes.form}>
                            {/* onSubmit={formik.handleSubmit} */}
                            <Input
                                id="title"
                                label="Title"
                                name="title"
                                placeholder="title"
                                type={InputType.TEXT}
                                className={classes.input}
                                value={props.values.title}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                error={props.touched.title && props.errors.title}
                            />
                            <TextArea
                                id="description"
                                label="Description"
                                name="description"
                                placeholder="Description"
                                className={classes.input}
                                value={props.values.description}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                error={props.touched.description && props.errors.description}
                            />
                            <Input
                                id="address"
                                label="Address"
                                name="address"
                                placeholder="address"
                                type={InputType.TEXT}
                                className={classes.input}
                                value={props.values.address}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                error={props.touched.address && props.errors.address}
                            />
                            <div className={classes.inputRangeWrapper}>
                                <Input
                                    id="participantsMin"
                                    label="Min participants quantity"
                                    name="participantsMin"
                                    placeholder="Participants quantity"
                                    type={InputType.NUMBER}
                                    className={classes.inputRangeInput}
                                    value={props.values.participantsMin}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    error={
                                        props.touched.participantsMin &&
                                        props.errors.participantsMin
                                    }
                                />
                                <Input
                                    id="participantsMax"
                                    label="Max participants quantity"
                                    name="participantsMax"
                                    placeholder="Participants quantity"
                                    type={InputType.NUMBER}
                                    className={classes.inputRangeInput}
                                    value={props.values.participantsMax}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    error={
                                        props.touched.participantsMax &&
                                        props.errors.participantsMax
                                    }
                                />
                            </div>
                            <div className={classes.dateRangeWrapper}>
                                <Datepicker
                                    label="Date from"
                                    name="dateFrom"
                                    value={props.values.dateFrom}
                                    onChange={(date) => props.setFieldValue('dateFrom', date)}
                                    className={classes.dateRange}
                                    showTime
                                    minDate={Date.now()}
                                    error={props.touched.dateFrom && props.errors.dateFrom}
                                />
                                <Datepicker
                                    label="Date to"
                                    name="dateTo"
                                    value={props.values.dateTo}
                                    onChange={(date) => props.setFieldValue('dateTo', date)}
                                    className={classes.dateRange}
                                    showTime
                                    minDate={Date.now()}
                                    error={props.touched.dateTo && props.errors.dateTo}
                                />
                            </div>
                            {!!formErrors.length && (
                                <div className="">
                                    {formErrors.map((item) => (
                                        <p key={`error-${item.error}`} className={classes.error}>
                                            {item.error}
                                        </p>
                                    ))}
                                </div>
                            )}
                            <Button
                                type={ButtonType.SUBMIT}
                                className={classes.button}
                                label="Create Event"
                                isFullWidth
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

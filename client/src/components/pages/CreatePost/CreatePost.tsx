import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

import { Formik, Form, Field, ErrorMessage } from 'formik';

interface IPost {
    title: string;
    postText: string;
    userName: string;
}

export const CreatePost: React.FC = () => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = React.useState([]);

    const initialValues: IPost = {
        title: '',
        postText: '',
        userName: '',
    };

    const onSubmit = (data: IPost) => {
        axios.post('http://localhost:3001/posts', data).then((response) => {
            if (response.data?.errors?.length) {
                setFormErrors(response.data?.errors);
            } else {
                setFormErrors([]);
            }

            navigate('/');
        });
        // .catch((err) => {
        //     console.log('err', err);
        // });
    };

    const SignupSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        postText: Yup.string().required('Post is required'),
        userName: Yup.string()
            .min(2, 'Author name should be longer')
            .max(25, 'Author name should be shorter')
            .required('Author is required'),
    });

    return (
        <div className="createPostPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={SignupSchema}
            >
                <Form>
                    <label htmlFor="title">Title</label>
                    <Field
                        id="title"
                        name="title"
                        placeholder="Title"
                        type="text"
                        autoComplete="off"
                    />
                    <ErrorMessage name="title" component="div" />

                    <label htmlFor="postText">Post</label>
                    <Field
                        id="postText"
                        name="postText"
                        placeholder="Description"
                        type="text"
                        autoComplete="off"
                    />
                    <ErrorMessage name="postText" component="div" />

                    <label htmlFor="userName">Author</label>
                    <Field
                        id="userName"
                        name="userName"
                        placeholder="Author"
                        type="text"
                        autoComplete="off"
                    />
                    <ErrorMessage name="userName" component="div" />

                    {!!formErrors.length && (
                        <div>
                            {formErrors.map((item) => (
                                <div key={`error-${item.path}`}>{item.message}</div>
                            ))}
                        </div>
                    )}
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

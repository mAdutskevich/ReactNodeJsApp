import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface IComment {
    commentBody: string;
}

export const Post: React.FC = () => {
    const [post, setPost] = React.useState(null);
    const [comments, setComments] = React.useState([]);
    const params = useParams();

    const initialValues: IComment = {
        commentBody: '',
    };

    const getPost = async (id: string) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data);
        });
    };

    const getComments = async (id: string) => {
        axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
            setComments(res.data);
        });
    };

    React.useEffect(() => {
        getPost(params.id);
        getComments(params.id);
    }, [params.id]);

    const onSubmit = (data: IComment, formikBag: FormikHelpers<IComment>) => {
        const dataWithId = {
            ...data,
            PostId: params.id,
        };

        axios
            .post('http://localhost:3001/comments', dataWithId, {
                headers: {
                    Authorization: localStorage.getItem('Authorization'),
                },
            })
            .then((response) => {
                if (!response.data.errors?.length) {
                    formikBag.resetForm();
                    getComments(params.id);
                }
            });
    };

    const ValidationSchema = Yup.object().shape({
        commentBody: Yup.string()
            .max(500, 'Comment should be shorter')
            .required('Comment is required'),
    });

    return (
        <div className="createPostPage">
            {post && (
                <div>
                    <div>{post.title}</div>
                    <div>{post.postText}</div>
                    <div>{post.userName}</div>
                </div>
            )}

            <div>Comments:</div>
            <div>
                {comments.map((item) => (
                    <div key={`comment-${item.id}`}>
                        {item.commentBody}({item.username})
                    </div>
                ))}
            </div>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={ValidationSchema}
                >
                    <Form>
                        <label htmlFor="commentBody">Title</label>
                        <Field
                            id="commentBody"
                            name="commentBody"
                            placeholder="Comment"
                            type="text"
                            autoComplete="off"
                        />
                        <ErrorMessage name="commentBody" component="div" />

                        <button type="submit">Send</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

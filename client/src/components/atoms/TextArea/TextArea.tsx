import React from 'react';
import classNames from 'classnames';
import classes from './TextArea.module.scss';

interface IProps {
    id: string;
    label: string;
    name: string;
    placeholder?: string;
    rows?: number;
    className?: string;
    value: string | number;
    error?: string;
    isDisabled?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
}

export const TextArea: React.FC<IProps> = (props) => {
    return (
        <div className={classNames(classes.container, props.className)}>
            {!!props.label && (
                <label htmlFor={props.id} className={classes.label}>
                    {props.label}
                </label>
            )}
            <div className={classes.inputWrapper}>
                <textarea
                    id={props.id}
                    name={props.name}
                    rows={props.rows || 8}
                    value={props.value}
                    placeholder={props.placeholder}
                    autoComplete="off"
                    disabled={props.isDisabled}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    className={classNames(classes.textarea, {
                        [classes.textareaError]: props.error,
                        [classes.textareaDisabled]: props.isDisabled,
                    })}
                />
            </div>

            <div className={classes.errorContainer}>
                {!!props.error && <p className={classes.error}>{props.error}</p>}
            </div>
        </div>
    );
};

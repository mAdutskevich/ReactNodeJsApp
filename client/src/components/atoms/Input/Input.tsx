import React from 'react';
import classNames from 'classnames';
import { InputType } from 'enums/InputType';
import { ButtonType } from 'enums/ButtonType';
import { EyeShowIcon, EyeHideIcon } from 'icons';
import classes from './Input.module.scss';

interface IProps {
    id: string;
    label: string;
    name: string;
    placeholder?: string;
    type: InputType.EMAIL | InputType.NUMBER | InputType.PASSWORD | InputType.TEXT;
    className?: string;
    value: string | number;
    error?: string;
    // isRequired?: boolean; will be added in future
    isDisabled?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
}

export const Input: React.FC<IProps> = (props) => {
    const [isHide, setIshide] = React.useState<boolean>(true);
    const calculatedInputType = React.useMemo(() => {
        if (props.type) {
            if (props.type === InputType.PASSWORD) {
                if (isHide) {
                    return InputType.PASSWORD;
                }

                return InputType.TEXT;
            }

            return props.type;
        }

        return InputType.TEXT;
    }, [props.type, isHide]);

    const handleVisibilityClick = (): void => {
        setIshide(!isHide);
    };

    return (
        <div className={classNames(classes.container, props.className)}>
            {!!props.label && (
                <label htmlFor={props.id} className={classes.label}>
                    {props.label}
                </label>
            )}
            <div className={classes.inputWrapper}>
                <input
                    id={props.id}
                    type={calculatedInputType}
                    name={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    autoComplete="off"
                    // required={props.isRequired}
                    disabled={props.isDisabled}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    className={classNames(classes.input, {
                        [classes.inputError]: props.error,
                        [classes.inputDisabled]: props.isDisabled,
                        [classes.inputPassword]: props.type === InputType.PASSWORD,
                    })}
                />
                {props.type === InputType.PASSWORD && (
                    <button
                        type={ButtonType.BUTTON}
                        className={classes.iconWrapper}
                        onClick={handleVisibilityClick}
                    >
                        {isHide && <EyeShowIcon className={classes.icon} />}
                        {!isHide && <EyeHideIcon className={classes.icon} />}
                    </button>
                )}
            </div>

            <div className={classes.errorContainer}>
                {!!props.error && <p className={classes.error}>{props.error}</p>}
            </div>
        </div>
    );
};

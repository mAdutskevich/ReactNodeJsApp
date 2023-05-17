import React from 'react';
import classNames from 'classnames';
import { CalendarIcon } from 'icons/index';
import classes from './CustomInput.module.scss';

interface IProps {
    value?: string;
    label?: string;
    name?: string;
    error?: string;
    onClick?: () => void;
    onChange?: () => void;
    onFocus?: () => void;
}

export const CustomInput = React.forwardRef<HTMLInputElement, IProps>((props, ref) => (
    <div className={classes.container}>
        <span className={classes.iconWrapper}>
            <CalendarIcon className={classes.icon} />
        </span>
        <input
            className={classNames(classes.input, {
                [classes.inputError]: props.error,
            })}
            type="text"
            value={props.value}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onClick={props.onClick}
            readOnly
            ref={ref}
            placeholder={props.label}
            name={props.name}
        />
    </div>
));

CustomInput.displayName = 'CustomInput';

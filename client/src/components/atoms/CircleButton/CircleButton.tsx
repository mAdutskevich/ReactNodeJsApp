import React from 'react';
import classNames from 'classnames';
import { ButtonType } from 'enums/ButtonType';
import { PlusIcon } from 'icons/index';
import classes from './CircleButton.module.scss';

interface IProps {
    label?: string;
    onClick: () => void;
    className?: string;
}

export const CircleButton: React.FC<IProps> = (props) => {
    return (
        <button
            type={ButtonType.BUTTON}
            className={classNames(classes.button, props.className)}
            onClick={props.onClick}
            title={props.label}
        >
            <PlusIcon className={classes.icon} />
        </button>
    );
};

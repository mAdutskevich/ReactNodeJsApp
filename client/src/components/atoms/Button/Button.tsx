import React from 'react';
import classNames from 'classnames';
import { ButtonType } from 'enums/ButtonType';
import { ButtonDesignType } from 'enums/ButtonDesignType';
import classes from './Button.module.scss';

interface IProps {
    label: string;
    onClick?: () => void;
    type?: ButtonType.BUTTON | ButtonType.SUBMIT | ButtonType.RESET;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    designType?:
        | ButtonDesignType.SECONDARY
        | ButtonDesignType.WARNING
        | ButtonDesignType.NOTIFICATION;
    isFullWidth?: boolean;
    isWithoutBorder?: boolean;
    className?: string;
}

export const Button: React.FC<IProps> = (props) => {
    return (
        <button
            type={props.type || ButtonType.BUTTON}
            className={classNames(classes.button, props.className, {
                [classes.fullWidth]: props.isFullWidth,
                [classes.withoutBorder]: props.isWithoutBorder,
                [classes.secondary]: props.designType === ButtonDesignType.SECONDARY,
                [classes.warning]: props.designType === ButtonDesignType.WARNING,
                [classes.notification]: props.designType === ButtonDesignType.NOTIFICATION,
            })}
            onClick={props.onClick}
        >
            <div className={classes.container}>
                {props.leftIcon}
                <p
                    className={classNames({
                        [classes.leftIconMargin]: props.leftIcon,
                        [classes.rightIconMargin]: props.rightIcon,
                    })}
                >
                    {props.label}
                </p>
                {props.rightIcon}
            </div>
        </button>
    );
};

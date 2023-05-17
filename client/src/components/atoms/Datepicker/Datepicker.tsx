import React from 'react';
import { getUnixTime } from 'date-fns';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { DATE_FORMAT, DATETIME_FORMAT } from 'constants/constants';
import { CustomInput } from './CustomInput';
import './Datepicker.lib.scss';
import classes from './Datepicker.module.scss';

interface IProps {
    name: string;
    value: number;
    label?: string;
    className?: string;
    maxDate?: number;
    minDate?: number;
    showTime?: boolean;
    error?: string;
    onChange(value: number): void;
}

export const Datepicker: React.FC<IProps> = (props) => {
    const calculatedValue = React.useMemo(() => {
        if (props.value) {
            if (props.showTime) {
                return new Date(props.value * 1000);
            }

            return new Date(props.value * 1000);
        }

        return null;
    }, [props.value, props.showTime]);

    const onChange = React.useCallback(
        (date: Date) => {
            props.onChange(getUnixTime(date));
        },
        [props.onChange],
    );

    return (
        <div className={classNames(classes.container, props.className)}>
            {!!props.label && (
                <label htmlFor={props.name} className={classes.label}>
                    {props.label}:
                </label>
            )}
            <DatePicker
                id={props.name}
                selected={calculatedValue}
                onChange={onChange}
                name={props.name}
                dateFormat={props.showTime ? DATETIME_FORMAT : DATE_FORMAT}
                maxDate={props.maxDate ? new Date(props.maxDate) : null}
                minDate={props.minDate ? new Date(props.minDate) : null}
                customInput={<CustomInput label={props.label} error={props.error} />}
                showTimeSelect={props?.showTime}
                timeIntervals={15}
                // popperPlacement="bottom-start"
            />
            <div className={classes.errorContainer}>
                {!!props.error && <p className={classes.error}>{props.error}</p>}
            </div>
        </div>
    );
};

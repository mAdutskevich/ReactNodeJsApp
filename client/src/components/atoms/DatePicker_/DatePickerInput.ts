import React from 'react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from 'icons/index';
import classes from './DatePickerInput.module.scss';

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

export const DatePickerInput: React.FC<IProps> => (
    props,
    // {
    // value,
    // placeholder,
    // isErrored,
    // // errorMsg,
    // // isRequired,
    // isDisabled,
    // isDateEditable,
    // minDate,
    // maxDate,
    // onChange,
    // onCalendarClose,
    // // isInitiallyOpened,
    // }
) => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [placeholderText, setPlaceholderText] = React.useState(props.placeholder);
    const formDatePickerInputStyles = classNames({
        [classes.FormDatePicker]: true,
        [classes.FormDatePickerError]: props.error,
        [classes.FormDatePickerDisabled]: props.isDisabled,
    });

    React.useEffect(() => {
        if (props.value) {
            setPlaceholderText(props.placeholder);
        }
    }, [props.value, props.placeholder]);

    const handleDateOnchange = (date) => {
        setStartDate(date);
        setPlaceholderText('');
        props.onChange?.(date);
    };

    // const handleDateCalendarClose = () => {
    //     onCalendarClose?.();
    // };

    // const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    //     <div className={formDatePickerInputStyles} onClick={onClick} ref={ref}>
    //         {value ? value : placeholderText}

    //         <div className={styles.FormDatePickerIcon}>
    //             <CalendarIcon />
    //         </div>
    //     </div>
    // ));

    return (
        <div
            className={classNames(
                classes.FormDatePickerWrapper,
                // isDateEditable && classes.FormDatePickerDateEditable,
            )}
        >
            // <DatePicker
            //     selected={value}
            //     onChange={handleDateOnchange}
            //     startOpen={isInitiallyOpened}
            //     onCalendarClose={handleDateCalendarClose}
            //     required={isRequired}
            //     disabled={isDisabled}
            //     popperPlacement="bottom"
            //     popperModifiers={{
            //         flip: {
            //             behavior: ['bottom'],
            //         },
            //     }}
            //     // customInput={<CustomInput />}
            //     minDate={minDate}
            //     maxDate={maxDate}
            //     showYearDropdown={isDateEditable}
            //     showMonthDropdown={isDateEditable}
            // />

            // {props.error && !!errorMsg && (
            //     <div className={classes.FormDatePickerErrorMsg}>{errorMsg}</div>
            // )}
        </div>
    );
};

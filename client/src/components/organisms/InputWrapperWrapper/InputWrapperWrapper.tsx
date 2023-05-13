import React from 'react';
import { Input } from 'atoms/Input';
import { InputType } from 'enums/InputType';
import { InputWrapper } from '../InputWrapper';

interface InputWrapperWrapper {
    formData: {
        name: {
            value: string;
        };
        wrapperName: {
            value: string;
        };
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputWrapperWrapper: React.FC<InputWrapperWrapper> = React.memo((props) => {
    console.log('InputWrapperWrapper');

    return (
        <div>
            <div>InputWrapperWrapper</div>

            <InputWrapper data={props.formData.name} onChange={props.onChange} />
            <Input
                id="wrapperName"
                label="WrapperName"
                name="wrapperName"
                placeholder="WrapperName"
                type={InputType.TEXT}
                value={props.formData.wrapperName.value}
                onChange={props.onChange}
            />
        </div>
    );
});

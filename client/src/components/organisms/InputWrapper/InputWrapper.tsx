import React from 'react';
import { Input } from 'atoms/Input';
import { InputType } from 'enums/InputType';

interface IInputWrapper {
    data: {
        value: string;
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputWrapper: React.FC<IInputWrapper> = React.memo((props) => {
    console.log('InputWrapper');

    return (
        <div>
            <div>InputWrapper</div>

            <Input
                id="name"
                label="Name"
                name="name"
                placeholder="Name"
                type={InputType.TEXT}
                value={props.data.value}
                onChange={props.onChange}
            />
        </div>
    );
});

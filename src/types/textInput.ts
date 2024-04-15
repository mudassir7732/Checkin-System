import { CSSProperties, ChangeEventHandler } from "react";

export interface TextInputProps {
    name: string;
    label?: string;
    helperText?: string | false | undefined;
    placeholder?: string;
    type?: string | number;
    fullWidth?: boolean;
    autoFocus?:boolean;
    size: 'small' | 'medium';
    value: string | number | null;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string | undefined;
    error?: boolean | "" | undefined;
    style?: CSSProperties;
}
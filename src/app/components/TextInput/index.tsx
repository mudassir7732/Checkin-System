"use client"
import { ChangeEvent, FC} from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TextInputProps } from "@/app/types/textInput";


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputBase-input": {
            height: '12px',
            border: '1px solid #d9d9d9 !important',
            borderRadius:'4px',
            paddingInline: '12px',
        },
    }
}))

const TextInput: FC<TextInputProps> = (props) => {
    const classes = useStyles();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event);
    };

    return (
        <TextField
            name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            error={Boolean(props.helperText)}
            fullWidth={props.fullWidth}
            size={props.size}
            helperText={props.helperText}
            value={props.value}
            onChange={handleInputChange}
            style={props.style}
            autoFocus={props.autoFocus}
            className={`${props.className} ${classes.root}`}
        />
    );
}
export default TextInput;
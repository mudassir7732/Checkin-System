"use client"
import React, { FC } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { CustomButtonProps } from "@/app/types/customButton";

const CustomButton: FC<CustomButtonProps> = (props) => {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: props.variant === 'contained' ? '#fff' : '#000',
        backgroundColor: props.variant === 'contained' ? '#7b5aff':'#fff',
        border: props.variant === 'contained' ? '1px solid #7b5aff' : '1px solid #b4b4b4',
        textTransform: 'none',
        fontWeight: '500',
        borderRadius: '50px',
        '&:hover': {
        backgroundColor: props.variant === 'contained' ? '#7b5aff':'#fff',
        },
    }));

    return (
        <ColorButton
            variant={props.variant}
            onClick={props.onClick}
            type={props.type}
            style={props.style}
            fullWidth={props.fullWidth}
            className={props.className}
        >
            {props.title}
        </ColorButton>
    );
}
export { CustomButton as Button };
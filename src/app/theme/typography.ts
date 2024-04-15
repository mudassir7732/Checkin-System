import { CSSProperties } from "react";

// interface TypographyOptions {
//     fontFamily: string;
//     h1: CSSProperties ;
//     h3: CSSProperties;
//     subtitle: CSSProperties;
//     body: CSSProperties;
// }

export const typography: () => any = () => {
    return {
        fontFamily: '',
        h1: {
            fontSize: '20px',
            fontWeight: '600',
        },
        h3: {
            fontSize: '20px',
            fontWeight: '600',
        },
        subtitle: {
            fontSize: '20px',
            fontWeight: '600',
        },
        body: {
            fontSize: '20px',
            fontWeight: '600',
        },
        buttonTitle:{
            fontSize:'14px',
            fontWeight:'500'
        }
    };
};

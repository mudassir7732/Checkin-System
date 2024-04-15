export interface CustomButtonProps {
    title: React.ReactNode;
    variant: "text" | "outlined" | "contained";
    onClick?: () => void;
    fullWidth?: boolean;
    type:'submit' | 'button' | 'reset',  
    style?: React.CSSProperties;
    className?: string | undefined;
}
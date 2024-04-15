"use client"
import { createTheme } from "@mui/material";
import palette from "./palette";
import {typography} from './typography';

const theme= createTheme({
    typography,
    palette,
})
export default theme;
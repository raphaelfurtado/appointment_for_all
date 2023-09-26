import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "../Input/styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement  >{}

export default function Input({...rest}: InputProps) {
    return (
        <input className={styles.input} {...rest} />
    );
}
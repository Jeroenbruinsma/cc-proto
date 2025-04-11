import { useAuth } from "../../AuthProvider";
import styles from "./PlatformMessage.module.css";
import { PlatformMessageProps } from "./Props";

export default function PlatformMessage({msg}:PlatformMessageProps) {
    const {token} = useAuth()
    if(!token) return null
    if(msg === "") return null
    return (
        <div className={styles.messageBar}>
            <p>{msg}</p>
        </div>
    );
}
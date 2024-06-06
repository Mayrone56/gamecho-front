//composant de du petit bouton interrupteur pour Dark / light Mode 
import Toggle from "react-toggle";
import style from "../styles/Toggle.module.css"

const CustomToggle = ({ isToggled, onToggle }) => {

    return (
        <label className={style.switch}>
            <input type={"checkbox"} checked={isToggled} onChange={onToggle} />
            <span className={style.slider} />
        </label>
    )
};

export default CustomToggle;
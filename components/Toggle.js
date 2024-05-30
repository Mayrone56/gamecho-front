//composant de du petit bouton interrupteur pour Dark / light Mode 
import React from "react";
import style from "../styles/Toggle.module.css"

const Toggle = ({ isToggled, onToggle }) => {

    return (
        <label className={style.switch}>
            <input type={"checkbox"} checked={isToggled} onChange={onToggle} />
            <span className={style.slider} />
        </label>
    )
};

export default Toggle
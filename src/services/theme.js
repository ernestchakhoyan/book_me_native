import dark from "../theme/dark";
import light from "../theme/light";

const themePicker = (theme) => {
    switch (theme){
        case "dark":
            return dark;
        case "light":
            return light;
        default:
            return light;
    }
}

export {themePicker}
import colors from "../theme/colors";
import { metrics } from "./vars";

export const centered_screen = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
};

export const centered = {
    justifyContent: "center",
};

export const column_view = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
}

export const button = {
    button: {
        padding: metrics.spacing_md(),
        width: 120
    }
}

export const box_shadow = {
    shadowColor: colors.secondary,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5
}
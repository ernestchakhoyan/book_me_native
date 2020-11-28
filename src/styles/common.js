import colors from "../theme/colors";

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

export const dark_bg = {
    backgroundColor: colors.appDarkBG
};

export const box_shadow = {
    shadowColor: colors.secondary,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5
}
import { Dimensions } from 'react-native';
import colors from "../theme/colors";

export const centered_screen = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
};

export const dark_bg = {
    backgroundColor: "#000"
};

export const box_shadow = {
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: "#97c4ef",
    // flex: 1,
    width: Dimensions.get('window').width - 30,
    margin: 15,
    padding: 15,
}
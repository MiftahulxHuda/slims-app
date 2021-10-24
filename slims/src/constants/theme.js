  
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#4B57B9",
    lightPrimary: "#4b57b9e6",
    // primary: "#364fc7",
    // secondary: "#25282F",

    // colors
    black: "#1E1B26",
    white: "#FFFFFF",
    // lightGray: "#64676D",
    // lightGray2: "#EFEFF0",
    // lightGray3: '#D4D5D6',
    // lightGray4: '#7D7E84',
    // gray: "#2D3038",
    // gray1: "#282C35",
    gray1: "#868e96",
    gray3: "#343a40",
    lightGray: "#f8f9fa",
    lightGray2: "#e9ecef",
    lightGray3: "#dee2e6",
    lightGray4: "#ced4da",

    darkRed: "#31262F",
    // lightRed: "#C5505E",
    lightRed: "#e03131",
    darkBlue: "#22273B",
    lightBlue: "#424BAF",
    darkGreen: "#213432",
    lightGreen: "#31Ad66",

};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    navigationTitle: { fontFamily: "Roboto-Bold", fontSize: 18, lineHeight: 22, fontWeight: undefined },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
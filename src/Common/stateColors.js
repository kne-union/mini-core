const stateColors = {
    default: "#666666",
    result: "#666666",
    success: "#027A48",
    progress: "#F09700",
    danger: "#D14343",
    info: "#155ACF",
    other: "#6740C3",
    primary: "#5CB8B2"
};

export default stateColors;

export const presetStateColors = (colors) => {
    Object.assign(stateColors, colors);
};

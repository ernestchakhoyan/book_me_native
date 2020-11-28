const borderWidth = (width) => {
    return {
        borderWidth: width
    };
}

const metrics = {
    spacing: 5,
    spacing_md(){
        return this.spacing * 3
    },
    spacing_lg(){
        return this.spacing * 6
    } ,
    border_width: borderWidth(1),
    border_width_md: borderWidth(3),
    border_width_lg: borderWidth(5),
};

export {
    metrics
}
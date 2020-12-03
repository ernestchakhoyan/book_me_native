const metrics = {
    spacing: 5,
    spacing_md(){
        return this.spacing * 3
    },
    spacing_lg(){
        return this.spacing * 6
    } ,
    border_width: 1,
    border_width_md: 3,
    border_width_lg: 5,
    border_radius: 5,
    border_radius_md(){
        return this.spacing * 2
    },
    border_radius_lg(){
        return this.spacing * 4
    },
    border_radius_circle(){
        return `${this.spacing * 10}%`
    },
};

export {
    metrics
}
// Adjusting width of cards in different screen views.
export const adjustCardWidth = (w) => {
    if (w >= 300 && w <= 640){
        return "24rem";
    }
    else if (w >= 641 && w <= 1007){ 
        return "20rem"; 
    }
    else{
        return "35rem";
    }
}


// Adjusting the amount of text shown in cards due to screen views.
// TODO: Add another clause for if the text is greater than 15 characters do text.slice()
export const adjustTextWidth = (width, text) => {
    if (width >= 300 && width <= 640){
        return text.slice(0,25) + "...";
    }
    else if (width >= 641 && width <= 1007){ 
        return text.slice(0,25) + "..."; 
    }
    else{
        return text;
    }
}


export const adjustTextSize = (width) => {
    if (width >= 300 && width <= 640){
        return "22px";
    }
    else if (width >= 641 && width <= 1007){ 
        return "32px"; 
    }
    else{
        return "42px";
    }
}
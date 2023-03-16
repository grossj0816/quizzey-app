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
export const adjustTextWidth = (width, text) => {
    if (width >= 300 && width <= 640){

        return text.length >= 25 ? text.slice(0,25) + "..." : text
    }
    else if (width >= 641 && width <= 1007){ 
        return text.length >= 25 ? text.slice(0,25) + "..." : text; 
    }
    else{
        return text;
    }
}


// Adjust text size of text based on screen views.
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


// handle random generation of creating a user icon.
export const handleUserIcon = () => {
    return(
        <img
        src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=Felix&flip=true&rotate=0&size=30&eyes=roundFrame02,robocop,eva"
        style={{borderRadius: "50%"}}
        alt="avatar"
        />
    );
}

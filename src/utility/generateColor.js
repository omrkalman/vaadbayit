export function stringToColor(str) {
    let hash = 0;
    str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value;
        if (i === 0) {
            // Set the red component to be minimal or 0.
            value = 0x00; 
        } else {
            value = (hash >> ((i-1) * 8)) & 0xff;
        }
        colour += value.toString(16).padStart(2, '0');
    }
    return colour;
}

export function onlyDarkGreens(str) {
    let hash = 0;
    str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value;
        if (i === 0) {
            // Set red component to 0
            value = 0x00;
        } else if (i === 1) {
            // Set green component with enough variation but ensure it's relatively dark
            value = (hash & 0x7F) | 0x30; // [0x30, 0xBF]
        } else {
            // Allow more variability in blue component but keep it somewhat restricted
            value = hash & 0x7F; // [0x00, 0x7F]
        }
        colour += value.toString(16).padStart(2, '0');
    }
    return colour;
}
//This function checks if the color input is light. It returns true if it is light and false otherwise.
//Useful to set right contrasting font color
export const hex_is_light = (color) => {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness > 155;
}

//Similar function that I ended up not using
export const colorIsDarkOrLight = (color) => {
  console.log('color', color);
  var hex = color.replace("#", "");
  var c_r, c_g, c_b, brightness = "";
  if (hex.length === 3) {
    c_r = parseInt(hex.substr(0, 2), 16);
    c_g = parseInt(hex.substr(1, 2), 16);
    c_b = parseInt(hex.substr(2, 2), 16);
    brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  } else {
    c_r = parseInt(hex.substr(0, 2), 16);
    c_g = parseInt(hex.substr(2, 2), 16);
    c_b = parseInt(hex.substr(4, 2), 16);
  } return brightness > 155;
}



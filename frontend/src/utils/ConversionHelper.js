export const replaceWhiteSpacesWithDashSymbolInUrl = (inputString) => {
  if (inputString != undefined && inputString != null && inputString.length > 0) {

    //--replace extra space with one space
    let newString = inputString.replace(/\s\s+/g, ' ');

    //--replace space with '-' character
    newString = newString.replace(/\s+/g, '-').toLowerCase();

    //--replace '/' with '-' character
    return newString.replaceAll('/', '-').toLowerCase();

  } else {
    return inputString;
  }
}




  export const makePriceRoundToTwoPlaces = (price) => {
    price = price ?? 0;
    return +(Math.round(price + "e+2") + "e-2");
  
  }


// shuffle chart series
export function shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Chart Colors Set
export function getChartColorsArray(colors: any) {
  colors = JSON.parse(colors);
  return colors.map(function (value: any) {
    var newValue = value.replace(" ", "");
    if (newValue.indexOf(",") === -1) {
      var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
      if (color) {
        color = color.replace(" ", "");
        return color;
      }
      else return newValue;;
    } else {
      var val = value.split(',');
      if (val.length == 2) {
        var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
        return rgbaColor;
      } else {
        return newValue;
      }
    }
  });
}

export function getRandomItem(iconclasslist: any) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * iconclasslist.length);
  // get random item
  const item = iconclasslist[randomIndex];

  return item;
}


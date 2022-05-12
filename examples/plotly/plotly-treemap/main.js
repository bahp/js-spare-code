
// Data
var ids= [1, 2, 3, 4, 5, 6, 7]
var labels = ["WOUCUL", "SAUR", "ACLI", "AERY", "ECOL", "ATAZ", "AAUG"];
var parents = ["", "WOUCUL", "SAUR", "SAUR", "WOUCUL", "ECOL", "ECOL"];
var values = [5, 2, 1, 1, 3, 2, 1];
var text = ["HAY", "QUE", "VER", "QUE", "DIFICIL", "ES", "ESTO"]


var data = [{
  type: 'treemap',
  //ids: ids,
  labels: labels,
  parents: parents,
  values: values,
  text: text,
  //textinfo: "label+value+percent",
  //textinfo: '<a href="pages/page1.html" style="cursor: pointer" target="_blank" rel="noopener noreferrer"> L </a>',
  //hovertemplate: '<b>%{label}</b><br>Sales: %{value}<br>',
  texttemplate: " %{label} <br> V=%{value} | <br> T=%{text} <a href='http://google.com' style='cursor: pointer' target='_blank' rel='noopener noreferrer'> LINK </a>"
  //opacity:0.5,
}]

// Layout
var layout = {
  treemapcolorway: ["pink", "lightgray"],
  margin: {
    t:0,
    b:0,
    r:0,
    l:0
  }
}

// Define configuration
var config = {
    responsive: true
}

// Display
Plotly.newPlot('myDiv', data, layout, config);

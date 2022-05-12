
// -------------------------------------------
// Helper methods
// -------------------------------------------
function linspace(a,b,n) {
  var arr = [];
  var step = (b - a) / (n - 1);
  for (var i = 0; i < n; i++) {
    arr.push(a + (step * i));
  }
  return arr;
}

const parabolaGen = (a, b) =>
  x => x*x*a + b;


// -------------------------------------------
// Constants
// -------------------------------------------
viridis_r = [
  '#fde725',
  '#b5de2b',
  '#6ece58',
  '#35b779',
  '#1f9e89',
  '#26828e',
  '#31688e',
  '#3e4989',
  '#482878',
  '#440154'
]

fpr = linspace(0, 1, 10)

data = {
  'split1': [fpr, fpr.map(parabolaGen(1, 0))],
  'split2': [fpr, fpr.map(parabolaGen(1, 0.1))],
  'split3': [fpr, fpr.map(parabolaGen(1, 0.2))],
  'split4': [fpr, fpr.map(parabolaGen(1, 0.3))],
  'split5': [fpr, fpr.map(parabolaGen(1, 0.4))],
  'split6': [fpr, fpr.map(parabolaGen(1, 0.5))],
  'split7': [fpr, fpr.map(parabolaGen(1, 0.6))],
  'split8': [fpr, fpr.map(parabolaGen(1, 0.7))],
  'split9': [fpr, fpr.map(parabolaGen(1, 0.8))],
  'split10': [fpr, fpr.map(parabolaGen(1, 0.9))],
}

// Define diagonal reference line.
var diagonal = {
  x0:0, x1:1, y0:0, y1:1,
  type: 'line',
  line: {
    dash: 'dash',
    colour: 'gray',
    width: 0.75
  }
}

// Create traces
var traces = []

// Fill traces
Object.entries(data).forEach(([key, value]) => {

  // Create trace
  var trace = {
      x: value[0],
      y: value[1],
      name: key,
      marker: {
          size: 2,
          opacity: 0.0 // hidden
      },
      line: {
          width: 1.0
      },
      mode: 'lines+markers'
  }

  // Append
  traces.push(trace)

});

// Define layout
var layout = {
  //title: {
  //  text: 'ROC',
  //  font: {
  //    //family: 'Courier New, monospace',
  //    size: 24
  //  },
  // xref: 'paper',
  //  //x: 0.05,
  //},
  showlegend: true,
  autosize: true,
  //width: 550,
  //height: 550,
  hovermode: 'closest',
  bargap: 0,
  xaxis: {
    title: 'False Positive Rate',
    constrain: 'domain',
    showgrid: true,
    zeroline: false,
    gridwith: 1,
    nticks: 10,
    range: [0, 1],
    gridcolor: 'lightgray'
  },
  yaxis: {
    title: 'True Positive Rate',
    scaleanchor: 'x',
    scaleratio: '1',
    showgrid: true,
    zeroline: false,
    gridwith: 1,
    nticks: 10,
    range: [0, 1],
    gridcolor: 'lightgray'
  },
  legend: {
    x: 1.0,
    y: 0.0,
    font: {
      size: 12
    },
    orientation: "v",
    yanchor: 'botton',
    xanchor: 'right'
  },
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
  },
  colorway: viridis_r,
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  shapes: [diagonal]
};

// Define configuration
var config = {
    responsive: true
}

// Display
Plotly.newPlot('myDiv', traces, layout, config);
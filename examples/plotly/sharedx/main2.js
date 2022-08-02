// ---------------------------------
// Helper methods
// ---------------------------------
function generateData(date, count) {
  /* Generate data. */
  let data = [];
  let hour = 60 * 60 * 1000;
  let lambda = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < count; i++) {
    data[i] = [
      //echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss',
      //  (date.getTime() + i*lambda * hour)),
      new Date(date.getTime() + i*lambda * hour),
      (Math.random() * 1000).toFixed(2),
      Math.floor(Math.random() * 2)
    ]
  }
  return data;
}

function dateComparison(a, b) {
  /* Compare sting dates */
  const date1 = new Date(a)
  const date2 = new Date(b)
  return date1 - date2;
}

// Constants
const N = 3;   // number of abxs
const W = 500; // not used
const H = 75;  // height
const COLORS = [
  '#5470c6',
  '#fc8452',
  '#91cc75',
  '#73c0de'
]

// Current date.
const now = new Date(2011, 0, 2)


// -------------
// Generate data
// -------------
var data = []
for (let i = 0; i <= N - 1; i++) {
  let day = Math.floor(Math.random() * 2);
  let count = Math.floor(Math.random() * 50)
  let date = new Date(2011, 0, day)
  data[i] = generateData(date, count)
}

// Show
console.log(data)

// Create x, xmax and xmin.
var x = data.flat().map(d => d[0])

const xmax = Math.max.apply(null, x)
const xmin = Math.min.apply(null, x)

/*
// Sort and keep unique
x.sort(function(a,b) {
  return a - b;
});

// Finding future therapy for each abx
var diff = x.map(d => Math.abs(d - now))
*/


const traces = []

for (let i = 0; i <= data.length - 1; i++) {

  var current = data[i].filter(function (item) { return item[0] < now;})
  var future = data[i].filter(function(item) { return item[0] > now; })

  traces.push({
    type: 'scatter',
    //mode: 'lines+markers',
    //fill: 'tozeroy',
    //fill: 'toself',
    x: current.map(d => d[0]),
    y: current.map(d => d[1]),
    //width: value.map(d => 1200.8),
    //width: w,
    yaxis: (i==0) ? 'y' : 'y'+ (i+1),
    xaxis: {
      showgrid: false,
      zeroline: false,
      showline: false,
      visible: false,
    },
    //text: value.map(d => d.dose),
    marker: {
      color: current.map(d=> {
        return d[2]==1 ? COLORS[i] : 'white'
      }),
      opacity: 1,
      line: {
        color: COLORS[i],
        width: 1
      }
    },
    line: {
      shape: 'spline',
      color: COLORS[i]
    },
    bargap: 0.01,
    barwidth: 12,
    //name: key + ' (' + value[0].unit + ')'
  })

  traces.push({
    type: 'scatter',
    mode: 'lines+markers',
    //fill: 'tozeroy',
    //fill: 'toself',
    x: future.map(d => d[0]),
    y: future.map(d => d[1]),
    //width: value.map(d => 1200.8),
    //width: w,
    yaxis: (i==0) ? 'y' : 'y'+ (i+1),
    xaxis: {
      zeroline: false,
      showline: false,
      visible: false,
    },
    //text: value.map(d => d.dose),
    marker: {
      color: future.map(d=> {
        return d[2]==1 ? 'lightgray' : 'white'
      }),
      opacity: 1,
      line: {
        color: 'lightgray',
        width: 1
      }
    },
    line: {
      shape: 'spline',
      color: 'lightgray',
      dash: 'dot',
      width: 1
    },
    bargap: 0.01,
    barwidth: 12,
    //name: key + ' (' + value[0].unit + ')'
    showlegend: false
  })

  traces.push({
    type: 'line',
    xref: 'x',
    x0: now.getTime(),
    y0: 0,
    x1: now.getTime(),
    yref: 'paper',
    y1: 1,
    line: {
      color: COLORS[i],
      width: 1.5,
      dash: 'dot'
    }
  })

}


var layout = {
  pad: {
    t: 0,
    b: 0,
    r: 0,
    l: 0,
  },
  showlegend: true,
  legend: {
    //orientation: 'h',
    //x: 0.3,
    //y: 1.2
  },
  grid: {
      rows: data.length,
      columns: 1,
      //subplots: [['xy'], ['xy2'], ['xy3']],
      //pattern: 'independent',
      roworder: 'top to bottom'
  },
  // Change background color here ...
  //paper_bgcolor: 'green',
  //plot_bgcolor: 'blue'
  /*
  updatemenus: [
     {
        type: 'buttons',
        buttons: [
          {
              label: 'Bar/Line',
              method: 'restyle',
              args: ['type', 'bar'],
              args2: ['type', 'scatter']
          }
        ],
      }]*/
  };

var config = {responsive: true}

// Plot
Plotly.newPlot('myDiv', traces, layout, config);
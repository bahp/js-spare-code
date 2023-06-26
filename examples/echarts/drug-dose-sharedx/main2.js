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
const N = 4;   // number of abxs
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

// Create options
const grids = []
const xAxes = []
const yAxes = []
const series = []
const visualMap = []

for (let i = 0; i <= N - 1; i++) {
  grids.push({
    top: 50 + (i*45) + i*H + 'px',
    height: H + 'px'
  })
  xAxes.push({
    type: 'time',
    min: xmin,
    max: xmax,
    show: false,
    axisTick: {
        alignWithLabel: true
    },
    gridIndex: i,
  })
  yAxes.push({
    name: 'Antimicrobial ' + i + ' (mg/L)',
    scale: false,
    splitArea: {
      show: false
    },
    gridIndex: i
  })
  series.push({
    name: 'Antimicrobial ' + i,
    type: 'line',
    color: COLORS[i],
    data: data[i], // data[i].slice(0, 30)
    showSymbol: true,
    //symbol: 'circle',
    symbolSize: 5,
    smooth: true,
    visualMap: false,
    itemStyle: {
      opacity: 1,
      colorAlpha: 0,
      colorSaturation: 0,
      color: function(param) {
        if (param.data[2] == 0) return 'red'
        if (param.data[2] == 1) return param.color
        return param.color
      }
    },
    markLine : {
      symbol: 'none',
      silent: true, // ignore mouse events
      label: {show: false},
      data : [
        // Horizontal Axis (requires valueIndex = 0)
        //{type: 'average', name: 'Line Marker', valueIndex: 0},
        {xAxis: now.getTime()},
      ]
    },
    xAxisIndex: i,
    yAxisIndex: i,
  })
  visualMap.push({
    show: false,
    dimension: 0,
    calculable: false,
    seriesIndex: i,
    pieces: [
      {
        lte: now.getTime(),
        color: COLORS[i],
      },
      {
        gt: now.getTime()+10,
        color: 'lightgray',
      }
    ],
    //color: ['lightgray', COLORS[i]]
  })
}

// Show last axis.
xAxes[N-1].show = true

// Create graph
var chartDom = document.getElementById('myDiv');
var myChart = echarts.init(chartDom, null,
  {
    height: 50 + (45*N) + (data.length * H)
  });
var option;

// prettier-ignore
option = {
  /* When using visual map the itemStyle dictionary,
     that changes the symbol color based on a value
     does not work properly.
  */
  visualMap: visualMap,
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 'all',
      minSpan: 5,
      bottom: 0
    }
  ],
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    show: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: xAxes,
  yAxis: yAxes,
  grid: grids,
  series: series
};


var bars = series.map(d => {
  let aux = Object.assign({}, d)
  aux.type = 'bar'
  return aux
})

console.log(bars)


// prettier-ignore
option2 = {
  // Make gradient line here
  /*
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      //min: 0,
      //max: 400
    },
    {
      show: false,
      type: 'continuous',
      seriesIndex: 1,
      dimension: 0,
      //min: 0,
      //max: dateList.length - 1
    }
  ],*/
  //title: [
  //  {
  //    left: 'center',
  //    text: 'Gradient along the y axis'
  //  },
  //  {
  //    top: '55%',
  //    left: 'center',
  //    text: 'Gradient along the x axis'
  //  }
  //],
  visualMap: visualMap,
    brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.1
        }
      },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: xAxes,
  yAxis: yAxes,
  grid: grids,
  series: bars
};


option && myChart.setOption(option);

$('input[type=checkbox]').change(function() {
  if (this.checked) {
    myChart.setOption(option2, true);
  } else {
    myChart.setOption(option, true)
  }
});

window.onresize = function() {
  myChart.resize();
};
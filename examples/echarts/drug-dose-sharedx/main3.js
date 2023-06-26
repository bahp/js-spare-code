// ---------------------------------
// Helper methods
// ---------------------------------
function generateData(date, count) {
  /**
   * Generate timeseries data.
   *
   * Parameters
   * ----------
   * date: date
   *    The date the timeseries starts.
   * count:
   *    The number of samples.
   */
  let data = [];
  let hour = 60 * 60 * 1000;
  let lambda = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < count; i++) {

    let x = new Date(date.getTime() + i*lambda * hour) // datetime
    let y = (Math.random() * 1000).toFixed(2)    // dose
    let c =  Math.floor(Math.random() * 2) == 1           // symbol

    data[i] = {
      value: [x, y, c],
      object: {
        date_scheduled: x,
        date_delivered: x
      },
      symbol: c == 1 ? 'circle' : 'emptyCircle',
      symbolSize: 6,
      itemStyle: {
        //  color: 'red'
      }
    }
  }
  return data;
}

function dateComparison(a, b) {
  /* Compare sting dates */
  const date1 = new Date(a)
  const date2 = new Date(b)
  return date1 - date2;
}

// ----------------
// Constants
// ----------------
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
  let day = Math.floor(Math.random() * 2);   // start day
  let count = Math.floor(Math.random() * 50) // number of doses
  let date = new Date(2011, 0, day) // start date
  data[i] = generateData(date, count)           // time series
}


// Show
console.log(data)

// Create x, xmax and xmin.
var x = data.flat().map(d => d.value[0])

const xmax = Math.max.apply(null, x)
const xmin = Math.min.apply(null, x)


// Create options
const grids = []
const xAxes = []
const yAxes = []
const series = []
const visualMap = []

// For each antimicrobial
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
    splitArea: {
      show: false
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
    name: i,
    type: 'line',
    color: COLORS[i],
    data: data[i],
    showSymbol: true,
    smooth: true,
    markLine : {
      symbol: 'none',
      silent: true, // ignore mouse events
      label: {show: false},
      data : [
        {
          xAxis: now.getTime()
        },
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
        lte: now.getTime(),     // past in color
        color: COLORS[i],
      },
      {
        gt: now.getTime() + 10, // future in gray
        color: 'lightgray',
      }
    ],
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
    show: true,
    /*data: [
      {
        name: 0,
      },
      {
        name: 1,
        icon: 'circle',
        text: 'feo'
      },
      {
        name: 2,
      },
    ]*/
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    formatter: function (item) {
      //console.log(item)
      obj = item[0]
      html = ""
      html+= obj.marker
      html+= obj.data.object.date_delivered
      html+= obj.value[1]
      return html
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
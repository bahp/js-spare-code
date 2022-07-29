function generateData(date, count) {
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

// Create data
var abx1 = generateData(new Date(2011, 0, 1),50)
var abx2 = generateData(new Date(2011, 0, 2),50)
var abx3 = generateData(new Date(2011, 0, 15),50)

// Show
console.log(abx1)
console.log(abx2)
console.log(abx3)

// Concat time elements
var x = [].concat(
  abx1.map(d => d[0]),
  abx2.map(d => d[0]),
  abx3.map(d => d[0])
)

// Get max and min
var xmax = Math.max.apply(null, x)
var xmin = Math.min.apply(null, x)

//
var data = [
  abx1, abx2, abx3
]

const grids = []
const xAxes = []
const yAxes = []
const series = []


for (var i = 0; i <= data.length - 1; i++) {

  grids.push({
    'top': i * 33 + '%'
  })
  xAxes.push({
    type: 'time',
    min: xmin,
    max: xmax,
    show: false,
    gridIndex: i,
  })
  yAxes.push({
    name: 'Antimicrobial ' + i + ' (mg/L)',
    scale: true,
    splitArea: {
      show: false
    },
    gridIndex: i
  })
  series.push({
    name: 'Antimicrobial ' + i,
    type: 'line',
    data: data[i],
    showSymbol: true,
    smooth: true,
    xAxisIndex: i,
    yAxisIndex: i,
  })
}


var rowNumber = Math.ceil(Math.sqrt(data.length));
grids.forEach(function (grid, idx) {
  //grid.left = ((idx % rowNumber) / rowNumber) * 100 + 0.5 + '%';
  //grid.top = (Math.floor(idx / rowNumber) / rowNumber) * 100 + 0.5 + '%';
  //grid.width = (1 / rowNumber) * 100 - 1 + '%';
  //grid.height = (1 / rowNumber) * 100 - 1 + '%';
  grid.topp= '33.33%' * idx + '%';
  grid.height = '33.33%'
});

// Create graph
var chartDom = document.getElementById('myDiv');
var myChart = echarts.init(chartDom);
var option;

// prettier-ignore
option = {
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
    show: false
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
  xAxis: [
    {
      type: 'time',
      //data: abx1.map(item => item[0])
      min: xmin,
      max: xmax,
    },
    {
      type: 'time',
      //data: abx2.map(item => item[0]),
      min: xmin,
      max: xmax,
      gridIndex: 1
    }
  ],
  yAxis: [
    {},
    {
      gridIndex: 1,
    }
  ],
  grid: [
    {
      bottom: '60%'
    },
    {
      top: '60%'
    }
  ],
  series: [
    {
      type: 'bar',
      showSymbol: false,
      data: abx1,
    },
    {
      type: 'bar',
      showSymbol: false,
      data: abx2,
      xAxisIndex: 1,
      yAxisIndex: 1
    }
  ]
};


option && myChart.setOption(option);

$('input[type=checkbox]').change(function() {
  if (this.checked) {
    myChart.setOption(option2, true);
  } else {
    myChart.setOption(option, true)
  }
});
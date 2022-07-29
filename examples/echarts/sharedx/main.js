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


for (var i = 0; i <= data.length; i++) {

  grids.push({})
  xAxes.push({
    type: 'time',
    min: xmin,
    max: xmax,
    show: false
  })
  yAxes.push({
    name: 'Antimicrobial ' + i + ' (mg/L)',
    scale: true,
    splitArea: {
      show: false
    }
  })
  series.push({
    name: 'Antimicrobial ' + i,
    type: 'line',
    data: data[i],
    showSymbol: true,
    smooth: true,
    xAxisIndex: 1,
    yAxisIndex: 1,
  })

}



var chartDom = document.getElementById('myDiv');
var myChart = echarts.init(chartDom);
var option;

// prettier-ignore
option = {
  // Make gradient line here

  /*
visualMap: {
  //type: 'piecewise',
  show: false,
  dimension: 0,
  pieces: [
    {
      gte: abx1[0][0].getTime(),
      lte: abx1[3][0].getTime(),
      color: '#5470C6',
    },
    {
      gte: abx1[3][0].getTime(),
      color: 'gray',
      type: 'dashed',
    }
  ]
  },

  */
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
  ],*
  title: [
    {
      left: 'center',
      text: 'Gradient along the y axis'
    },
    {
      top: '55%',
      left: 'center',
      text: 'Gradient along the x axis'
    }
  ],
  brush: {
      xAxisIndex: 'all',
      brushLink: 'all',
      outOfBrush: {
        colorAlpha: 0.1
      }
    },
  axisPointer: {
    link: [
      {
        xAxisIndex: 'all'
      }
    ],
    label: {
      backgroundColor: '#777'
    }
  },
  */
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
      //type: 'shadow',
      type: 'cross'
    }
  },
  xAxis: [
    { type: 'time', min: xmin, max: xmax, show: false },
    { type: 'time', min: xmin, max: xmax,
      gridIndex: 1,
      boundaryGap: false,
      axisLabel: {
         //formatter: function (a, b) {
         //  console.log(a, b)
         //  return echarts.format.formatTime('MMMM d\nhh:mm', new Date().setTime(a))
        // }
      },
      splitArea: {
        interval: 2,
        //interval: function (index, value) {
        //  console.log(value)
       //   return false
        //},
        show: true
      }
      //axisLine: {show: false, onZero: false},
      //axisTick: {show: false},
      //splitLine: {show: false},
      //axisLabel: {show: false}

    }
  ],
  yAxis: [
    {
      name: 'Gentamicin (mg/L)',
      scale: true,
      splitArea: {
        show: false
      }
    },
    {
      name: 'Meropenem (mg/L)',
      gridIndex: 1,
      scale: true,
      splitArea: {
        show: false
      }
    }
  ],
  grid: [{ bottom: '55%' }, { top: '55%' }],
  series: [
    {
      name: 'Gentamicin',
      type: 'line',
      //color: '#2c7be5',
      data: abx1.slice(0, 30),
      //symbol: 'circle',
      showSymbol: true,
      smooth: true,
       markLine: {
        symbol: ['none', 'none'],
        label: { show: true },
        data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
      },
      universalTransition: {
        enabled: false,
        delay: function (idx, count) {
          return Math.random() * 400;
        }
      },
      itemStyle: {
        opacity: 1,
        color: function(param) {
          if (param.data[2] == 0) return 'gray'
          if (param.data[2] == 1) return 'blue'
          return 'green'
        }
      },
      /*
      areaStyle: {
        color: {
          colorStops: [
            {offset: 0, color: "#2c7be53A"},
            {offset: 1, color: "#2c7be50A"}
          ]
        }
      },*/
      /*
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'blue'
          },
          {
            offset: 1,
            color: 'white'
          }
        ])
      },*/
    },
    {
      name: 'Gentamicin',
      type: 'line',
      data: abx1.slice(29, 50),
      showSymbol: true,
      smooth: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    {
      name: 'Meropenem',
      type: 'line',
      data: abx2,
      showSymbol: true,
      smooth: true,
      xAxisIndex: 1,
      yAxisIndex: 1,
    },
    {
      name: 'Amikacin',
      type: 'line',
      data: abx3,
      showSymbol: true,
      smooth: true,
      xAxisIndex: 1,
      yAxisIndex: 1,
    }
  ]
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


/*
let currentOption = option;
setInterval(function () {
  currentOption = currentOption === option ? option2 : option;
  myChart.setOption(currentOption, true);
}, 2000);
*/
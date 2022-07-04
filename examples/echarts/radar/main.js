

// ------------------------------------------------------
// Data
// ------------------------------------------------------
var data = [
  {
    "specimen_id": 37,
    "microorganism_id": 1,
    "antimicrobial_id": 1,
    "resistant": 0.0,
    "sensitive": 1.0,
    "freq": 1.0,
    "sari": 0.0,
    "intermediate": 0,
    "microorganism_name": "Escherichia coli",
    "microorganism_code": "ECOL",
    "microorganism_url": "/microbiology/microorganism/1/",
    "antimicrobial_name": "Amikacin",
    "antimicrobial_code": "AAMI",
    "antimicrobial_url": "/microbiology/antimicrobial/1/",
    "specimen_name": "Fluid in blood culture bottles",
    "specimen_code": "FBCUL",
    "specimen_url": "/microbiology/specimen/37/"
  },
  {
    "specimen_id": 37,
    "microorganism_id": 1,
    "antimicrobial_id": 2,
    "resistant": 1.0,
    "sensitive": 0.0,
    "freq": 1.0,
    "sari": 1.0,
    "intermediate": 0,
    "microorganism_name": "Escherichia coli",
    "microorganism_code": "ECOL",
    "microorganism_url": "/microbiology/microorganism/1/",
    "antimicrobial_name": "Amoxycillin",
    "antimicrobial_code": "AAMP",
    "antimicrobial_url": "/microbiology/antimicrobial/2/",
    "specimen_name": "Fluid in blood culture bottles",
    "specimen_code": "FBCUL",
    "specimen_url": "/microbiology/specimen/37/"
  },
  {
    "specimen_id": 37,
    "microorganism_id": 1,
    "antimicrobial_id": 3,
    "resistant": 1.0,
    "sensitive": 0.0,
    "freq": 1.0,
    "sari": 1.0,
    "intermediate": 0,
    "microorganism_name": "Escherichia coli",
    "microorganism_code": "ECOL",
    "microorganism_url": "/microbiology/microorganism/1/",
    "antimicrobial_name": "Co-amoxiclav",
    "antimicrobial_code": "AAUG",
    "antimicrobial_url": "/microbiology/antimicrobial/3/",
    "specimen_name": "Fluid in blood culture bottles",
    "specimen_code": "FBCUL",
    "specimen_url": "/microbiology/specimen/37/"
  },
  {
    "specimen_id": 37,
    "microorganism_id": 1,
    "antimicrobial_id": 4,
    "resistant": 1.0,
    "sensitive": 0.0,
    "freq": 1.0,
    "sari": 1.0,
    "intermediate": 0,
    "microorganism_name": "Escherichia coli",
    "microorganism_code": "ECOL",
    "microorganism_url": "/microbiology/microorganism/1/",
    "antimicrobial_name": "Aztreonam",
    "antimicrobial_code": "AAZT",
    "antimicrobial_url": "/microbiology/antimicrobial/4/",
    "specimen_name": "Fluid in blood culture bottles",
    "specimen_code": "FBCUL",
    "specimen_url": "/microbiology/specimen/37/"
  },
  {
    "specimen_id": 37,
    "microorganism_id": 1,
    "antimicrobial_id": 5,
    "resistant": 1.0,
    "sensitive": 0.0,
    "freq": 1.0,
    "sari": 1.0,
    "intermediate": 0,
    "microorganism_name": "Escherichia coli",
    "microorganism_code": "ECOL",
    "microorganism_url": "/microbiology/microorganism/1/",
    "antimicrobial_name": "Ceftazidime",
    "antimicrobial_code": "ACAZ",
    "antimicrobial_url": "/microbiology/antimicrobial/5/",
    "specimen_name": "Fluid in blood culture bottles",
    "specimen_code": "FBCUL",
    "specimen_url": "/microbiology/specimen/37/"
  },
]

// Show data
console.log("Data: ", data)


// Variables
var x_ = 'microorganism_code'
var y_ = 'antimicrobial_code'
var z_ = 'sari'

// Helper function
function unique(value, index, self) {
  return self.indexOf(value) === index
}

function formatData(data) {

  // Get unique x and y axis
  let x = data.map(d => d[x_]).filter(unique).sort()
  let y = data.map(d => d[y_]).filter(unique).sort()

  // Create indicators parameter
  let indicators = y.map(function(item) {
    return {name: item, max: 100}
  })

  // Create empty matrix
  let matrix = [];
  for(let i=0; i<x.length; i++) {
    matrix[i] = new Array(y.length);
  }

  // Fill with sari values.
  for (let i=0; i<data.length; i++) {
    let e = data[i]
    let xi = x.indexOf(e[x_])
    let yi = y.indexOf(e[y_])
    matrix[xi][yi] = (e.sari * 100).toFixed(2)
  }

  return {
    data: matrix,
    indicator: indicators,
    x: x,
    y: y
  }
}

function DisplayGraph() {

}

/*
// Get unique x and y axis
let x = data.map(d => d[x_]).filter(unique).sort()
let y = data.map(d => d[y_]).filter(unique).sort()

// Create indicators parameter
var indicators = y.map(function(item) {
  return {name: item, max: 100}
})

console.log(x)
console.log(y)
console.log(indicators)

// Create empty matrix
var matrix = [];
for(var i=0; i<x.length; i++) {
  matrix[i] = new Array(y.length);
}

// Fill with sari values.
for (var i=0; i<data.length; i++) {
  var e = data[i]
  var xi = x.indexOf(e[x_])
  var yi = y.indexOf(e[y_])
  matrix[xi][yi] = (e.sari * 100).toFixed(2)
}

var tmp= data.map(function (item) {
  return [
    item.microorganism_code,
    item.antimicrobial_code,
    item.sari
  ] || '-'
})

console.log(tmp)
console.log(matrix)
*/

var data = formatData(data)



// Create piechart
radarchart('myDiv', data)


function radarchart(tag, data) {

  console.log(data)

  // Variables.
  var chartDom = document.getElementById(tag);
  var myChart = echarts.init(chartDom);
  var option;


  // Create series data
  var series = []
  for (var i=0; i<data.x.length; i++) {
    series.push({
      name: data.x[i],
      value: data.data[data.x.indexOf(data.x[i])],
      areaStyle: {opacity:0.2},
      symbol: 'none',
      lineStyle: {
        width: 1
      },
       emphasis: {
        areaStyle: {
          opacity: 0.3
        }
      },

    })
  }

  // Options
  var option = { //color: [] cycle
    title: {
      //text: 'Basic Radar Chart'
    },
    legend: {
      data: data.data.map(d => d.name),
      orient: 'vertical',
      left: 'right',
      //top: 'bottom'
    },

    tooltip: {
      trigger: 'item'
    },
    radar: {
      // shape: 'circle',
      indicator: data.indicator
    },
    series: [
      {
        name: '',
        type: 'radar',
        data: series

      }
    ]
  };

  // Create chart
  option && myChart.setOption(option);

}
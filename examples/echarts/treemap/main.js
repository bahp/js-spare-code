

// ------------------------------------------------------
// Data
// ------------------------------------------------------
var micro = [
    {
        "value": [
            null,
            null,
            null
        ],
        "name": "SPUTUM",
        "id": "branch-8",
        "discretion": null,
        "children": [
            {
                "value": [
                    null,
                    null,
                    null
                ],
                "name": "ECOL",
                "id": "leaf-135",
                "discretion": "mandatory",
                "children": [
                    {
                        "value": [
                            50,
                            25,
                            1
                        ],
                        "name": "AMI",
                        "id": "leaf-135",
                        "discretion": "mandatory",
                    },
                    {
                        "value": [
                            50,
                            75,
                            2
                        ],
                        "name": "PEN",
                        "id": "leaf-135",
                        "discretion": "mandatory",
                    }
                ]
            },
            {
                "value": [
                    null,
                    null,
                    null
                ],
                "name": "PSAUR",
                "id": "leaf-131",
                "discretion": "mandatory",
                "children": [
                    {
                        "value": [
                            25,
                            100,
                            3
                        ],
                        "name": "MER",
                        "id": "leaf-135",
                        "discretion": "mandatory",
                        //"visualDimension": 2
                    },
                    {
                        "value": [
                            25,
                            100,
                            4
                        ],
                        "name": "CLY",
                        "id": "leaf-135",
                        "discretion": "mandatory",
                        //"visualDimension": 3
                    },
                    {
                        "value": [
                            25,
                            100,
                            10
                        ],
                        "name": "COA",
                        "id": "leaf-135",
                        "discretion": "mandatory",
                        //"visualDimension": 3
                    }
                ]
            },
        ]
    },
]

console.log(micro)

// Define data
var data = micro

// Define graph
var chartDom = document.getElementById('myDiv2');
var myTree = echarts.init(chartDom);
var option;

myTree.showLoading();
myTree.hideLoading();

const visualMin = -100;
const visualMax = 100;
const visualMinBound = -40;
const visualMaxBound = 40;

var paletteYellow = ['#FF9180', '#FFA78C', '#FFCB87', '#FFE59E', '#FFF4B0', '#FFFED9']

convertData(data);

function convertData(originList) {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < originList.length; i++) {
    let node = originList[i];
    if (node) {
      let value = node.value;
      value[2] != null && value[2] < min && (min = value[2]);
      value[2] != null && value[2] > max && (max = value[2]);
    }
  }
  for (let i = 0; i < originList.length; i++) {
    let node = originList[i];
    if (node) {
      let value = node.value;
      // Scale value for visual effect
      if (value[2] != null && value[2] > 0) {
        value[3] = echarts.number.linearMap(
          value[2],
          [0, max],
          [visualMaxBound, visualMax],
          true
        );
      } else if (value[2] != null && value[2] < 0) {
        value[3] = echarts.number.linearMap(
          value[2],
          [min, 0],
          [visualMin, visualMinBound],
          true
        );
      } else {
        value[3] = 0;
      }
      if (!isFinite(value[3])) {
        value[3] = 0;
      }
      if (node.children) {
        convertData(node.children);
      }
    }
  }
}

function isValidNumber(num) {
  return num != null && isFinite(num);
}

optionTree = {
  title: {
    left: 'center',
    text: 'Treemap',
    subtext: 'Susceptibility data'
  },
  tooltip: {
    formatter: function (info) {
      let value = info.value;
      let v0 = isValidNumber(value[0]) ? value[0] + '$' : '-';
      let v1 = isValidNumber(value[1]) ? value[1] + '$' : '-';
      let v2 = isValidNumber(value[2]) ? value[2] + '$' : '-';
      let v3 = isValidNumber(value[3]) ? value[3] + '$' : '-';

      return [
        '<div class="tooltip-title">' +
          echarts.format.encodeHTML(info.name) +
          '</div>',
        'Value 0: &nbsp;&nbsp;' + v0 + '<br>',
        'Value 1: &nbsp;&nbsp;' + v1 + '<br>',
        'Value 2: &nbsp;&nbsp;' + v2 + '<br>',
        'Value 3: &nbsp;&nbsp;' + v3 + '<br>',
      ].join('');
    }
  },
  series: [
    {
      name: 'ALL',
      top: 80,
      type: 'treemap',
      label: {
        show: true,
        formatter: '{b}'
      },
       upperLabel: {
        show: true,
        height: 30,
        textBorderColor: 'white'
      },
      itemStyle: {
        //borderColor: 'black'
      },
      //visualMin: visualMin,
      //visualMax: visualMax,
      //visualDimension: 2,
      levels: [
        {
          itemStyle: {
            borderWidth: 3,
            borderColor: '#333',
            gapWidth: 3
          }
        },
        {},
        {
          //color: ['#942e38', '#aaa', '#269f3c'],
          visualMin:0,
          visualMax:100,
          color: paletteYellow.reverse(),
          colorMappingBy: 'value',
          visualDimension:2,
          itemStyle: {
            gapWidth: 1
          }
        }
      ],
      data: data
    }
  ]
};

// Creat graph
option && myTree.setOption(optionTree);

// Change color
$(document).ready(function() {
  $('#visualDimension').on('change', function() {
    optionTree.series[0].levels[2].visualDimension = $(this).val()
    option && myTree.setOption(optionTree);
  })
});
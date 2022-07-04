
var palette_reds = [
  '#662214',
  '#802b1a',
  '#99331f',
  '#b33b24',
  '#cc4429',
  '#e64d2e',
  '#ff6647',
  '#ff775c',
  '#ff8870',
  '#ff9985',
  '#ffaa99',
  '#ffbbad'
]

var palette_greens = [
	'#4d5a4d',
	'#617161',
	'#748774',
	'#879e87',
	'#9ab49a',
	'#aecbae',
	'#c7e4c7',
	'#cde7cd',
	'#d4ead4',
	'#daedda',
	'#e0f0e0',
	'#e6f3e6',
]

var palette_oranges = [
	'#64503d',
	'#7d644c',
	'#96775b',
	'#af8b6a',
	'#c89f7a',
	'#e1b389',
	'#fbcda2',
	'#fbd2ad',
	'#fcd8b7',
	'#fcddc1',
	'#fde3cc',
	'#fde9d6',
]

var palette_blues = [
	'#546474',
	'#64778b',
	'#758ba2',
	'#869fb9',
	'#96b3d0',
	'#b0cde9',
	'#b9d2ec',
	'#c1d8ee',
	'#caddf1',
	'#d3e3f3',
	'#dce9f5'
]

var palette_sari = [
	'#FF9180',
	'#FFA78C',
	'#FFCB87',
	'#FFE59E',
	'#FFF4B0',
	'#FFFED9'
]

var N = 10
var palette_greens = d3.range(N).map(d => d3.interpolateGreens(d/(N-1)))
var palette_reds = d3.range(N).map(d => d3.interpolateReds(d/(N-1)))
var palette_blues = d3.range(N).map(d => d3.interpolateBlues(d/(N-1)))
var palette_oranges = d3.range(N).map(d => d3.interpolateOranges(d/(N-1)))
var palette_sari = d3.range(N).map(d => d3.interpolateOrRd(d/(N-1)))

// To copy them on other projects
console.log(palette_greens)
console.log(palette_reds)
console.log(palette_blues)
console.log(palette_oranges)
console.log(palette_sari)


function leafs_to_tree(items, levels, values) {
	/**
	 * Creates a tree from its leaf objects.
	 *
	 * .. note: The whole element record is included in data.
	 *
	 * @params
	 * items: list of objects
	 * levels: list of elements with object keys.
	 * values: list of elements with object keys
	 */

	// Add path
	items = items.map(obj => (
		{ ...obj, _path: levels.map(v => obj[v]).join(".")}
	))

	// Create treemap
	var result = []
	items.forEach(function (obj) {
    obj._path.split('.').reduce(function (level, key, i, { length }) {
			var temp = level.find(({ name }) => key === name);
			if (!temp) {
				if (i + 1 == length) {
					temp = {
						name: key,
						data: obj,
						value: values.map(v => obj[v])
					}
				} else {
					temp = { name: key, children: [] }
				}
				level.push(temp);
			}
			return temp.children;
    }, result);
	});

	return result
}

function isValidNumber(num) {
  return num != null && isFinite(num);
}

function isIterable(obj) {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

function formatter0(info) {
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

function formatter(info) {
	let title = info.treePathInfo
		.map(v => v.name).slice(1).join(' > ')

	let values = ''
	if (isIterable(info.value)) {
		values = info.value.map((v, i) =>
			'Value ' + i + ': &nbsp;&nbsp;' + v
		).join('<br>')
	}

	return [
		'<div class="tooltip-title">' +
			echarts.format.encodeHTML(title) +
		'</div>',
		values
	].join('')
}


// Data
var source = [
	{'s':'SPUTUM', 'o':'ECOL', 'a':'AMI', 'freq':50, 'resistant':1, 'sensitive':8, 'other':1},
	{'s':'SPUTUM', 'o':'ECOL', 'a':'PEN', 'freq':50, 'resistant':2, 'sensitive':20, 'other':2},
	{'s':'SPUTUM', 'o':'ECOL', 'a':'AMK', 'freq':50, 'resistant':2, 'sensitive':1, 'other':2},
	{'s':'SPUTUM', 'o':'PSAUR', 'a':'AMI', 'freq':25, 'resistant':3, 'sensitive':100,'other':3},
	{'s':'SPUTUM', 'o':'PSAUR', 'a':'PEN', 'freq':25, 'resistant':4, 'sensitive':20, 'other':4},
	{'s':'SPUTUM', 'o':'PSAUR', 'a':'AMK', 'freq':25, 'resistant':4, 'sensitive':60, 'other':4},
	{'s':'BLOOD', 'o':'PSAUR', 'a':'COA', 'freq':25, 'resistant':5, 'sensitive':4, 'other':10},
	{'s':'BLOOD', 'o':'PSAUR', 'a':'COA', 'freq':25, 'resistant':6, 'sensitive':3, 'other':10},
	{'s':'BLOOD', 'o':'PSAUR', 'a':'COA', 'freq':25, 'resistant':7, 'sensitive':2, 'other':10},
	{'s':'BLOOD', 'o':'PSAUR', 'a':'COA', 'freq':25, 'resistant':8, 'sensitive':1, 'other':10},
]

source = source.map(d => {
	var sari = (d.resistant / (d.sensitive + d.resistant)) * 100
	d.sari = parseFloat(sari.toFixed(2))
	return d
})


function initialize(TREE, source) {
	let values = TREE.build.config

	// Set option.level3
	for (var i=0; i < values.length; i++) {
		let v = values[i]
		let aux = {
			visualMax: Math.max(...source.map(o => o[v.name])),
			visualMin: Math.min(...source.map(o => o[v.name])),
			visualDimension: i,
			color: v.palette,
			colorMappingBy: 'value',
			itemStyle: {
				borderWidth: 15,
				gapWidth: 3,
				borderColorSaturation: 0.6
			}
		}
		TREE.option.level3[v.name] = aux
	}

	// Set build.values
	TREE.build.values = TREE.build.config.map(d => d.name)

}

var TREE = {
	build: {
		keys: ['s', 'o', 'a'],
		values: [], // Will be initialised later based on config
		names: [],  // Will be ....
		config: [
			{ name: 'freq'},
			{ name: 'sari', palette: palette_sari },
			{ name: 'sensitive', palette: palette_greens },
			{ name: 'resistant', palette: palette_reds },
			{ name: 'other'}
		]
	},
	tooltip: {
		template: {
			base: {},
			item: {}
		}
	},
	option: {
		level3: {
			base: {
				colorSaturation: [0.35, 0.5],
				itemStyle: {
					borderWidth: 15,
					gapWidth: 3,
					borderColorSaturation: 0.6
				}
			},
		}
	},
}

// Initialize
// Sets build.values
// Completes option.level3
initialize(TREE, source)

// Create tree
var tree3 = leafs_to_tree(source,
	TREE.build.keys, TREE.build.values)

// Log information
console.log('Tree (find)', tree3)

// Define graph
var chartDom = document.getElementById('myDiv0');
var myTree3 = echarts.init(chartDom);
var optionTree3;

// Option
optionTree3 = {
  title: {
    left: 'center',
    text: 'Treemap',
    subtext: 'Susceptibility data (find)'
  },
  tooltip: {
    formatter: formatter
  },

	/*
	visualMap: {
  	dimension: 0,
    //min: 0,
    //max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    //bottom: '15%'
		top: '15%',
		continuous
  },*/

  series: [
    {
      name: 'ALL',
      top: 80,
      type: 'treemap',
      label: {
        show: true,
        formatter: '{b}'
      },
			leafDepth: 3,
			visibleMin: 0,
			upperLabel: {
        show: true,
        height: 30,
        textBorderColor: 'white'
      },
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			},
      levels: [
        {
					itemStyle: {
						borderColor: '#ffffff',
						borderWidth: 0,
						gapWidth: 0
					},
					upperLabel: {
						show: false
					}
        },
        {
        	itemStyle: {
						borderColor: '#ffffff',
						borderWidth: 0,
						gapWidth: 0
					},
				},
        {
        	colorSaturation: [0.35, 0.5],
          itemStyle: {
						borderWidth: 15,
						gapWidth: 3,
						borderColorSaturation: 0.6
					},
        }
      ],
      data: tree3
    }
  ]
};

// Creat graph
optionTree3 && myTree3.setOption(optionTree3);




$(document).ready(function() {

	// --------------------------
	// Include and Enable select
	// --------------------------
	let sel = document.getElementById('tree3-visualDimension');

	for (var i = 0; i < TREE.build.values.length; i++) {
  	let opt = document.createElement('option');
		opt.value = TREE.build.values[i];
		opt.innerHTML = TREE.build.values[i];
		sel.appendChild(opt);
	}

  $('#tree3-visualDimension').on('change', function() {
		let def = TREE.option.level3.base;
		let tmp = TREE.option.level3[$(this).val()];
		optionTree3.series[0].levels[2] = tmp || def;
		optionTree3 && myTree3.setOption(optionTree3);
  })

});
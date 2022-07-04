function dataDefault() {
		return [
			{
				name: 'nodeA',
				//value: 10,
				children: [
					{
						name: 'nodeAa',
						value: 4,
						children: []
					},
					{
						name: 'nodeAb',
						value: 6
					}
				]
			},
			{
				name: 'nodeB',
				//value: 20,
				children: [
					{
						name: 'nodeBa',
						//value: 20,
						children: [
							{
								name: 'nodeBa1',
								value: 20
							}
						]
					}
				]
			}
		]
	}

	function convert(source, target, basePath) {
		/**
		 *
		 */
		for (let key in source) {
			let path = basePath ? basePath + '.' + key : key;
			//let path = key
			if (!key.match(/^\$/)) {
				target.children = target.children || [];
				const child = {
					name: path
				};
				target.children.push(child);
				convert(source[key], child, path);
			}
		}
		if (!target.children) {
			target.value = source.$freq || 1;
			target.sari = source.$sari;
			target.info = source
		} else {
			target.children.push({
				name: basePath,
				value: source.$freq,
				sari: source.$sari
			});
		}
	}

	function tree(source, target, basePath) {

		for (let key in source) {
			let path = basePath ? basePath + '.' + key : key;
			console.log(key)
			if (!key.match(/^\$/)) {
				target.children = target.children || [];
				const child = {
					path: path,
					name: key
				};
				target.children.push(child);
				tree(source[key], child, path);
			}
		}

	}

	function list_to_tree(source, keys) {

		// Grouped objects
		var grouped = source.reduce((r, o) => {
			keys.reduce((q, k, i, { length }) =>
					q[o[k]] = q[o[k]] || (i + 1 === length ? o : {}), r)
			return r;
		}, {});

		// Basic tree to children-like structure
		console.log(grouped)

		var _d = { children: [] };
		tree(grouped, _d, '');
	}

	function dataMicrobiology() {

		var source = [
			{'s':'SPUTUM', 'o':'ECOL', 'a':'AMI', 'freq':50, 'sari':25, 'other':1},
			{'s':'SPUTUM', 'o':'ECOL', 'a':'PEN', 'freq':50, 'sari':75, 'other':2},
			{'s':'SPUTUM', 'o':'ECOL', 'a':'MER', 'freq':25, 'sari':100, 'other':3},
			{'s':'SPUTUM', 'o':'ECOL', 'a':'CLY', 'freq':25, 'sari':100, 'other':4},
			{'s':'SPUTUM', 'o':'ECOL', 'a':'COA', 'freq':25, 'sari':100, 'other':10},
		]

		// Define grouping keys
		var keys = ['s', 'o', 'a']



		// ---------------
   	// Grouped
		// ---------------
		// Grouped objects
		var grouped = source.reduce((r, o) => {
			keys.reduce((q, k, i, { length }) =>
				q[o[k]] = q[o[k]] || (i + 1 === length ?
					Object.fromEntries(Object.entries(o).map(([k, v]) => ['$'+k, v])) : {}), r)
			return r;
		}, {});
		console.log("Grouped:", grouped)

		// -----------------
		// Tree
		// -----------------
		const tree = source
      .reduce((r, o) => {
        keys.reduce(function (q, k) {
          const name = o[k];
          if (!q[name])
          	q._.push({
							name,
							children: (q[name] = {_: []})._});
          return q[name];
        }, r);
        return r;
      }, {_: []})
      ._;

		console.log("Tree", tree)

		// ---------------
   	// Convert
		// ---------------
		// Convert the json to formatted data.
		const data = {
			children: []
		};
		convert(grouped, data, '');
		console.log("Convert (echart)", data)

		// Return
		return data.children
	}

	var paletteYellow = ['#FF9180', '#FFA78C', '#FFCB87', '#FFE59E', '#FFF4B0', '#FFFED9']
	var paletteAutumn = []

	var chartDom = document.getElementById('myDiv1');
	var myChart = echarts.init(chartDom);
	var option;

	option = {
		tooltip: {
			//formatter: '{a} {b} {c} {d} {value} {sari}'
				formatter: function (info) {
					// Basic info
					var value = info.value;
					var treePathInfo = info.treePathInfo;
					var treePath = [];
					for (var i = 1; i < treePathInfo.length; i++) {
						treePath.push(treePathInfo[i].name);
					}

					// No additional info
					if (!('info' in info.data))
						return []

					// Variables.
					let freq = echarts.format.addCommas(value)
					let sari = Math.round(info.data.info.$sari)

					// Return string
					return [
						'<div class="tooltip-title">' +
						echarts.format.encodeHTML(treePath.join('/')) +
						'</div><br>',
						'Number of records: ' + freq + '<br>',
						'SARI: ' + sari

					].join('');
				}
		},
		series: [
			{
				type: 'treemap',
				//data: dataDefault(),
				data: dataMicrobiology(),
				label: {
          //show: true,
          //formatter: '{b} {@freq} {@sari} {@value}',
          //formatter: (x) => `{blue|${x.value}}`,
          //rich: {
          //  blue: {
           //   color: 'blue'
           // }
          //},
					//itemStyle : {

					//}
				},
				levels: [
					{
						itemStyle: {
							borderColor: '#777',
							borderWidth: 1,
							gapWidth: 1
						},
						upperLabel: {
							show: true
						}
					},
					{
						itemStyle: {
							borderColor: '#555',
							borderWidth: 1,
							gapWidth: 1,
							textColor: 'blue'
						},
						upperLabel: {
							show: true,
							textBorderColor: 'black'
						},
						emphasis: {
							itemStyle: {
								borderColor: '#ddd'
							}
						}
					},
					{
						visualMin: 1,
						visualMax: 10,
						//visualDimension: 3,
						colorSaturation: [0.35, 0.5],
						color: paletteYellow.reverse(),
						colorMappingBy: 'sari',
						itemStyle: {
							borderWidth: 5,
							gapWidth: 3,
							borderColorSaturation: 0.6
						},
						upperLabel: {
							show: true,
							textBorderColor: 'black'
						}
					},
				]
			}
		]
	};

	// Event on click
  myChart.on('click', 'series', function (params) {
		console.log(params)
  })

	option && myChart.setOption(option);
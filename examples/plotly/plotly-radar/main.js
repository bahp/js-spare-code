
/*
   Note that the last value for abx and orgs is the
   same as the first value. This is to make a loop
   to fill the area and the lines.
 */


function hexToRgbA(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

// Helper functions
function vector(N, factor=1.0) {
    var v = []
    for (var i = 0; i < N; i ++) {
        v[i] = Math.random()*factor;
    }
    return v
}

function createMatrix(M, N) {
    var m = new Array(M).fill().map(() => new Array(N))
    for (var i = 0; i < M; i ++) {
        for (var j = 0; j < N; j++) {
            m[i][j] = Math.random().toFixed(3);
        }
    }
    return m
}

// Colors
viridis_r = [
  '#fde725',
  //'#b5de2b',
  '#6ece58',
  //'#35b779',
  '#1f9e89',
  //'#26828e',
  '#31688e',
  //'#3e4989',
  '#482878',
  //'#440154'
]

// Antimicrobials
var abxs = [
    'Tazocin',
    'Meropenem',
    'Vancomycin',
    'Gentamicin'
]

// Organisms
var orgs = [
    'Escherichia Coli',
    'Staphylococcus Aureus',
    'Pseudomonas Aeruginosa',
    'Klebsiella Pneumoniae',
    'Proteus Mirabilis',
]

var orgs = [
    'ECOL',
    'SAUR',
    'PAER',
    'KPNE',
    'PMIR',
]

// Create matrix where columns are microorganisms,
// rows are antimicrobials and the value is the
// activity index (1-resistance).
var m = createMatrix(abxs.length, orgs.length)

// Add combined value.
m.push(math.max(m, 0))
abxs.push('Combined')

// Add last column equal to first column
// and also update the orgs list.
m = math.concat(m, math.column(m, 0))
orgs.push(orgs[0])

// Create data
data = []
for(let i = 0; i < m.length; i++) {
    data.push({
        type: 'scatterpolar',
        mode: 'markers+lines',  // remove markers (only lines)
        r: m[i],
        theta: orgs,
        fill: 'toself',
        //fillcolor: hexToRgbA(viridis_r[i], 0.4),
        name: abxs[i],
        //marker: {
        //},
        //line: {
        //    //color: 'black',
        //    opacity: 1.0
        //},
        //opacity: 0.4,
        hovertemplate: 'Organism: %{theta} <br>Activity: %{r}',
        subplot: 'polar' + (i+1)  // Comment to get all together.
    })
}


// Polar axis
polar = {
     radialaxis: {        // Horizontal line
         title: {
             text: 'activity',
             font: {
                 size: 8
             }
         },
        visible: true,
        range: [0, 1],
         showticklabels: true,
         tickfont: {
            size: 8
         },
         showgrid: true,
         //zeroline: true,
         //gridwith: 10,
         nticks: 10,
         range: [0, 1],
         gridcolor: 'lightgray'
     } ,
     angularaxis: {      // Circumference
        tickfont: {
          size: 10
        },
        rotation: 0,
        direction: "counterclockwise",
     },
     gridshape: 'circular',  // linear | circular,
     //hole: 0.5
}

var annotations = []
var offset = 0.05
for(let i = 0; i < abxs.length; i++) {
    var a =
        {
            text: abxs[i],
            font: {
              size: 16,
            },
            align: 'center',
            showarrow: false,
            x: ((1-2*offset) / (abxs.length-1))*(i) + offset, //position in x domain
            y: 1, //position in y domain
            xref: 'paper',
            yref: 'paper',
        }
    annotations.push(a)
}

// Create layout
layout = {
    grid: {
        rows: 1, columns: 5,
        //subplots: [
        //    ['polar1', 'polar2', 'polar3']
        //    ['polar4', 'polar5', 'polar6']
        //],
        pattern: 'independent'
    },
    //title: {
    //text: 'Spectrum of Activity',
    //     font: {
    //          //family: 'Courier New, monospace',
    //          size: 24
    //    },
    //    xref: 'paper',
    //    //x: 0.05,
    //},
    //orientation: -90,
    showlegend: true,
    autosize: true,
    legend: {
        //orientation: 'h',
        //xanchor: 'right',
    },
    margin: {
        t: 0,
        l: 10,
        r: 0,
        b: 0
    },
    polar: polar,
    colorway: viridis_r,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    //annotations: annotations
}


var grid = [
    //[[0, 0.46], [0, 0.46]],
    //[[0, 0.46], [0.56, 1]],
    //[[0.54, 1], [0, 0.46]],
    //[[0.54, 1], [0.56, 1]],
    [[0.0, 0.5], [0.0, 0.5]],
    [[0.5, 1.0], [0.0, 0.4]],
    [[0.0, 0.5], [0.5, 1.0]],
    [[0.5, 1.0], [0.6, 1.0]],
    [[0.5, 1.0], [0.5, 1.0]],
]

var grid = [
    [[0.0, 0.15], [0.0, 1.0]],
    [[0.2, 0.4], [0.0, 1.0]],
    [[0.4, 0.6], [0.0, 1.0]],
    [[0.6, 0.8], [0.0, 1.0]],
    [[0.8, 1.0], [0.0, 1.0]],
]

var cols = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4]
]

// Complete layout for each subplot
for(let i = 0; i < m.length; i++) {
    var copy = {}
    Object.assign(copy, polar);
    copy['domain'] = {
        row: cols[i][0],
        column: cols[i][1]
        //x: grid[i][0],
        //y: grid[i][1]
    }
    console.log(copy.domain)
    layout['polar'+ (i+1)] = copy
}

// Define configuration
var config = {
    responsive: true
}

// Plot
Plotly.newPlot("myDiv", data, layout, config)

/*

[
        {
            text: 'Tazocin',
            font: {
              size: 16,
            },
            align: 'center',
            showarrow: false,
            x: 0.05, //position in x domain
            y: 1, //position in y domain
            xref: 'paper',
            yref: 'paper',
        },
         {
            text: 'Meropenem',
            font: {
              size: 16,
            },
            align: 'center',
            showarrow: false,
            x: 0.24, //position in x domain
            y: 1, //position in y domain
            xref: 'paper',
            yref: 'paper',
        },
         {
            text: 'Vancomycin',
            font: {
              size: 16,
            },
            align: 'center',
            showarrow: false,
            x: 0.50, //position in x domain
            y: 1, //position in y domain
            xref: 'paper',
            yref: 'paper',
        },
         {
            text: 'Gentamicin',
            font: {
              size: 16,
            },
            align: 'center',
            showarrow: false,
            x: 0.75, //position in x domain
            y: 1, //position in y domain
            xref: 'paper',
            yref: 'paper',
        },
         {
            text: 'Combined',
            font: {
              size: 16,
            },
            align: 'center',
            showarrow: false,
            x: 0.96, //position in x domain
            y: 1, //position in y domain
            xref: 'paper',
            yref: 'paper',
        }
    ]
    */

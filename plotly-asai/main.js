

// Helper functions
function vector(N, factor) {
    var v = []
    for (var i = 0; i < N; i ++) {
        v[i] = Math.random()*factor;
    }
    return v
}

function annotations(x, y, offset, color) {
    var annots = []
    for (var i=0 ; i < y.length ; i++ ) {
        var a = {
            xref: 'x',
            yref: 'y',
            x: x[i] + offset,
            y: y[i],
            text: x[i].toFixed(3) + '%',
            font: {
                family: 'Arial',
                size: 12,
                color: color
            },
            showarrow: false,
        }
        annots.push(a);
    }
    return annots
}

// Create data
var N = 10
var y = [...Array(N).keys()];
var y = [
    'Tazocin',
    'Meropenem',
    'Amikacin',
    'Ceftazidine',
    'Ertapenem',
    'Amoxicillin',
    'Gentamicin',
    'Tigecycline',
    'Cefoxitin',
    'Nitrofurantoin'
]
var gram_p = vector(N, 1.0);
var gram_n = vector(N, -1.0);

var colorp = 'rgb(150, 150, 150)'
var colorn = 'rgb(55, 83, 109)'

// Create traces
var data = [
    {
        y: y,
        x: gram_p,
        type: 'bar', //'histogram',
        name: 'positive',
        //textposition: 'inside',
        hoverinfo: 'none',
        marker: {
            color: colorp,
            opacity: 0.6,
            line: {
                color: 'black',
                width: 1
            }
        },
        orientation: 'h',
        text: gram_p.map(e =>
            String(e.toFixed(3)) + '%'),
    },
    {
        y: y,
        x: gram_n,
        type: 'bar', //'histogram',
        name: 'negative',
        //textposition: 'inside',
        hoverinfo: 'none',
        marker: {
            color: colorn,
            opacity: 0.6,
            line: {
                color: 'black',
                width: 1
            }
        },
        orientation: 'h',
        text: gram_n.map(e =>
            String(e.toFixed(3)) + '%'),
    }
];


// Create annotations
var annot_p = annotations(gram_p, y, 0.12, colorp)
var annot_n = annotations(gram_n, y, -0.12, colorn)


// Create layout
var layout = {
    title: 'Spectrum of Activity',
    //height: 250,
    zeroline: false,
    xaxis: {
        range: [-1.25, 1.25],
        showgrid: true,
        visible: true,
        zeroline: false,
        tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
        }
    },
    yaxis: {
        zeroline: false,
        showgrid: false,
        visible: true,
        titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
        },
        tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
        }
    },
    legend: {
        x: 0.0,
        y: 1.12,
        //orientation: 'h',
        //xanchor: 'right',
        bgcolor: 'rgba(255, 255, 255, 0)',
        bordercolor: 'rgba(255, 255, 255, 0)'
    },
    //barmode: 'group', // stack, group, relative
    barmode: 'relative',
    bargap: 0.05,
    bargroupgap: 0.05,
    //margin: {
    //    t: 80,
    //    b: 30,
    //    l: 70,
    //    r: 30
    //},
    margin: {
        t:0,
        b:0,
        l:100,
        r:0
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    showlegend: true,

    // Manual annotations
    //annotations: annot_p.concat(annot_n)
}

// Define configuration
var config = {
    responsive: true
}


// Plot
Plotly.newPlot('myDiv', data, layout, config);
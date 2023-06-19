// Useful urls...
// https://echarts.apache.org/en/option.html#xAxis.nameTextStyle.align

  /**[
   {
            show: true,
            left: 10*30,
            type: 'piecewise',
            seriesIndex: 10, // oxygen saturation
            dimension: 2,
            pieces: [
              {min: 0, max: 80, color: 'lightgray'},
              {min: 80, max:250, color: '#CA605D'}
            ]
        },
   {
            show: true,
            left: 6*30,
            type: 'continuous',
            seriesIndex: 6, // ACPX
            dimension: 2,
            inRange: {
              color: ['white', '#EE6666']
            }
        }
   ]**/

function getDisplayConfigurationFromManual(d) {
    /**
     *
     * @type {{}}
     */
    var aux = {}
    for (const [key, value] of Object.entries(d)) {
        aux[key] = []
        value.forEach(function (code) {
            aux[key].push(CONFIG[code])
        })
    }
    return aux
}

function getVisualMapContinuous(d) {
    return {
        show: true,
        left: 10*30,
        type: 'piecewise',
        seriesIndex: 11,
        dimension: 2,
        pieces: [
            {min: 0,    max: 36.1, color: 'lightgray'},
            {min: 36.1, max: 37.2, color: '#CA605D'},
            {min: 37.2, max: 45.0, color: 'RED'}
        ]
    }
}

function getVisualMapOutOfRange() {

}

// This is just an object to be able to see all the
// possible palettes using the color squares on the
// left hand side when using pyCharm. For more color
// palettes visit:
//
// https://venngage.com/blog/pastel-color-palettes/

var CMAPS = {
    map1: [
        '#edf2fb',
        '#d7e3fc',
        '#ccdbfd',
        '#c1d3fe',
        '#abc4ff'
    ],
    map2: [
        '#d1d1d1',
        '#e1dbd6',
        '#e2e2e2',
        '#f9f6f2',
        '#ffffff'
    ],
    map3: [
        '#ff7477',
        '#e69597',
        '#ceb5b7',
        '#b5d6d6',
        '#9cf6f6'
    ],
    map4: [
        '#cdb4db',
        '#ffc8dd',
        '#ffafcc',
        '#bde0fe',
        '#a2d2ff'
    ],
    map5: [
        '#8A7F8D',
        '#8D7F84',
        '#8D867F',
        '#888D7F',
        '#7F8D82',
        '#7F8C8D',
        '#7F808D'
    ],
    map6: [
        '#E0BBE4',
        '#957DAD',
        '#D291BC',
        '#FEC8D8',
        '#FFDFD3'
    ]
}


const CONFIG_LIST = [

    // Notes
    {
        code: 'NOTE',
        name: 'Notes',
        group: 'Management'
    },

    // Diagnoses
    {
        code: 'DIAG',
        name: 'Diagnoses',
        group: 'Management'
    },

    // Procedures
    {
        code: 'PROC',
        name: 'Procedure',
        group: 'Management'
    },

    // Encounters
    {
        code: 'CAR',
        name: 'Encounters',
        color: '#d7e3fc',
        group: 'Management'
    },

    // Medication
    {
        code: 'AAMI',
        //color: '#fcf4dd'
        group: 'Medication',
        visualMap: {
            continuous: {
                show: true,
                type: 'continuous',
                dimension: 2,
                inRange: {
                  color: ['white', '#3BA272']
                }
            }
        }

    },
    {
        code: 'AMER',
        //color: '#ddedad'
        group: 'Medication',
        visualMap: {
            continuous: {
                show: true,
                type: 'continuous',
                dimension: 2,
                inRange: {
                  color: ['white', '#5470C6']
                }
            }
        }
    },
    {
        code: 'ACPX',
        //color: '#daeaf6',
        group: 'Medication',
        visualMap: {
            continuous: {
                show: true,
                type: 'continuous',
                dimension: 2,
                inRange: {
                  color: ['white', '#EE6666']
                }
            }
        }
    },

    // Vital Signs
    {
        code: 'DBP',
        name: 'Dyastolic (BP)',
        unit: 'mmHg',
        color: '#E0BBE4',
        group: 'Vital Signs',
        range: {
            normal: [0, 80],
            absolute: [0, 250]
        },
        visualMap: {
            continuous: {
                show: false,
                type: 'continuous',
                dimension: 2,
                //min: 35,
                //max: 42,
            },
            discrete: {
                show: true,
                type: 'piecewise',
                text: ['High', 'Low'], // remove to show labels
                pieces: [
                    {min: 0, max:120, color: '#A6CE39', label: 'normal'},
                    {min: 120, max: 129, color: '#FFEC00', label: 'elevated'},
                    {min: 129, max: 139, color: '#FFB600', label: 'hypertension S1'},
                    {min: 139, max: 180, color: '#BA3A02', label: 'hypertension S2'},
                    {min: 180, max: 2000, color: '#990711', label: 'hypertensive crisis'},
                ]
                // https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings
            },
        }
    },
    {
        code: 'BTMP',
        name: 'Body Temp',
        unit: 'C',
        color: '#957DAD',
        group: 'Vital Signs',
        range: {
            normal: [36.1, 37.2],
            absolute: [35, 45]
        },
        visualMap: {
            continuous: {
                show: false,
                type: 'continuous',
                dimension: 2,
                min: 35,
                max: 42,
            },
            discrete: {
                show: true,
                type: 'piecewise',
                text: ['High', 'Low'], // remove to show labels
                pieces: [
                    {min: 0, max:35.9, color: '#FFEC00', label: 'low'},
                    {min: 35.9, max: 37.1, color: '#A6CE39', label: 'normal'},
                    {min: 37.1, max: 38.1, color: '#FFB600', label: 'high'},
                    {min: 38.1, max: 1000, color: '#990711', label: 'fever'},
                ]
            },
            inrange: {
                show: true,
                type: 'continuous',
                dimension: 2,
                min: 35,
                max: 45,
                inRange: {
                  color: ['#3E51C4', '#DADCDF', '#B50827']
                }
            }
        }
    },
    {
        code: 'HR',
        name: 'Heart Rate',
        unit: 'bpm',
        color: '#FEC8D8',
        group: 'Vital Signs',
        visualMap: {
            continuous: {
                show: true,
                type: 'continuous',
                dimension: 2,
                min: 50,
                max: 200,
            }
        }
    },
    {
        code: 'O2SAT',
        name: 'Oxygen Sat',
        color: '#FFDFD3',
        group: 'Vital Signs',
        range: {
            normal: [95, 100],
            range: [70, 100]
        }
    },

    // Laboratory
    {
        code: 'ALP',
        name: 'Akaline phosp',
        color: '#CCD5AE',
        group: 'Laboratory'
    },
    {
        code: 'ALT',
        name: 'Alanine trans',
        color: '#DBE1BC',
        group: 'Laboratory'
    },
    {
        code: 'BIL',
        name: 'Bilirubin',
        color: '#E9EDC9',
        group: 'Laboratory'
    },
    {
        code: 'CRE',
        name: 'Creatinine',
        unit: 'mg/dL',
        color: '#F4F4D5',
        group: 'Laboratory'
    },
    {
        code: 'CRP',
        unit: 'mg',
        color: '#FEFAE0',
        group: 'Laboratory'
    },
    {
        code: 'GLU',
        name: 'Glucose',
        unit: 'mg/dL',
        color: '#FCF4D7',
        group: 'Laboratory'
    },
    {
        code: 'HAE',
        name: 'Haemoglobin',
        unit: '%',
        color: '#FAEDCD',
        group: 'Laboratory'
    },
    {
        code: 'PLT',
        name: 'Platelets',
        color: '#E7C8A0',
        group: 'Laboratory'
    },
    {
        code: 'WBC',
        name: 'White cells',
        color: '#DEB68A', //D4A373
        group: 'Laboratory'
    }
]

// Convert the previous list of elements to a dictionary in which
// the key is the code, and the value is the whole object. This is
// helpful to access the configuration params easily.
const CONFIG = {}
CONFIG_LIST.reduce((groups, item) => {
    groups[item.code] = item
    return groups;
}, CONFIG);

// Create automatic groupings for displayed that will be used
// if the user does not provide the information.
const DISPLAY = {}
CONFIG_LIST.reduce((groups, item) => {
    let category = item.group;
    (groups[category] || (groups[category] = [])).push(item);
    return groups;
}, DISPLAY);

// This shows an example on how to create our own display
// configuration by including the group and the codes of
// the elements that should be added to that group.
const DISPLAY_v1 = {
    'Encounters': [ 'CAR' ],
    'Diagnoses': [ 'DIAG' ],
    'Medications': [
        'AAMI', 'AMER', 'ACPX'
    ],
    'Procedures': [ 'PROC' ],
    'Vital Signs': [
        'BTMP', 'BP', 'HR', 'O2SAT'
    ],
    'Labs': [
        'ALT', 'ALP', 'BIL', 'CRE', 'CRP',
        'GLU', 'HAE',  'PLT', 'WBC'
    ],
    'Notes': [ 'NOTE' ],
}
const GROUPS_v1 = getDisplayConfigurationFromManual(DISPLAY_v1)


// https://coolors.co/palette/ccd5ae-dbe1bc-e9edc9-f4f4d5-fefae0-fcf4d7-faedcd-e7c8a0-deb68a-d4a373




// Generate virtual data
// The data has been created manually.
function getVirtualDataManual() {
    /**
     * Generates manual example.
     */
    return [
        // Encounters
        ['2023-03-01', 'CAR', 0], // Primary Care
        ['2023-03-07', 'CAR', 1], // Emergency
        ['2023-03-21', 'CAR', 2], // Admission
        ['2023-04-15', 'CAR', 3], // Follow up

        // Medications
        ['2023-03-01', 'AAMI', 85],
        ['2023-03-02', 'AAMI', 90],
        ['2023-03-03', 'AAMI', 90],
        ['2023-03-04', 'AAMI', 85],
        ['2023-03-05', 'AAMI', 150],

        ['2023-03-10', 'AMER', 130],
        ['2023-03-11', 'AMER', 150],
        ['2023-03-12', 'AMER', 180],
        ['2023-03-13', 'AMER', 300],
        ['2023-03-14', 'AMER', 300],
        ['2023-03-21', 'AMER', 150],
        ['2023-03-22', 'AMER', 140],
        ['2023-03-23', 'AMER', 130],
        ['2023-03-24', 'AMER', 220],

        ['2023-03-21', 'ACPX', 100],
        ['2023-03-22', 'ACPX', 130],
        ['2023-03-23', 'ACPX', 150],
        ['2023-03-24', 'ACPX', 180],
        ['2023-03-25', 'ACPX', 150],
        ['2023-03-26', 'ACPX', 180],
        ['2023-03-27', 'ACPX', 150],
        ['2023-03-28', 'ACPX', 140],
        ['2023-03-29', 'ACPX', 50],

        // Procedures
        ['2023-03-01', 'PROC', 85, 'X-Ray'],
        ['2023-03-10', 'PROC', 85, 'Computerised Tomography'],
        ['2023-04-01', 'PROC', 85, 'Bone Biopsy'],

        // Notes
        ['2023-03-02', 'NOTE', 85, 'Note 1'],
        ['2023-03-11', 'NOTE', 85, 'Note 2'],
        ['2023-04-02', 'NOTE', 85, 'Note 3'],

        // Diagnoses
        ['2023-03-02', 'DIAG', 85, 'Type II diabetes'],
        ['2023-03-11', 'DIAG', 85, 'Skin and soft tissue infection'],
        ['2023-04-02', 'DIAG', 85, 'Acute kidney injury'],

        // Vital Signs
        ['2023-03-01', 'BTMP', 35],
        ['2023-03-01', 'BTMP', 36],
        ['2023-03-02', 'BTMP', 37],
        ['2023-03-07', 'BTMP', 38],
        ['2023-03-08', 'BTMP', 39],
        ['2023-03-09', 'BTMP', 40],
        ['2023-03-10', 'BTMP', 41],
        ['2023-03-11', 'BTMP', 42],
        ['2023-03-12', 'BTMP', 43],
        ['2023-03-13', 'BTMP', 42],
        ['2023-03-14', 'BTMP', 41],
        ['2023-03-15', 'BTMP', 40],
        ['2023-03-21', 'BTMP', 39],
        ['2023-03-22', 'BTMP', 38],
        ['2023-03-23', 'BTMP', 37],
        ['2023-03-24', 'BTMP', 36],
        ['2023-03-25', 'BTMP', 35],
        ['2023-03-26', 'BTMP', 34],
        ['2023-03-27', 'BTMP', 33],
        ['2023-03-28', 'BTMP', 32],
        ['2023-03-29', 'BTMP', 31],
        ['2023-03-30', 'BTMP', 30],
        ['2023-03-31', 'BTMP', 29],
        ['2023-04-15', 'BTMP', 26],

        ['2023-03-01', 'HR', 60],
        ['2023-03-01', 'HR', 62],
        ['2023-03-02', 'HR', 64],
        ['2023-03-07', 'HR', 66],
        ['2023-03-08', 'HR', 68],
        ['2023-03-09', 'HR', 70],
        ['2023-03-10', 'HR', 75],
        ['2023-03-11', 'HR', 80],
        ['2023-03-12', 'HR', 85],
        ['2023-03-13', 'HR', 90],
        ['2023-03-14', 'HR', 100],
        ['2023-03-15', 'HR', 110],
        ['2023-03-21', 'HR', 120],
        ['2023-03-22', 'HR', 150],
        ['2023-03-23', 'HR', 120],
        ['2023-03-24', 'HR', 110],
        ['2023-03-25', 'HR', 100],
        ['2023-03-26', 'HR', 90],
        ['2023-03-27', 'HR', 80],
        ['2023-03-28', 'HR', 77],
        ['2023-03-29', 'HR', 76],
        ['2023-03-30', 'HR', 75],
        ['2023-03-31', 'HR', 74],
        ['2023-04-01', 'HR', 73],
        ['2023-04-02', 'HR', 72],
        ['2023-04-15', 'HR', 71],

        ['2023-03-01', 'DBP', 70],
        ['2023-03-02', 'DBP', 72],
        ['2023-03-08', 'DBP', 74],
        ['2023-03-09', 'DBP', 76],
        ['2023-03-10', 'DBP', 78],
        ['2023-03-11', 'DBP', 80],
        ['2023-03-12', 'DBP', 82],
        ['2023-03-13', 'DBP', 84],
        ['2023-03-14', 'DBP', 86],
        ['2023-03-15', 'DBP', 110],
        ['2023-03-23', 'DBP', 120],
        ['2023-03-24', 'DBP', 125],
        ['2023-03-25', 'DBP', 135],
        ['2023-03-26', 'DBP', 145],
        ['2023-03-27', 'DBP', 190],
        ['2023-03-28', 'DBP', 145],
        ['2023-03-29', 'DBP', 135],
        ['2023-03-30', 'DBP', 125],
        ['2023-03-31', 'DBP', 78],
        ['2023-04-01', 'DBP', 80],
        ['2023-04-02', 'DBP', 82],
        ['2023-04-15', 'DBP', 84],

        ['2023-03-01', 'O2SAT', 100],
        ['2023-03-02', 'O2SAT', 99],
        ['2023-03-08', 'O2SAT', 98],
        ['2023-03-09', 'O2SAT', 97],
        ['2023-03-10', 'O2SAT', 96],
        ['2023-03-11', 'O2SAT', 95],
        ['2023-03-12', 'O2SAT', 94],
        ['2023-03-13', 'O2SAT', 93],
        ['2023-03-14', 'O2SAT', 92],
        ['2023-03-22', 'O2SAT', 91],
        ['2023-03-23', 'O2SAT', 90],
        ['2023-03-24', 'O2SAT', 89],
        ['2023-03-25', 'O2SAT', 88],
        ['2023-03-26', 'O2SAT', 87],
        ['2023-03-27', 'O2SAT', 86],
        ['2023-03-28', 'O2SAT', 85],
        ['2023-03-29', 'O2SAT', 84],
        ['2023-03-30', 'O2SAT', 83],
        ['2023-04-01', 'O2SAT', 82],
        ['2023-04-02', 'O2SAT', 81],
        ['2023-04-15', 'O2SAT', 80],

        // Laboratory Results
        ['2023-03-01', 'HAE', 1],
        ['2023-03-10', 'HAE', 12],
        ['2023-03-11', 'HAE', 14],
        ['2023-03-12', 'HAE', 12],
        ['2023-03-13', 'HAE', 14],
        ['2023-03-14', 'HAE', 12],
        ['2023-03-15', 'HAE', 12],
        ['2023-03-24', 'HAE', 5],
        ['2023-03-27', 'HAE', 1],
        ['2023-03-28', 'HAE', 0],

        ['2023-03-01', 'GLU', 0],
        ['2023-03-10', 'GLU', 12],
        ['2023-03-11', 'GLU', 14],
        ['2023-03-12', 'GLU', 12],
        ['2023-03-13', 'GLU', 14],
        ['2023-03-14', 'GLU', 12],
        ['2023-03-15', 'GLU', 12],
        ['2023-03-24', 'GLU', 5],
        ['2023-03-27', 'GLU', 1],
        ['2023-03-28', 'GLU', 0],

        ['2023-03-10', 'BIL', 12],
        ['2023-03-11', 'BIL', 14],
        ['2023-03-12', 'BIL', 12],
        ['2023-03-13', 'BIL', 14],
        ['2023-03-14', 'BIL', 12],
        ['2023-03-15', 'BIL', 12],
        ['2023-03-24', 'BIL', 5],
        ['2023-03-25', 'BIL', 1],
        ['2023-03-26', 'BIL', 0],
        ['2023-03-27', 'BIL', 0],
        ['2023-03-28', 'BIL', 0],

        ['2023-03-10', 'CRP', 12],
        ['2023-03-11', 'CRP', 14],
        ['2023-03-12', 'CRP', 12],
        ['2023-03-13', 'CRP', 14],
        ['2023-03-14', 'CRP', 12],
        ['2023-03-15', 'CRP', 12],
        ['2023-03-24', 'CRP', 5],
        ['2023-03-25', 'CRP', 1],
        ['2023-03-26', 'CRP', 0],
        ['2023-03-27', 'CRP', 0],
        ['2023-03-28', 'CRP', 0],

        ['2023-03-10', 'WBC', 12],
        ['2023-03-11', 'WBC', 14],
        ['2023-03-12', 'WBC', 12],
        ['2023-03-13', 'WBC', 14],
        ['2023-03-14', 'WBC', 12],
        ['2023-03-15', 'WBC', 12],
        ['2023-03-24', 'WBC', 5],
        ['2023-03-25', 'WBC', 1],
        ['2023-03-26', 'WBC', 0],
        ['2023-03-27', 'WBC', 0],
        ['2023-03-28', 'WBC', 0],

        ['2023-03-10', 'PLT', 12],
        ['2023-03-11', 'PLT', 14],
        ['2023-03-12', 'PLT', 12],
        ['2023-03-13', 'PLT', 14],
        ['2023-03-14', 'PLT', 12],
        ['2023-03-15', 'PLT', 12],
        ['2023-03-24', 'PLT', 5],
        ['2023-03-27', 'PLT', 1],
        ['2023-03-28', 'PLT', 0],

        ['2023-03-10', 'CRE', 12],
        ['2023-03-11', 'CRE', 14],
        ['2023-03-12', 'CRE', 12],
        ['2023-03-13', 'CRE', 14],
        ['2023-03-14', 'CRE', 12],
        ['2023-03-15', 'CRE', 12],
        ['2023-03-24', 'CRE', 5],
        ['2023-03-25', 'CRE', 1],
        ['2023-03-26', 'CRE', 0],
        ['2023-03-27', 'CRE', 0],
        ['2023-03-28', 'CRE', 0],

        ['2023-03-01', 'ALT', 12],
        ['2023-03-02', 'ALT', 14],
        ['2023-03-09', 'ALT', 12],
        ['2023-03-10', 'ALT', 12],
        ['2023-03-11', 'ALT', 14],
        ['2023-03-12', 'ALT', 12],
        ['2023-03-13', 'ALT', 14],
        ['2023-03-14', 'ALT', 12],
        ['2023-03-15', 'ALT', 12],
        ['2023-03-20', 'ALT', 14],
        ['2023-03-27', 'ALT', 18],
        ['2023-03-25', 'ALT', 12],
        ['2023-03-26', 'ALT', 14],
        ['2023-03-27', 'ALT', 18],
        ['2023-04-15', 'ALT', 18],

        ['2023-03-01', 'ALP', 12],
        ['2023-03-02', 'ALP', 14],
        ['2023-03-10', 'ALP', 12],
        ['2023-03-11', 'ALP', 14],
        ['2023-03-12', 'ALP', 12],
        ['2023-03-13', 'ALP', 14],
        ['2023-03-14', 'ALP', 12],
        ['2023-03-20', 'ALP', 14],
        ['2023-03-27', 'ALP', 18],
        ['2023-03-25', 'ALP', 12],
        ['2023-03-26', 'ALP', 14],
        ['2023-03-27', 'ALP', 18],
        ['2023-04-15', 'ALP', 18],

    ].map(x => [new Date(x[0]), x[1], x[2], x[3] || undefined])
}

function getVirtualData(year) {
    /**
     *
     * @type {number}
     */
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
        data.push([
            new Date(echarts.time.format(time, '{yyyy}-{MM}-{dd}', false)),
            'CRP',
            Math.floor(Math.random() * 10000)
        ]);
    }
    return data;
}


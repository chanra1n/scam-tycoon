var dailyIncomeData = [];
var modifierData = [];
var employeeData = [];


var income_ctx = document.getElementById('income_chart').getContext('2d');
var income_myChart = new Chart(income_ctx, {
    type: 'line',
    data: {
        labels: "", // Labels are "Day 1", "Day 2", etc.
        datasets: [{
            label: '',
            data: dailyIncomeData,
            backgroundColor: 'black',
            borderColor: 'green',
            borderWidth: 1,
            borderCapStyle: 'square',
            pointStyle: 'rect',
        }]
    },
    options: {
        aspectRatio: 1 / 0.3,
        plugins: {
            title: {
                display: false,
                text: '',
                font: {
                    family: 'pst'
                }
            },
            legend: {
                display: false,
                labels: {
                    font: {
                        family: 'pst'
                    }
                }
            },
            tooltip: {
                display: true,
                titleFont: {
                    family: 'pst'
                },
                bodyFont: {
                    family: 'pst'
                },
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label ? (context.dataset.label + ': ') : '';
                        label += '$' + context.parsed.y.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '/day';
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: false
            },
            x: {
                beginAtZero: true,
                display: false
            }
        }
    }
});

var modifier_ctx = document.getElementById('employee_productivity_chart').getContext('2d');
var modifier_myChart = new Chart(modifier_ctx, {
    type: 'line',
    data: {
        labels: "", // Labels are "Day 1", "Day 2", etc.
        datasets: [{
            label: '',
            data: modifierData,
            backgroundColor: 'black',
            borderColor: 'green',
            borderWidth: 1,
            borderCapStyle: 'square',
            pointStyle: 'rect',
        }, {
            label: '',
            data: employeeData,
            backgroundColor: 'black',
            borderColor: 'green',
            borderWidth: 1,
            borderCapStyle: 'square',
            pointStyle: 'rect',

        }]
    },
    options: {
        aspectRatio: 1 / 0.3,
        plugins: {
            title: {
                display: false,
                text: '',
                font: {
                    family: 'pst'
                }
            },
            legend: {
                display: false,
                labels: {
                    font: {
                        family: 'pst'
                    }
                }
            },
            tooltip: {
                display: true,
                titleFont: {
                    family: 'pst'
                },
                bodyFont: {
                    family: 'pst'
                },
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label ? (context.dataset.label + ': ') : '';

                        if (context.datasetIndex === 0) {
                            // Formatting for the first dataset
                            label += '+' + context.parsed.y.toFixed(1) + '%';
                        } else if (context.datasetIndex === 1) {
                            // Formatting for the second dataset
                            // Replace this with your desired formatting
                            label += '+' + context.parsed.y + ' EMP.';
                        }

                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                display: false
            },
            x: {
                beginAtZero: true,
                display: false
            }
        }
    }
});

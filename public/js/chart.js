let MONTHS;
let MONTHS_en = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
let MONTHS_fr = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
];
let QUARTER;
let QUARTER_en = [
    'Quarter 1',
    'Quarter 2',
    'Quarter 3',
    'Quarter 4',
];
let QUARTER_fr = [
    'Trimestre 1',
    'Trimestre 2',
    'Trimestre 3',
    'Trimestre 4',
];
let chart1 = null;
/*let chart2 = null;*/
let chart3 = null;
let chart4 = null;
let ctxbar4 = null;
$(function() {
    if($("#langage").val()=='fr'){
        MONTHS=MONTHS_fr;
        QUARTER=QUARTER_fr;
    }
    else{
        MONTHS=MONTHS_en;
        QUARTER=QUARTER_en;
    }
    var ctxbar1 = $("#bar-chart");
    var ctxbar2 = $("#chart_data_equipment");
    var ctxbar3 = $("#chart_data_OK_NOK");
    ctxbar4 = $("#chart_doughnut");

    chart1 = new Chart(ctxbar1, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: MONTHS,
            datasets: []
        },
        options: {
            plugins: {

                legend: {
                    labels: {
                        filter: (legendItem, chartData) => (!chartData.datasets[legendItem.datasetIndex].data.every(item => item === 0))
                    }
                },
                datalabels: {
                    padding: 3,
                    backgroundColor: 'black',
                    display: function(context) {
                        return context.dataset.data[context.dataIndex] > 0 ? true : false;
                    },
                    borderRadius: 4,
                    color: 'white',
                    font: {
                        weight: 'bold'
                    },
                    formatter: Math.round,
                },
                title: {
                    display: true,
                    text: $('#chart_title3').val()
                },
            },

            // Core options
            aspectRatio: 5 / 3,
            layout: {
                padding: {
                    top: 24,
                    right: 16,
                    bottom: 0,
                    left: 8
                }
            },
            elements: {
                line: {
                    fill: false,
                    tension: 0.4
                },
                point: {
                    hoverRadius: 7,
                    radius: 5
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                    },
                },
                y: {
                    stacked: true,
                    grid: {
                        display: false,
                    },
                }
            }
        }
    });

    chart2 = new Chart(ctxbar2, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: MONTHS,
            datasets: []
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        filter: (legendItem, chartData) => (!chartData.datasets[legendItem.datasetIndex].data.every(item => item === 0))
                    }
                },
                datalabels: {
                    borderRadius: 4,
                    padding: 3,
                    backgroundColor: 'black',
                    display: function(context) {
                        return context.dataset.data[context.dataIndex] > 0 ? true : false;
                    },
                    color: 'white',
                    font: {
                        weight: 'bold'
                    },
                    formatter: Math.round,
                },
                title: {
                    display: true,
                    text: $('#chart_title1').val()
                },
            },

            // Core options
            aspectRatio: 5 / 3,
            layout: {
                padding: {
                    top: 24,
                    right: 16,
                    bottom: 0,
                    left: 8
                }
            },
            elements: {
                line: {
                    fill: false,
                    tension: 0.4
                },
                point: {
                    hoverRadius: 7,
                    radius: 5
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                    },
                },
                y: {
                    stacked: true,
                    grid: {
                        display: false,
                    },
                }
            }
        }
    });
    /*var barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Member Agreement Tracker',
            backgroundColor: 'red',
            stack: 'Stack 0',
            data: [
                66,
                93,
                31,
                76,
                39,
                75,
                36
            ]
        }, {
            label: 'Employee On Boarding',
            backgroundColor: 'blue',
            stack: 'Stack 0',
            data: [
                76,
                203,
                41,
                86,
                49,
                85,
                46
            ]
        }, {
            label: 'Vendor Payment',
            backgroundColor: 'yellow',
            stack: 'Stack 0',
            data: [
                76,
                103,
                41,
                86,
                49,
                85,
                46
            ]
        },
        {
            label: 'Vendor Payment',
            backgroundColor: 'yellow',
            stack: 'Stack 1',
            data: [
                76,
                103,
                41,
                86,
                49,
                85,
                46
            ]
        },
         {
            label: 'Employee On Boarding',
            backgroundColor: 'blue',
            stack: 'Stack 1',
            data: [
                56,
                56,
                83,
                21,
                66,
                29,
                65
            ]
        }]

    };
    window.onload = function() {
        var ctx = document.getElementById('chart_data_OK_NOK').getContext('2d');
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                title: {
                    display: true,
                    text: 'Wisdom Application My To Do'
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    custom: function (tooltipModel) {

                    }
                },

                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true,
                         scaleLabel: {
                            display: true,
                            labelString: 'Task Count'
                          }
                    }]
                }
            }
        });
    };*/

    chart3 = new Chart(ctxbar3, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: MONTHS,
            datasets: []
        },

        options: {
            plugins: {
                legend: {
                    labels: {
                        filter: (legendItem, chartData) => (!chartData.datasets[legendItem.datasetIndex].data.every(item => item === 0))
                    }
                },
                datalabels: {
                    /*borderColor:'white',
                    borderWidth: 1,*/
                    borderRadius: 4,
                    padding: 1,
                    backgroundColor: 'black',
                    /*backgroundColor: function(context) {
                        /*if(context.dataset.sig=='ok'){
                            return '#0095da';
                        }
                        else{
                            return 'red';
                        }*/
                    //console.log(context.dataset.sig);
                    /*return context.dataset.backgroundColor;
                    },*/
                    display: function(context) {
                        return context.dataset.data[context.dataIndex] > 0 ? true : false;
                    },
                    color: 'white',
                    font: {
                        weight: 'bold'
                    }
                },
                title: {
                    display: true,
                    text: $('#chart_title2').val()
                },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            /*console.log(item)
                            var label = data.datasets[item.datasetIndex].labels[item.index];
                            var value = data.datasets[item.datasetIndex].data[item.index];
                            return label + ': ' + value;*/
                            
                            return item.dataset.label+': ' +item.formattedValue+' | '+ item.dataset.sig;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                    },
                },
                y: {
                    stacked: true,
                    grid: {
                        display: false,
                    },
                }
            },
            tooltips: {
                callbacks: {
                    mode: 'x',
                },

            },
            responsive: true
        }
    });


    /*chart4 = new Chart(ctxbar4, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [
            {
                data: [5,5, 10,9],
                backgroundColor: colors,
                borderColor: colors,
            },
            {
                data: [5,5, 10,9],
                backgroundColor: colors,
                borderColor: colors,
            },

            ]
        },
        options: options

    });*/


    chart4 = new Chart(ctxbar4, {
        plugins: [ChartDataLabels],
        type: 'pie',
        data: {
            datasets: [{
                    labels: [],
                    backgroundColor: [],
                    data: [],
                    datakeys: [],
                    weight: 0.4,
                    /*datalabels: {
                        labels: {
                            value: {
                              color: 'white'
                            }
                        },
                        label: [],
                        anchor: 'end',
                        align : 'end',
                        backgroundColor: 'grey',
                        borderWidth: 2,
                        borderRadius:5
                    },*/
                    borderColor: '#ced4d9',
                    borderWidth: 1,
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                    }
                },
                {
                    
                    labels: [],
                    label: [],
                    datakeys: [],
                    backgroundColor: [],
                    data: [],
                    /*datalabels: {
                        labels: {
                            value: {
                              color: 'white'
                            }
                        },
                        anchor: 'center',
                        align : 'center',
                        backgroundColor: 'grey',
                        borderWidth: 2,
                        borderRadius:5
                    },*/
                    borderColor: 'transparent',
                    borderWidth: 0,
                    datalabels: {
                        anchor: 'end',
                        align: 'center',
                    }
                }
            ]
        },
        options: {
            cutout:'0%',
            plugins: {
                datalabels: {
                    labels: {
                        value: {
                            color: 'white'
                        }
                    },
                    
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderRadius: 4,

                    /*backgroundColor: function(context) {
                        return context.dataset.backgroundColor;
                    },*/
                    borderColor: function(context) {
                        return context.dataset.backgroundColor;
                    },
                    //color: 'white',
                    display: function(context) {
                        if (chart4.getDatasetMeta(context.datasetIndex).data[context.dataIndex].hidden == true)
                            return false;
                        return context.dataset.data[context.dataIndex] == 0 ? false : true;
                    },
                    font: {
                        weight: 'bold'
                    },
                    padding: 2,
                    /*formatter:  function (value, context) {
                        if(context.datasetIndex==1){
                        return context.dataset.label[context.dataIndex]+' ('+value+')';
                        }
                        if(context.datasetIndex==0){
                        return context.dataset.datakeyval[context.dataIndex]+' ('+value+')';
                        }
                        return '('+value+')';
                    }*/
                },
                tooltip: {
                    callbacks: {
                        label: function (item) {
                            /*console.log(item)
                            var label = data.datasets[item.datasetIndex].labels[item.index];
                            var value = data.datasets[item.datasetIndex].data[item.index];
                            return label + ': ' + value;*/

                            var label = item.dataset.datakeys[item.dataIndex%item.dataset.datakeys.length];
                            
                            return label +' : '+ item.formattedValue;
                        }
                    }
                }
            },
            
            // Core options
            aspectRatio: 4 / 3,
            cutoutPercentage: 32,
            layout: {
                padding: 20
            },
            elements: {
                arc: {
                    borderWidth: 4,
                },

                line: {
                    fill: false
                },
                point: {
                    hoverRadius: 7,
                    radius: 5
                }
            },
        }
    });



});

function generateLegend(datasets) {

    var results = [];

    datasets.forEach((data, datasetIndex) => {
        var h4_ul = document.createElement('h5');
        
        if (datasetIndex == 0)
            h4_ul.innerText = 'Details';
        else
            h4_ul.innerText = 'Sites';

        var ul = document.createElement('ul');
        ul.appendChild(h4_ul);

        data.datakeys.forEach((value, index) => {
            if (!(datasetIndex == 1 && data.data[index] == 0)) {

                var span = document.createElement('span');
                span.style.backgroundColor = data.backgroundColor[index];

                var li = document.createElement('li');
                li.setAttribute("data-index", index);
                li.setAttribute("data-dataset-index", datasetIndex);
                li.setAttribute("onclick", 'pieLegendElementClicked(this)');

                li.appendChild(span);
                li.appendChild(document.createTextNode(value));

                ul.appendChild(li);
            }

        });

        results.push(ul);

    });
    window.DatasetMeta.forEach((data, index) => {
        data.data.forEach(item => {
            item.hidden = null;
        });
    });
    chart4.update();
    return results;
}

function pieLegendElementClicked(element) {


    var index = element.dataset.index;
    var datasetIndex = element.dataset.datasetIndex;
    var meta = window.DatasetMeta[0];
    var meta1 = window.DatasetMeta[1];
    var item = window.DatasetMeta[datasetIndex].data[index];
    var dataset=chart4.data.datasets[0];
    var dataset1=chart4.data.datasets[1];
    var DetailsCount = window.mapping.DetailsCount;//12
    var SitesCount = window.mapping.SitesCount;//13
    var Data_DetailsCount = chart4.data.datasets[0].data.length;//156

    if (item.hidden == null || item.hidden === false || (datasetIndex==0 && !$('.pie-chart ul:eq(0) li:eq('+index+')').hasClass('hidden'))) {
        if(datasetIndex==0){
            var related_data_details = []; //month 2 [1,13,25..]
            for (var index = 0; index < Data_DetailsCount; index+=DetailsCount) {
                related_data_details.push(index+parseInt(element.dataset.index));
            }
            related_data_details.forEach((value,index)=>{
                meta.data[value].hidden = true;
                dataset1.data[parseInt(value/DetailsCount)] -= dataset.data[value];
            });
            
        }
        if(datasetIndex==1){
            meta1.data[index].hidden = true;

            var related_data_details = []; //month 2 [0,1,2..]
            for (var index = DetailsCount*parseInt(element.dataset.index); index < DetailsCount*(parseInt(element.dataset.index)+1); index++) {
                related_data_details.push(index);
            }

            related_data_details.forEach((value,index)=>{
                meta.data[value].hidden = true;
            });

        }
        element.classList.add('hidden');

    }
    else{
        if(datasetIndex==0){
            var related_data_details = []; //month 2 [1,13,25..]
            for (var index = 0; index < Data_DetailsCount; index+=DetailsCount) {
                related_data_details.push(index+parseInt(element.dataset.index));
            }
            related_data_details.forEach((value,index)=>{
                if(!meta1.data[parseInt(value/DetailsCount)].hidden)
                meta.data[value].hidden = null;
                dataset1.data[parseInt(value/DetailsCount)] += dataset.data[value];
            });
        }
        if(datasetIndex==1){
            meta1.data[index].hidden = null;

            var related_data_details = []; //month 2 [0,1,2..]
            for (var index = DetailsCount*parseInt(element.dataset.index); index < DetailsCount*(parseInt(element.dataset.index)+1); index++) {
                related_data_details.push(index);
            }
            related_data_details.forEach((value,index)=>{
                if(!$('.pie-chart ul:eq(0) li:eq('+index+')').hasClass('hidden'))
                meta.data[value].hidden = null;
            });

        }
        element.classList.remove('hidden');

    }
    chart4.update();

    // month 2 [1,13,25..]
    // item = 2
    // item + DetailsCount )) 0- Data_DetailsCount
    /*
    var item = 1;
    var DetailsCount = 12;
    for (var index = DetailsCount*item; index < DetailsCount*(item+1); index++) {

        const element =  index;
        console.log(element);
    }

    */
    /*if (item.hidden == null || item.hidden === false) {
        //window.dataOriginal


        if (element.dataset.datasetIndex == 0) {
            meta.data.forEach((va) => {
                if (index == va.$context.index % window.mapping.DetailsCount) {
                    va.hidden = true;
                }

            });

            var meta2 = window.DatasetMeta[1];
            meta2._dataset.data.forEach((element, i) => {
                var x = parseInt(parseInt(index) + i * (window.mapping.DetailsCount));
                element = element - window.dataOriginal[x];
                meta2._dataset.data[i] = element;
            });
        }
        if (element.dataset.datasetIndex == 1) {
            item.hidden = true;
            var meta2 = window.DatasetMeta[0];
            for (var j = parseInt(parseInt(index) * window.mapping.DetailsCount); j < (window.mapping.DetailsCount * (parseInt(index) + 1)); j++) {
                meta2._dataset.data[j] = 0;
            }
        }
        element.classList.add('hidden');

    } else {
        
        
        if(element.dataset.datasetIndex==0){
            meta.data.forEach((va)=>{
                if(index==va.$context.index%window.mapping.DetailsCount)
                {
                    va.hidden = null;
                }
            });

            var meta2 = window.DatasetMeta[1];
            meta2._dataset.data.forEach((element, i) => {
                var x = parseInt(parseInt(index) + i * (window.mapping.DetailsCount));
                if (meta2.data[i].hidden == true) {
                    if (element < window.dataOriginal[x])
                        element = element + window.dataOriginal[x];
                } else
                    element = element + window.dataOriginal[x];
                meta2._dataset.data[i] = element;

            });
            meta._dataset.data[index] = window.dataOriginal[index];

        }
        if (element.dataset.datasetIndex == 1) {
            item.hidden = null;
            var meta2 = window.DatasetMeta[0];
            for (var j = parseInt(parseInt(index) * window.mapping.DetailsCount); j < (window.mapping.DetailsCount * (parseInt(index) + 1)); j++) {
                meta2._dataset.data[j] = window.dataOriginal[j];
            }
            //meta._dataset.data[index]= window.dataOriginal2[index];
        }
        element.classList.remove('hidden');
    }
    chart4.update();*/
};

function equipementChartSearch() {
    var data = $('#equipement_form').serialize();
    const interval = equipement_form.interval1.value;
    $.get("/getEquipementChartData",
            data
        )
        .done(function(data) {
            var labels = MONTHS;
            if (interval == 2) {
                labels = QUARTER;
            }
            if (interval == 3) {
                labels = Object.keys(data[0].equipement_total);
            }
            var cData = Object.values(data[0].equipement_total);
            var cDataOK = Object.values(data[0].equipement_ok);
            var cDataNOK = Object.values(data[0].equipement_nok);
            //updateData(chart4, labels, [cData]);
            updateDataStack(chart2, labels, data);
            updateDoughnat(chart4, labels, data);
            updateData(chart3, labels, [cDataOK, cDataNOK], data);
        });
}

function updateDoughnat(chart, label, data) {

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

    chart.data.datasets[0].data = [];
    chart.data.datasets[0].datakeys = label;
    chart.data.datasets[0].datavalues = [];
    chart.data.datasets[0].backgroundColor = [];
    chart.data.datasets[1].datakeys = [];
    chart.data.datasets[1].data = [];
    chart.data.datasets[1].backgroundColor = [];

    var colors = [];

    data.forEach((dataset, index) => {
        var datavalues = Object.values(Object.values(dataset)[0].equipement_total);
        chart.data.datasets[1].datakeys.push(Object.keys(dataset)[0]);
        chart.data.datasets[1].data.push(sumValues(Object.values(dataset)[0].equipement_total));

        chart.data.datasets[1].backgroundColor.push(getRandomColor());

        for (let i = 0; i < datavalues.length; i++) {
            chart.data.datasets[0].data.push(datavalues[i]);
            if (colors[i] == null)
                colors.push(getRandomColor());
            chart.data.datasets[0].backgroundColor.push(colors[i]);
        }

    });
    window.mapping = {
        "DetailsCount": label.length,
        "SitesCount": chart.data.datasets[1].datakeys.length,
    };
    window.dataOriginal = chart.data.datasets[0].data.slice();
    window.dataOriginal2 = chart.data.datasets[1].data.slice();
    chart.update();

    var myLegendContainer = $("#legend");

    myLegendContainer.html('');
    window.DatasetMeta = [chart4.getDatasetMeta(0), chart4.getDatasetMeta(1)];

    // generate HTML legend
    generateLegend(chart4.data.datasets).forEach(ul => {
        myLegendContainer.append(ul);
    });


}

function updateData(chart, label, data, all) {



    chart.data.labels = label;
    chart.data.datasets = [];
    var datacount = 0;

    all.forEach((dataset, index) => {
        var backgroundColor;

        backgroundColor = getRandomColor();

        var stack0 = {
            label: '',
            backgroundColor: backgroundColor,
            data: [],
            sig: 'ok',
            stack: '0',
            borderColor: 'rgb(0 255 0)',
            borderWidth: {
                top: 0,
                right: 3,
                bottom: 0,
                left: 3
            }
        };
        var stack1 = {
            label: '',
            backgroundColor: backgroundColor,
            data: [],
            sig: 'nok',
            stack: '1',
            borderColor: 'red',
            borderWidth: {
                top: 0,
                right: 3,
                bottom: 0,
                left: 3
            }
        };
        if (!chart.data.datasets[datacount]) {
            chart.data.datasets.push(stack0);
        }
        if (!chart.data.datasets[datacount + 1]) {
            chart.data.datasets.push(stack1);
        }

        if (Object.values(dataset)[0].equipement_ok) {
            chart.data.datasets[datacount].data = Object.values(Object.values(dataset)[0].equipement_ok);
            chart.data.datasets[datacount].label = Object.keys(dataset)[0];
            chart.data.datasets[datacount].stack = '0';
        }
        if (Object.values(dataset)[0].equipement_nok) {
            chart.data.datasets[datacount + 1].data = Object.values(Object.values(dataset)[0].equipement_nok);
            chart.data.datasets[datacount + 1].label = Object.keys(dataset)[0];
            chart.data.datasets[datacount + 1].stack = '1';
        }

        datacount += 2;

    });


    chart.update();
}

function makeColor(colorNum, colors) {
    if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
    return colorNum * (360 / colors) % 360;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateDataStack(chart, label, data) {
    chart.data.labels = label;
    data.shift();
    chart.data.datasets = [];
    var colors = [];
    data.forEach((dataset, index) => {
        if (colors[index] == null)
            colors.push(getRandomColor());
        var newDataset = {
            label: Object.keys(dataset)[0],
            backgroundColor: colors[index],
            data: [],
            datalabels: {
                align: 'center',
                anchor: 'center'
            }
        };
        if (!chart.data.datasets[index]) {
            chart.data.datasets.push(newDataset);
        }
        if (Object.values(dataset)[0].equipement_total)
            chart.data.datasets[index].data = Object.values(Object.values(dataset)[0].equipement_total);
        else
            chart.data.datasets[index].data = Object.values(Object.values(dataset)[0]);
    });


    chart.update();
}


function consumableChartSearch() {
    var data = $('#consumable_form').serialize();
    const interval = consumable_form.interval2.value;
    $.get("/getConsumableChartData",
            data
        )
        .done(function(data) {
            var labels = MONTHS;
            if (interval == 2) {
                labels = QUARTER;
            }
            if (interval == 3) {
                labels = Object.keys(Object.values(Object.values(Object.values(data))[1])[0]);
            }
            updateDataStack(chart1, labels, data);
        });
}

$(".datepicker").datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years",
});
$("#interval1").change(function() {
    var selectedInterval = $(this).children("option:selected").val();
    if (selectedInterval == 3) {
        $('#year1').hide('slow');
        $('#from1').show('slow');
        $('#to1').show('slow');
    } else {
        $('#year1').show('slow');
        $('#from1').hide('slow');
        $('#to1').hide('slow');
    }
});
$("#interval2").change(function() {
    var selectedInterval = $(this).children("option:selected").val();
    if (selectedInterval == 3) {
        $('#year2').hide('slow');
        $('#from2').show('slow');
        $('#to2').show('slow');
    } else {
        $('#year2').show('slow');
        $('#from2').hide('slow');
        $('#to2').hide('slow');
    }
});
$("#product1").change(function() {
    var selectedProduct = $(this).children("option:selected").val();
    $.get("/system/" + selectedProduct + "/equipement/getProductSites", function(data, message, xhr) {
        $('#site1')
            .find('option')
            .remove();
        if (message === 'success') {
            $.each(data, function(k, v) {
                // create option
                var option = $('<option>');
                // set its value
                option.val(v.id);
                // set its text
                option.text(v.signifi);
                // append it to select element
                $("#site1").append(option);
            });
        }
    }, 'json');
    $.get("/system/" + selectedProduct + "/equipement/getTypes", function(data, message, xhr) {
        $('#type')
            .find('option')
            .not(':first')
            .remove();
        if (message === 'success') {
            $.each(data, function(k, v) {
                // create option
                var option = $('<option>');
                // set its value
                option.val(v.id);
                // set its text
                option.text(v.name);
                // append it to select element
                $("#type").append(option);
            });
        }
    }, 'json');
});
$("#type").change(function() {
    var selectedProduct = $('#product1').children("option:selected").val();
    var selectedType = $(this).children("option:selected").val();
    $.get("/system/" + selectedProduct + "/equipement/getModels/" + selectedType, function(data,
        message,
        xhr) {
        $('#model')
            .find('option')
            .not(':first')
            .remove();
        
        if (message === 'success') {
            $.each(data, function(k, v) {
                // create option
                var option = $('<option>');
                // set its value
                option.val(v.id);
                // set its text
                option.text(v.name);
                // append it to select element
                $("#model").append(option);
            });
        }
    }, 'json');
});
$("#product2").change(function() {
    var selectedProduct = $(this).children("option:selected").val();
    $.get("/system/" + selectedProduct + "/equipement/getProductSites", function(data, message, xhr) {
        $('#site2')
            .find('option')
            .remove();
        if (message === 'success') {
            $.each(data, function(k, v) {
                // create option
                var option = $('<option>');
                // set its value
                option.val(v.id);
                // set its text
                option.text(v.signifi);
                // append it to select element
                $("#site2").append(option);
            });
        }
    }, 'json');
    $.get("/system/" + selectedProduct + "/rechange_and_conso/getPiecesList", function(data, message, xhr) {
        if (message === 'success') {
            $('#reference')
                .find('option')
                .not(':first')
                .remove();
            $.each(data, function(k, v) {
                // create option
                var option = $('<option>');
                // set its value
                option.val(v.id);
                // set its text
                option.text(v.selection);
                // append it to select element
                $("#reference").append(option);
            });
        }
    }, 'json');
});
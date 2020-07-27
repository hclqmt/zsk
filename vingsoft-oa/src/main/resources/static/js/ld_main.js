$(function() {
    /**
     * 累计处理-近7天
     */
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/total/1",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("total1");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    title: {
                        text: '累计处理'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },


                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            "axisLabel":{
                                interval: 0
                            },
                            boundaryGap: false,
                            data: result.content[0]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '近7日',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: result.content[1],
                            //平均值的配置
                            markLine : {
                                type:'line',
                                data : [　{type : 'average', name: '平均值'}]
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });


});

$(function () {

/**
 * 处理趋势-近7天
 */
$.ajax({
    type: "get",
    url: Feng.ctxPath + "/visual/trend/1",
    dataType: "json",
    cache: false,
    async: false,
    timeout: 60000,
    success: function (result) {
        if (result.state = 1) {
            //加载可视化柱状图
            var dom = document.getElementById("trend1");
            var myChart = echarts.init(dom);
            var app = {};
            option = null;
            option = {
                title: {
                    text: '处理趋势'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },


                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        "axisLabel":{
                            interval: 0
                        },
                        boundaryGap: false,
                        data: result.content[0]
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [

                    {
                        name: '近7日',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: result.content[1],
                        //平均值的配置
                        markLine : {
                            type:'line',
                            data : [　{type : 'average', name: '平均值'}]
                        }
                    }
                ]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }


        } else {
            Feng.error(result.msg);
        }
    },
    error: function (err) {
        Feng.error("系统繁忙，请稍后重试！");
    }
});
});


$(function () {

    /**
     * 分类明细-近7天
     */
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/classify/1",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("classify1");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        dimensions: ['product', '2015', '2016', '2017'],
                        source:result.content
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });
});


function total2() {
    /**
     * 累计处理-近一个月
     */
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/total/2",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("total2");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    title: {
                        text: '累计处理'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },


                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            "axisLabel":{
                                interval: 0
                            },
                            boundaryGap: false,
                            data: result.content[0]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '近一个月',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: result.content[1],
                            //平均值的配置
                            markLine : {
                                type:'line',
                                data : [　{type : 'average', name: '平均值'}]
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });
};

function total3() {
    /**
     * 累计处理-近三个月
     */
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/total/3",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("total3");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    title: {
                        text: '累计处理'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },


                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            "axisLabel":{
                                interval: 0
                            },
                            boundaryGap: false,
                            data: result.content[0]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '近三个月',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: result.content[1],
                            //平均值的配置
                            markLine : {
                                type:'line',
                                data : [　{type : 'average', name: '平均值'}]
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });
};

function total4() {
    /**
     * 累计处理-近半年
     */
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/total/4",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("total4");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    title: {
                        text: '累计处理'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },


                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            "axisLabel":{
                                interval: 0
                            },
                            boundaryGap: false,
                            data: result.content[0]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '近半年',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: result.content[1],
                            //平均值的配置
                            markLine : {
                                type:'line',
                                data : [　{type : 'average', name: '平均值'}]
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });
};

function total5() {
    /**
     * 累计处理-近一年
     */
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/total/5",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("total5");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    title: {
                        text: '累计处理'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },


                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            "axisLabel":{
                                interval: 0
                            },
                            boundaryGap: false,
                            data: result.content[0]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '近一年',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: result.content[1],
                            //平均值的配置
                            markLine : {
                                type:'line',
                                data : [　{type : 'average', name: '平均值'}]
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });
};


/**
 * 处理趋势-近一个月
 */
function trend2() {
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/trend/2",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("trend2");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    title: {
                        text: '处理趋势'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },


                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            "axisLabel": {
                                interval: 2
                            },
                            boundaryGap: false,
                            data: result.content[0]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '近一个月',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: result.content[1],
                            //平均值的配置
                            markLine: {
                                type: 'line',
                                data: [{type: 'average', name: '平均值'}]
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });
}

/**
 * 处理趋势-近三个月
 */
function trend3() {
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/trend/3",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("trend3");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    title: {
                        text: '处理趋势'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },


                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            "axisLabel": {
                                interval: 4
                            },
                            boundaryGap: false,
                            data: result.content[0]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '近三个月',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: result.content[1],
                            //平均值的配置
                            markLine: {
                                type: 'line',
                                data: [{type: 'average', name: '平均值'}]
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });
}
function trend4(){
/**
 * 处理趋势-近半年
 */
$.ajax({
    type: "get",
    url: Feng.ctxPath + "/visual/trend/4",
    dataType: "json",
    cache: false,
    async: false,
    timeout: 60000,
    success: function (result) {
        if (result.state = 1) {
            //加载可视化柱状图
            var dom = document.getElementById("trend4");
            var myChart = echarts.init(dom);
            var app = {};
            option = null;
            option = {
                title: {
                    text: '处理趋势'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },


                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        "axisLabel":{
                            interval: 6
                        },
                        boundaryGap: false,
                        data: result.content[0]
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [

                    {
                        name: '近半年',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: result.content[1],
                        //平均值的配置
                        markLine : {
                            type:'line',
                            data : [　{type : 'average', name: '平均值'}]
                        }
                    }
                ]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }


        } else {
            Feng.error(result.msg);
        }
    },
    error: function (err) {
        Feng.error("系统繁忙，请稍后重试！");
    }
});
}

/**
 * 处理趋势-近一年
 */
function trend5() {
    $.ajax({
        type: "get",
        url: Feng.ctxPath + "/visual/trend/5",
        dataType: "json",
        cache: false,
        async: false,
        timeout: 60000,
        success: function (result) {
            if (result.state = 1) {
                //加载可视化柱状图
                var dom = document.getElementById("trend5");
                var myChart = echarts.init(dom);
                var app = {};
                option = null;
                option = {
                    title: {
                        text: '处理趋势'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },


                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            "axisLabel": {
                                interval: 8
                            },
                            boundaryGap: false,
                            data: result.content[0]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [

                        {
                            name: '近一年',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: result.content[1],
                            //平均值的配置
                            markLine: {
                                type: 'line',
                                data: [{type: 'average', name: '平均值'}]
                            }
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }


            } else {
                Feng.error(result.msg);
            }
        },
        error: function (err) {
            Feng.error("系统繁忙，请稍后重试！");
        }
    });
}

jQuery.support.cors = true;
AjaxUtil = {
    Request: function (requestType, url, postData, callback, error, async, options) {
        if (async == undefined) {
            async = true;
        }
        if (requestType.toLowerCase() == "get" && postData != null) {
            if (url.indexOf("?") == -1) {
                url += "?" + CommonUtil.GetQueryParamByModel(postData).trimEnd("&");
            } else {
                url += "&" + CommonUtil.GetQueryParamByModel(postData).trimEnd("&");
            }
        }
        var randomId = CommonUtil.GetRandomId();
        var loadingTipId = "loadingTip_" + randomId;
        var loadingTipMsg = "loadingTipMsg_" + randomId;
        $.ajax({
            type: requestType,
            contentType: "application/json",
            url: url,
            data: postData == null ? null : JSON.stringify(postData),
            async: async,
            beforeSend: function () {
                if (!(!!options && !!options.hideLoading && options.hideLoading == true)) {
                    $("<div id=\"" + loadingTipId + "\" style=\"background: #ccc;position:absolute;left:0;top:0;width:100%;height:100%;opacity:0.3;filter:alpha(opacity=30);display: none;z-index:9999;\"></div>").css({ display: "block", width: "100%", height: $(document).height() }).appendTo("body");
                    $("<div id=\"" + loadingTipMsg + "\" style=\"border-color: #95B8E7;position: fixed;top: 50%;margin-top: -20px;padding: 10px 5px 10px 30px;width: auto !important;border-width: 2px;border-style: solid;display: none;background: #ffffff url('/Content/img/loading2.gif') no-repeat scroll 5px center;z-index:9999;\"></div>").html("正在处理，请稍候......").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
                }
            },
            complete: function () {
                if (!(!!options && !!options.hideLoading && options.hideLoading == true)) {
                 
                }
            },
            success: function (data) {
                //if (data == "Invalid Session") {
                //    window.location.href = "/Login.aspx";
                //}

                if (!(!!options && !!options.hideLoading && options.hideLoading == true)) {
                    //$("#loadingTipMsg").remove();
                    $("#" + loadingTipId).remove();
                    $("#" + loadingTipMsg).remove();
                }
                if (!!callback) {
                    callback(data);
                }
            },
            error: function (err) {
                if (!(!!options && !!options.hideLoading && options.hideLoading == true)) {
                    //$("#loadingTipMsg").remove();
                    $("#" + loadingTipId).remove();
                    $("#" + loadingTipMsg).remove();
                }
                var statusCode = err.statusCode().status;
                var statusText = err.statusCode().statusText;
                //if (statusCode == 0) {
                //    window.location.href = "/Login.aspx";
                //    return;
                //}
                if (statusCode == 401 || statusCode == 404 || statusCode == 500) {
                  
                    return;
                }//Unauthorized
                if (!!error) {
                    error(err);
                    return;
                }
                return;
            }
        });
    },
    BootstrapTable: function (obj, requestType, url, queryParams, columns, onClickRow, pageSize, formatShowingRows, pagination, rowStyle) {
     
        if (pageSize == undefined) {
            pageSize = 15;
        }
        if (pagination == undefined) {
            pagination = true;
        }
        if (rowStyle == undefined) {
            rowStyle = function (row, index) { return {}; }
        }
        var $table = $(obj).bootstrapTable({
            method: requestType,
            url: url,
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: pagination,          //是否显示分页（*）
            sortable: false,           //是否启用排序
            sortOrder: "asc",          //排序方式
            queryParams: queryParams,//传递参数（*）
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,            //初始化加载第一页，默认第一页
            pageSize: pageSize,            //每页的记录行数（*）
            pageList: [5, 10,15, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            cardView: false,          //是否显示详细视图
            detailView: false,          //是否显示父子表
            columns: columns,
            onClickRow: onClickRow,
            formatShowingRows: formatShowingRows,
            rowStyle: rowStyle,
            onLoadError: function (status) {

            }
        });
        return $table;
    }
   
};





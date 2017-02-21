/**
 * Created by limx on 2017/1/27.
 */
jQuery.alert = function (msg, type, callback) {
    if (typeof type == "undefined") type = "success";
    var html = "";
    html += '<div id="alert" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">';
    html += '<div class="modal-dialog modal-sm" role="document">';
    html += '<div class="alert alert-' + type + '" role="alert">' + msg + '</div>';
    html += '</div>';
    html += '</div>';
    $("#modal").html(html);
    $('#alert').modal();
    $('#alert').on('hidden.bs.modal', function (e) {
        $("#modal").html("");
        if (typeof callback == "function") {
            callback();
        }
    });
};
jQuery.success = function (msg, callback) {
    jQuery.alert(msg, "success", callback);
};
jQuery.info = function (msg, callback) {
    jQuery.alert(msg, "info", callback);
};
jQuery.warn = function (msg, callback) {
    jQuery.alert(msg, "warning", callback);
};
jQuery.error = function (msg, callback) {
    jQuery.alert(msg, "danger", callback);
};
jQuery.setSideBar = function (index) {
    $(".nav-sidebar>li").eq(index).addClass("active");
};
jQuery.httpGet = function (e, callback) {
    var url = $(e).attr('data-url');
    var form = $(e).parent().get(0);
    var json = {};
    $.each(form, function (i, v) {
        var field = $(v).attr('name');
        var val = $(v).val();
        json[field] = val;
    })
    $.post(url, json, function (jsonData) {
        if (jsonData.status == 1) {
            $.success("数据返回成功！");
            callback(jsonData.data);
        } else {
            $.error(jsonData.message);
        }
    }, "json");
};
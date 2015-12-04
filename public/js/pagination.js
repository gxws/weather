(function() {
    "use strict";

    var root = this;

    template.helper('defaultImg', function(img, defimg) {
        var defimg = defimg;
        if (!defimg) {
            defimg = '../public/images/car-default.jpg';
        }
        if (!img) {
            img = defimg;
        }
        return img;
    });
    template.helper('dateFormat', function(date, format) {

        date = new Date(date);

        var map = {
            "M": date.getMonth() + 1, //月份 
            "d": date.getDate(), //日 
            "h": date.getHours(), //小时 
            "m": date.getMinutes(), //分 
            "s": date.getSeconds(), //秒 
            "q": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    });

    var pagination = function(options) {
        var defaults = {
            template_id: "", //模版id
            container_id: "", //容器id
            prev: "prev", //上一页
            next: "next", //下一页
            curr: 1, //客户端当前页
            size: 4, //每页显示个数
            total: 1, //总记录数
            row: 4, //每行个数 用来做翻页控制
            items: [] //数据
        };
        var param = defaults;
        for (var key in options) {
            param[key] = options[key];
        }
        param.total = param.total || param.items.length;

        if (!param.template_id || !param.container_id || param.items.length === 0) return;

        var loadData = function() {
            var start = 0;
            var prev = document.getElementById(param.prev) || document.getElementsByClassName(param.prev)[0];
            var next = document.getElementById(param.next) || document.getElementsByClassName(param.next)[0];
            var pages = Math.ceil(param.total / param.size);
            if (param.curr === 1) {
                start = 0;
            } else {
                start = (param.curr - 1) * param.size;
            }
            var data = {
                "list": param.items.slice(start, start + param.size)
            }
            var html = template(param.template_id, data);
            document.getElementById(param.container_id).innerHTML = html;


            if (pages === 1) {
                prev.style.display = "none";
                next.style.display = "none";
            } else if (param.curr === 1) {
                prev.style.display = "none";
                next.style.display = "block";
            } else if (param.curr === pages) {
                next.style.display = "none";
                prev.style.display = "block";
            } else {
                prev.style.display = "block";
                next.style.display = "block";
            }

            var nodelist = document.querySelectorAll('#' + param.container_id + ' a') || [];
            nodelist = Array.prototype.slice.call(nodelist);
            // nodelist[0].focus();
            nodelist.forEach(function(element, index) {
                if (index % param.row === param.row - 1) {
                    element.onkeydown = function(e) {
                        e = e || window.event;
                        if (e.keyCode === 39) {
                            if (param.curr < pages) {
                                param.curr++
                                    loadData();
                            }
                        }
                    }
                }
                if (index % param.row === 0) {
                    element.onkeydown = function(e) {
                        e = e || window.event;
                        if (e.keyCode === 37) {
                            if (param.curr > 1) {
                                param.curr--;
                                loadData();
                            }
                        }
                    }
                }
            });
        }
        return loadData();
    }

    root.pagination = pagination;
}.call(this))

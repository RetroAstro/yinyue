
// ajax
var $ = {
    ajax(setting) {
        var opts = {
            method: ( setting.method || "GET" ).toUpperCase(),
            url: setting.url || "",
            async: setting.async || true,
            headers: setting.headers || "",
            encType: setting.encType || "json",
            data: setting.data || "",
            dataType: setting.dataType || "json"
        }
        function params_format (obj) {
            var str = '';
            for ( var i in obj ) {
                str += i + '=' + obj[i] + '&';
            }
            return str.split('').slice(0, -1).join('');
        }
        var xhr = new XMLHttpRequest();
        return new Promise( (resolve, reject) => {
            if ( opts.method == 'GET' ) {
                xhr.open(opts.method, opts.url + "?" + params_format(opts.data), opts.async);
                xhr.send();
            } else if ( opts.method == 'POST' ) {
                xhr.open(opts.method, opts.url, opts.async);
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
                if ( opts.headers !== "" ) {
                    for ( let [key, value] of Object.entries(opts.headers) ) {
                        xhr.setRequestHeader(key, value);
                    }
                }
                opts.data = opts.encType == "json" ? JSON.stringify(opts.data) : opts.data;
                xhr.send(opts.data);
            }
            xhr.onreadystatechange = function() {
                if ( xhr.readyState == 4 && (xhr.status === 200 || xhr.status === 304) ) {
                    switch(opts.dataType) {
                        case "json":
                            var json = JSON.parse(xhr.responseText);
                            resolve(json);
                            break;
                        case "xml":
                            resolve(xhr.responseXML);
                            break;
                        default:
                            resolve(xhr.responseText);
                            break;
                    }
                }
            }
            xhr.onerror = function() {
                reject({
                    errorType: 'onerror'
                })
            }
        })
    }
}

// 函数防抖
function debounce(func, wait, immediate) {
    var timeout, result;
    return function () {
        var context = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}

// 输入转义
function htmlEncode(html) {
    var html = html.replace(/\s+/g,"");
    var sub = document.createElement('div');
    sub.textContent !== null ? sub.textContent = html : sub.innerHTML = html;
    var output = sub.innerHTML;
    sub = null;
    return output;
}

// 查找指定父元素
function findParent(ele, sle) {
    var parent= ele.parentNode;
    while ( !parent.classList.contains(sle) ) {
        parent = parent.parentNode;
    }
    return parent;
}

// Polyfill matches
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

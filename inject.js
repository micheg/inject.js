(function ()
{
    function is_function(func)
    {
        var getType = {};
        return func && getType.toString.call(func) === '[object Function]';
    }

    function load_error (err)
    {
        throw new URIError("The script " + err.target.src + " is not accessible.");
    }

    import_js = (function (doc_head)
    {
        return function (url, callback)
        {
            var tmp_script = document.createElement("script");
            tmp_script.type = "text\/javascript";
            tmp_script.onerror = load_error;
            if (callback && is_function(callback))
            {
                tmp_script.onload = callback;
            }
            doc_head.appendChild(tmp_script);
            tmp_script.src = url;
        };
    })(document.head || document.getElementsByTagName("head")[0]);

    import_css = (function (doc_head)
    {
        return function (url, callback)
        {
            var tmp_link = document.createElement('link');
            var cssId = 'cssid' + (Math.random() * 100).toString();
            tmp_link.id   = cssId;
            tmp_link.rel  = 'stylesheet';
            tmp_link.type = 'text\/css';
            tmp_link.href = url;
            tmp_link.media = 'all';
            tmp_link.onerror = load_error;
            if (callback && is_function(callback))
            {
                tmp_link.onload = callback;
            }
            doc_head.appendChild(tmp_link);
            tmp_link.src=url;
        };
    })(document.head || document.getElementsByTagName("head")[0]);

    window.import_js = import_js;
    window.import_css = import_css;
})();

var main = {


    loadList: {},
    json: null,
    hbs: null,

    init: function () {
        console.log("INIT");

        $('.navbar-nav li').on('click', this.clickHandler.bind(this))

        console.log(window.history);
        
        $(window.history).on('change', function(e){
            console.log("UPDATE");
        });





    },

    clickHandler: function (e) {
        e.preventDefault();
        var target = $(e.currentTarget).find('a').data('file');

        this.historyHandler(target);
        this.getData(target);
    },


    getData: function (target) {

        this.loadList = {};

        var jsonPath = "./data/" + target + ".json";
        var hbsPath = "./views/" + target + ".hbs";

        this.json = this.loaderFactory(jsonPath, 'json', this.loadCompleteHandler.bind(this));
        this.hbs = this.loaderFactory(hbsPath, 'html', this.loadCompleteHandler.bind(this));

    },


    loaderFactory: function (url, type, callback) {
        var retVal = null,
            request = null;

        request = $.ajax({
            url: url,
            method: "GET",
            dataType: type
        });

        request.done(function (data) {
            retVal = data;
            callback(data, type);
        });
        return retVal;
    },


    loadCompleteHandler: function (data, type) {
        var json = null, source = null, tmpl = null, html = null;

        this.loadList[type] = data;
        if (this.loadList['json'] && this.loadList['html']) {
            json = this.loadList['json'];
            source = this.loadList['html'];
            tmpl = Handlebars.compile(source);
            html = tmpl(json);

            $('.body').html(html)
        }
    },

    historyHandler: function (target) {

        history.pushState({}, '', target);

    }



};

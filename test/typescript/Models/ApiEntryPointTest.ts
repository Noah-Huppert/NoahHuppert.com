describe("Tests the ApiEntryPoint model constructor", function () {
    var goodHost: string = "http://www.foo.com";
    var goodPath: string = "/:foo/:bazz";
    var goodOptions = { "Accept": "application/json" };

    it("has good host, good path, good options", function () {
        var model: ApiEntryPoint = new ApiEntryPoint(goodHost, goodPath, goodOptions);

        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual(goodOptions);
    });

    it("has good host, good path, and options that are set to undefined", function () {
        var model: ApiEntryPoint = new ApiEntryPoint(goodHost, goodPath, undefined);

        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual({});
    });

    it("has good host, good path, and options that is left empty", function(){
        var model: ApiEntryPoint = new ApiEntryPoint(goodHost, goodPath);

        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual({});
    });

    it("has good host, good path, and options is boolean", function(){
        var model: ApiEntryPoint = new ApiEntryPoint(goodHost, goodPath, true);

        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual({});
    });

    it("has good host, good path, and options is string", function(){
        var model: ApiEntryPoint = new ApiEntryPoint(goodHost, goodPath, "");

        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual({});
    });

    it("has good host, good path, and options is number", function(){
        var model: ApiEntryPoint = new ApiEntryPoint(goodHost, goodPath, 1);

        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual({});
  });
});

describe("Tests the ApiEntryPoint.build() method", function () {
    var goodHost: string = "http://www.foo.com";
    var pathTypeHost: string = "/:foo/bazz/:bar";
    var blankHost: string = "";

    var goodPath: string = "/:foo/bazz/:bar";
    var noWildcardPath: string = "/foo/bazz/bar";
    var emptyPath: string = "";

    var goodWildcards = { "foo": "v_foo", "bar": "v_bar" };
    var built_goodWildCards = "/v_foo/bazz/v_bar";

    var nonExistantWildcards = { "noFoo": "nv_foo", "noBar": "nv_bar" };
    var emptyWildcards = {};

    it("has good host, good path, good wildcards", function () {
        var model: ApiEntryPoint = new ApiEntryPoint(goodHost, goodPath);

        expect(model.build(goodWildcards)).toEqual(goodHost + "/v_foo/bazz/v_bar");
    });

    it("has path type host, good path, good wildcards", function () {
        var model: ApiEntryPoint = new ApiEntryPoint(pathTypeHost, goodPath);

        expect(model.build(goodWildcards)).toEqual(pathTypeHost + built_goodWildCards);
    });

    it("has blank host, good path, good wildcards", function () {
        var model: ApiEntryPoint = new ApiEntryPoint(blankHost, goodPath);

        expect(model.build(goodWildcards)).toEqual(blankHost + built_goodWildCards);
    });

    it("has good host, good path, non existant wildcards", function () {
        var model: ApiEntryPoint = new ApiEntryPoint(goodHost, goodPath);

        expect(model.build(nonExistantWildcards)).toEqual(goodHost + goodPath);
    });
});



describe("Tests ApiEntryPoint.call() method", function(){
    var model: ApiEntryPoint;
    var testData: any = {
        "foo": "bazz"
    };
    var testFile: string = "testFile.json";
    var ajaxFake: any;

    beforeEach(function(){
        ajaxFake = {
            "data": {},
            "succeed": true
        };

        /*$.ajax = function(options: any): JQueryXHR{
            if(options.complete != undefined){
                if(ajaxFake.succeed){
                    options.complete({ "body": ajaxFake.data, "status": 200});
                } else{
                    options.complete({ "body": ajaxFake.data, "status": 404});
                }
            }

            return null;
        };*/

        model = new ApiEntryPoint("/test/data", "/:file");
    });

    xit("has good wildcards, good method, good options", function(done){
        /*$(document).ready(function(){
            $.get("http://stackoverflow.com/questions/ask", (data, err) => {
                if (err == "success") {
                    Log.d(data, "ApiEntryPointTest S4 T1 SUCCESS");
                    done();
                } else {
                    Log.d(data, "ApiEntryPointTest S4 T1 FAIL")
                    done();
                }
            });
        });*/

        //ajaxFake.data = testData;
        var promise: Promise = model.call({"file": testFile}, "GET") ;

        var callbacks = {
            "success": function(data){
                expect(data.body).toEqual(testData);
            },
            "fail": function(data){

            }
        };

        promise.on(Promise.STAGE_SUCCESS, callbacks.success);
        promise.on(Promise.STAGE_FAIL, callbacks.fail);
    });
});
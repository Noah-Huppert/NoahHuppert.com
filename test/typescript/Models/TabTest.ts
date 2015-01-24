describe("Tests that Tab has basic properties that ar ko.observables", function(){
    var model: Tab;

    beforeEach(function(){
        model = new Tab("id", "Id");
    });

    it("has id", function(){
        expect(model.id).toBeDefined();
        expect(typeof model.id).toEqual("function");
    });

    it("has prettyName", function(){
        expect(model.prettyName).toBeDefined();
        expect(typeof model.prettyName).toEqual("function");
    });

    it("has active", function(){
        expect(model.active).toBeDefined();
        expect(typeof model.active).toEqual("function");
    });

    it("has data", function(){
        expect(model.data).toBeDefined();
        expect(typeof model.data).toEqual("function");
    });
});

describe("Tests Tab constructor", function(){
    var goodId: string;
    var goodPrettyName: string;
    var goodActive: boolean;

    beforeEach(function(){
        goodId = "id";
        goodPrettyName = "Id";
        goodActive = false;

        spyOn(console, "log");
    });

    it("has good id, good pretty name, good active", function(){
        var model: Tab = new Tab(goodId, goodPrettyName, goodActive);

        expect(model.id()).toEqual(goodId);
        expect(model.prettyName()).toEqual(goodPrettyName);
        expect(model.active()).toEqual(goodActive);
    });

    it("has good id, good pretty name, bad active", function(){
        var model: Tab = new Tab(goodId, goodPrettyName, undefined);

        expect(model.id()).toEqual(goodId);
        expect(model.prettyName()).toEqual(goodPrettyName);
        expect(model.active()).toEqual(false);
    });

    it("has good id, bad pretty name, bad active", function(){
        var model: Tab = new Tab(goodId, undefined, undefined);

        expect(console.log).toHaveBeenCalled();

        expect(model.id()).toEqual(goodId);
        expect(model.prettyName()).toEqual(undefined);
        expect(model.active()).toEqual(false);
    });

    it("bad good id, bad pretty name, bad active", function(){
        var model: Tab = new Tab(undefined, undefined, undefined);

        expect(console.log).toHaveBeenCalled();

        expect(model.id()).toEqual(undefined);
        expect(model.prettyName()).toEqual(undefined);
        expect(model.active()).toEqual(false);
    });
});

describe("Tests Tab.loadJsonContentFromUrl()", function(){
    var model: Tab;
    var fileUrl: string;
    var fileKey: string;

    beforeEach(function(){
        model = new Tab("testTab", "Test Tab");
        fileUrl = TestConfig.testServerUrl + "/" + TestConfig.jsonTestFile;
        fileKey = "foo";
    });

    it("has good url, good key", function(done){
        var promise: Promise = model.loadJsonContentFromUrl(fileUrl, fileKey);

        var callbacks = {
            "success": function(tab){
                expect(tab.data()).toEqual("bazz");
                done();
            },
            "fail": function(tab){
                expect(true).toEqual(false);
                done();
            }
        };

        promise.on(Promise.STAGE_SUCCESS, callbacks.success);
        promise.on(Promise.STAGE_FAIL, callbacks.fail);
    });

    it("has good url, bad key", function(done){
        var promise: Promise = model.loadJsonContentFromUrl(fileUrl, "bad key");

        var callbacks = {
            "success": function(tab){
                expect(tab.data()).toBeUndefined()
                done();
            },
            "fail": function(tab){
                expect(true).toEqual(false);
                done();
            }
        };

        promise.on(Promise.STAGE_SUCCESS, callbacks.success);
        promise.on(Promise.STAGE_FAIL, callbacks.fail);
    });

    it("has good url, no key", function(done){
        var promise: Promise = model.loadJsonContentFromUrl(fileUrl);

        var callbacks = {
            "success": function(tab){
                expect(tab.data()).toEqual({
                    "foo": "bazz"
                });
                done();
            },
            "fail": function(tab){
                expect(true).toEqual(false);
                done();
            }
        };

        promise.on(Promise.STAGE_SUCCESS, callbacks.success);
        promise.on(Promise.STAGE_FAIL, callbacks.fail);
    });

    it("has bad url, good key", function(done){
        $.getJSON = function(url, callback): JQueryXHR{
            callback({}, "404");
            return undefined;
        };
        
        spyOn(console, "log");
        var promise: Promise = model.loadJsonContentFromUrl("thisFileDoesNotExist", fileKey);

        var callbacks = {
            "success": function(tab){
                expect(true).toEqual(false);
                done();
            },
            "fail": function(tab){
                expect(console.log).toHaveBeenCalled();
                done();
            }
        };
        
        promise.on(Promise.STAGE_SUCCESS, callbacks.success);
        promise.on(Promise.STAGE_FAIL, callbacks.fail);
    });
});

describe("Tests Tab.loadTextContentFromUrl()", function(){
    var model: Tab;
    var fileUrl: string;
    
    beforeEach(function(){
        model = new Tab("testTab", "Test Tab");
        fileUrl = TestConfig.testServerUrl + "/" + TestConfig.textTestFile;
    });

    it("has good url", function(done){
        var promise: Promise = model.loadTextContextFromUrl(fileUrl);

        var callbacks = {
            "success": function(tab){
                expect(tab.data()).toEqual("Foo bar bazz");
                done();
            },
            "fail": function(tab){
                expect(false).toEqual(true);
            }
        }

        promise.on(Promise.STAGE_SUCCESS, callbacks.success);
        promise.on(Promise.STAGE_FAIL, callbacks.fail);
    });

    it("has bad url", function(done){
        $.get = function(url, callback): JQueryXHR{
            callback({}, "404");
            return undefined;
        };
        
        spyOn(console, "log");
        var promise: Promise = model.loadTextContextFromUrl(TestConfig.testServerUrl + "/" + "doesNotExist");

        var callbacks = {
            "success": function(tab){
                expect(false).toEqual(true);
                done();
            },
            "fail": function(tab){
                expect(console.log).toHaveBeenCalled();
                done();
            }
        }

        promise.on(Promise.STAGE_SUCCESS, callbacks.success);
        promise.on(Promise.STAGE_FAIL, callbacks.fail);
    });
});
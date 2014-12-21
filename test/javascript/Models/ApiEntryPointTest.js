describe("Tests the ApiEntryPoint model constructor", function () {
    var goodHost = "http://www.foo.com";
    var goodPath = "/:foo/:bazz";
    var goodOptions = { "Accept": "application/json" };
    it("has good host, good path, good options", function () {
        var model = new ApiEntryPoint(goodHost, goodPath, goodOptions);
        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual(goodOptions);
    });
    it("has good host, good path, and options that are set to undefined", function () {
        var model = new ApiEntryPoint(goodHost, goodPath, undefined);
        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual({});
    });
    it("has good host, good path, and options that is left empty", function () {
        var model = new ApiEntryPoint(goodHost, goodPath);
        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual({});
    });
    it("has good host, good path, and options is boolean", function () {
        var model = new ApiEntryPoint(goodHost, goodPath, true);
        expect(model.host).toEqual(goodHost);
        expect(model.path).toEqual(goodPath);
        expect(model.options).toEqual({});
    });
});

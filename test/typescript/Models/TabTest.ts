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

describe("Tests Tab contructor", function(){
    it("has good id, good prettyName, good active", function(){

    });
});
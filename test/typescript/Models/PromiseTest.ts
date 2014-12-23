describe("Tests that the Promise has the success or fail stage names as constants", function(){
    it("has STAGE_SUCCESS", function(){
        expect(Promise.STAGE_SUCCESS).toBeDefined();
        expect(typeof Promise.STAGE_SUCCESS).toEqual("string");
    });

    it("has STAGE_FAIL", function(){
        expect(Promise.STAGE_FAIL).toBeDefined();
        expect(typeof Promise.STAGE_FAIL).toEqual("string");
    });
});

describe("Tests Promise model constructor", function(){
    it("has success or fail stages specified by param", function(){
       var model: Promise = new Promise(PromiseType.SuccessOrFail);
       var stageSuccess: PromiseStage = model.getStage(Promise.STAGE_SUCCESS);
       var stageFail: PromiseStage = model.getStage(Promise.STAGE_FAIL);

       expect(stageSuccess).toBeDefined();
       expect(stageFail).toBeDefined();
    });

    it("has success or fail stages by default", function(){
        var model: Promise = new Promise();
        var stageSuccess: PromiseStage = model.getStage(Promise.STAGE_SUCCESS);
        var stageFail: PromiseStage = model.getStage(Promise.STAGE_FAIL);

        expect(stageSuccess).toBeDefined();
        expect(stageFail).toBeDefined();
    });

    it("has a valid default success stage", function(){
        var model: Promise = new Promise(PromiseType.SuccessOrFail);
        var stageSuccess: PromiseStage = model.getStage(Promise.STAGE_SUCCESS);

        expect(stageSuccess.name).toEqual(Promise.STAGE_SUCCESS);
        expect(stageSuccess.fired).toEqual(false);
        expect(stageSuccess.data).toBeUndefined();
        expect(stageSuccess.callback).toBeUndefined();
    });

    it("has a valid default fail stage", function(){
        var model: Promise = new Promise(PromiseType.SuccessOrFail);
        var stageFail: PromiseStage = model.getStage(Promise.STAGE_FAIL);

        expect(stageFail.name).toEqual(Promise.STAGE_FAIL);
        expect(stageFail.fired).toEqual(false);
        expect(stageFail.data).toBeUndefined();
        expect(stageFail.callback).toBeUndefined();
    });

    it("has numbered stages specified by param", function(){
        var model: Promise = new Promise(PromiseType.Numbered, 3);

        expect(model.getStage("1")).toBeDefined();
        expect(model.getStage("2")).toBeDefined();
        expect(model.getStage("3")).toBeDefined();
    });

    it("has correctly named number stages by param", function(){
       var model: Promise = new Promise(PromiseType.Numbered, 3);

        for(var i: number = 1; i <= 3; i++){
            var stage: PromiseStage = model.getStage(i.toString());

            expect(stage).toBeDefined();
            expect(stage.name).toEqual(i.toString());
            expect(stage.fired).toEqual(false);
            expect(stage.data).toBeUndefined();
            expect(stage.callback).toBeUndefined();
        }
    });

    it("throws error when tpye is numbered but numbers not specified", function(){
        spyOn(console, "log");

        var model: Promise = new Promise(PromiseType.Numbered);

        expect(console.log).toHaveBeenCalled();
        expect(model.getStages().length).toEqual(0);
    });

    it("has no default stages because it is a custom promise", function(){
        var model: Promise = new Promise(PromiseType.Custom);

        expect(model.getStages().length).toEqual(0);
    });
});

describe("Tests Promise.getStage()", function(){
    it("has good name and two stages", function(){
        var model: Promise = new Promise(PromiseType.Custom);
        model.addStage("customStage1");
        model.addStage("customStage2");

        expect(model.getStage("customStage1").name).toEqual("customStage1");
        expect(model.getStage("customStage2").name).toEqual("customStage2");
    });

    it("has bad name and two stages", function(){
        var model: Promise = new Promise(PromiseType.Custom);
        model.addStage("customStage1");
        model.addStage("customStage2");

        expect(model.getStage("doesNotExist")).toBeUndefined();
    });

    it("has undefined name and two stages", function(){
        var model: Promise = new Promise(PromiseType.Custom);
        model.addStage("customStage1");
        model.addStage("customStage2");

        expect(model.getStage(undefined)).toBeUndefined();
    });

    it("has undefined name and stage with undefined name", function(){
        var model: Promise = new Promise(PromiseType.Custom);
        model.addStage("customStage1");
        model.addStage("toBeChanged");

        model.getStage("toBeChanged").name = undefined;

        expect(model.getStage(undefined)).toBeUndefined();
    });

    it("has good name and no stages", function(){
        var model: Promise = new Promise(PromiseType.Custom);

        expect(model.getStage("customStage1")).toBeUndefined();
    });
});

describe("Tests Promise.getStages()", function(){
    it("retrieves the correct amount, with two stages", function(){
        var model: Promise = new Promise(PromiseType.Custom);
        model.addStage("customStage1");
        model.addStage("customStage2");

        expect(model.getStages().length).toEqual(2);
    });

    it("retrieves the correct values, with two stages", function(){
        var model: Promise = new Promise(PromiseType.Custom);
        model.addStage("customStage1");
        model.addStage("customStage2");

        var stages: Array<PromiseStage> = model.getStages();
        expect(stages[0].name).toEqual("customStage1");
        expect(stages[1].name).toEqual("customStage2");
    });

    it("retrieves none with no stages", function(){
        var model: Promise = new Promise(PromiseType.Custom);

        expect(model.getStages().length).toEqual(0);
    });
});

describe("Tests Promise.on()", function(){
    var model: Promise;
    var callbacks: any;
    var asyncCallDelay: number = 0.1;

    beforeEach(function(){
        callbacks = {};
        callbacks.success = function(){};
        callbacks.fail = function(){};

        spyOn(callbacks, "success");
        spyOn(callbacks, "fail");

        model = new Promise();
    });

    it("has good stage, good callback", function(){
        model.on(Promise.STAGE_SUCCESS, callbacks.success);
        model.fire(Promise.STAGE_SUCCESS);

        expect(callbacks.success).toHaveBeenCalled();
    });

    it("has good stage, bad callback", function(){
        model.on(Promise.STAGE_SUCCESS, undefined);
        model.fire(Promise.STAGE_SUCCESS);

        expect(callbacks.success).not.toHaveBeenCalled();
        expect(callbacks.fail).not.toHaveBeenCalled();
    });

    it("has bad stage, good callback", function(){
        spyOn(console, "log");

        model.on("doesNotExist", callbacks.success);
        model.fire(Promise.STAGE_SUCCESS);

        expect(callbacks.success).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalled();
    });

    it("has bad stage, bad callback", function(){
        spyOn(console, "log");

        model.on("doesNotExist", undefined);
        model.fire(Promise.STAGE_SUCCESS);

        expect(callbacks.success).not.toHaveBeenCalled();
        expect(callbacks.fail).not.toHaveBeenCalled();

        expect(console.log).toHaveBeenCalled();
    });

    it("has good stage, good callback, called before set", function(){
        model.fire(Promise.STAGE_SUCCESS);
        model.on(Promise.STAGE_SUCCESS, callbacks.success);

        expect(callbacks.success).toHaveBeenCalled();
    });

    it("has good stage, bad callback, called before set", function(){
        model.fire(Promise.STAGE_SUCCESS);
        model.on(Promise.STAGE_SUCCESS, undefined);

        expect(callbacks.success).not.toHaveBeenCalled();
        expect(callbacks.fail).not.toHaveBeenCalled();
    });

    it("has bad stage, good callback, called before set", function(){
        spyOn(console, "log");

        model.fire(Promise.STAGE_SUCCESS);
        model.on("doesNotExist", callbacks.success);

        expect(callbacks.success).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalled();
    });

    it("has bad stage, bad callback, called before set", function(){
        spyOn(console, "log");

        model.fire(Promise.STAGE_SUCCESS);
        model.on("doesNotExist", undefined);

        expect(callbacks.success).not.toHaveBeenCalled();
        expect(callbacks.fail).not.toHaveBeenCalled();

        expect(console.log).toHaveBeenCalled();
    });
});

describe("Tests Promise.fire()", function(){

});
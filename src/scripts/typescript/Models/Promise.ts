class Promise {
    static STAGE_SUCCESS = "success";
    static STAGE_FAIL = "fail";

    private stages: Array<PromiseStage> = [];

    constructor(type?: PromiseType, numOfStages?: number) {
        if (type == PromiseType.SuccessOrFail) {
            this.addStage(Promise.STAGE_SUCCESS);
            this.addStage(Promise.STAGE_FAIL);
        } else if (type == PromiseType.Numbered) {
            if (numOfStages == undefined) {
                Log.e("When creating a promise with type PromiseType.Numbered the second argument must be the number of stages", "Promise.constructor");
            } else {
                for (var i: number = 1; i < numOfStages; i++) {
                    this.addStage(i.toString());
                }
            }
        }
    }

    /* Actions */
    fire(stageName: string, data?) {
        var stage: PromiseStage = this.getStage(stageName);

        if (stage != undefined) {
            stage.data = data;
            stage.fired = true;

            this.callStage(stageName);
        } else {
            Log.e("Cannot fire non existant stage \"" + stageName + "\"", "Promise.fire(\"" + stageName + "\")");
        }
    }

    callStage(stageName: string) {
        var stage: PromiseStage = this.getStage(stageName);

        if (stage != undefined) {
            if (stage.fired) {
                if (stage.callback != undefined) {
                    stage.callback(stage.data);
                }
            }
        } else {
            Log.e("Cannot call non existant stage \"" + stageName + "\"", "Promise.callStage(\"" + stageName + "\")");
        }
    }

    /* Getters */
    getStage(stageName: string): PromiseStage {
        return _.filter(this.stages, function (stage) {
            return stage.name == stageName;
        })[0];
    }

    /* Setters */
    addStage(name: string, fired?: boolean, data?, callback?: Function) {
        if (fired == undefined) {
            fired = false;
        }

        this.stages.push({
            "name": name,
            "fired": fired,
            "data": data,
            "callback": callback
        });
    }

    on(stageName: string, callback: Function) {
        var stage: PromiseStage = this.getStage(stageName);

        if (stage != undefined) {
            stage.callback = callback;

            this.callStage(stageName);
        } else {
            Log.e("Cannot set callback for not existant stage \"" + stageName + "\"", "Promise.on(\"" + stageName + "\")");
        }
    }
}
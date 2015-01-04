﻿class Promise {
    static STAGE_SUCCESS = "success";
    static STAGE_FAIL = "fail";

    private stages: Array<PromiseStage> = [];

    constructor(type?: PromiseType, numOfStages?: number) {
        if (type == PromiseType.SuccessOrFail || type == undefined) {
            this.addStage(Promise.STAGE_SUCCESS);
            this.addStage(Promise.STAGE_FAIL);
        } else if (type == PromiseType.Numbered) {
            if (numOfStages == undefined) {
                Log.e("When creating a promise with type PromiseType.Numbered the second argument must be the number of stages", "Promise.constructor");
            } else {
                for (var i: number = 1; i <= numOfStages; i++) {
                    this.addStage(i.toString());
                }
            }
        }
    }

    /* Actions */
    fire(stageName: string, data?): Promise {
        var stage: PromiseStage = this.getStage(stageName);

        if (stage != undefined) {
            stage.data = data;
            stage.fired = true;

            this.callStage(stageName);
        } else {
            Log.e("Cannot fire non existent stage \"" + stageName + "\"", "Promise.fire(\"" + stageName + "\")");
        }

        return this;
    }

    callStage(stageName: string): Promise {
        var stage: PromiseStage = this.getStage(stageName);

        if (stage != undefined) {
            if (stage.fired) {
                if (stage.callback != undefined) {
                    stage.callback(stage.data);
                }
            }
        } else {
            Log.e("Cannot call non existent stage \"" + stageName + "\"", "Promise.callStage(\"" + stageName + "\")");
        }

        return this;
    }

    /* Getters */
    getStage(stageName: string): PromiseStage {
        return _.filter(this.stages, function (stage) {
            return stage.name == stageName && stage.name != undefined;
        })[0];
    }

    getStages(): Array<PromiseStage>{
        return this.stages;
    }

    /* Setters */
    addStage(name: string, fired?: boolean, data?, callback?: Function): Promise {
        if(this.getStage(name) == undefined && name != undefined) {
            if (fired == undefined) {
                fired = false;
            }

            this.stages.push({
                "name": name,
                "fired": fired,
                "data": data,
                "callback": callback
            });
        } else if(name == undefined){
            Log.e("name cannot be undefined", "Promise.addStage");
        }

        return this;
    }

    on(stageName: string, callback: Function): Promise {
        var stage: PromiseStage = this.getStage(stageName);

        if (stage != undefined) {
            stage.callback = callback;

            this.callStage(stageName);
        } else {
            Log.e("Cannot set callback for not existent stage \"" + stageName + "\"", "Promise.on(\"" + stageName + "\")");
        }

        return this;
    }
}
class MultiPromise {
    private stages;

    constructor(numStages: number) {
        this.stages = {};

        for (var i: number = 1; i < numStages; i++) {
            this.stages[i] = {
                "statuses": {
                    "done": {
                        "fired": false,
                        "data": {},
                        "callback": undefined
                    },
                    "error": {

                    }
                }
            };
        }
    }

    
}
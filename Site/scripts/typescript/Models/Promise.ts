class Promise {
    private firedDone: boolean = false;
    private firedDoneData = {};

    private firedError: boolean = false;
    private firedErrorData = {};

    private doneCallback: Function;
    private errorCallback: Function;

    /* Firing */
    fireDone(data?) {
        this.firedDone = true;
        this.firedDoneData = data;

        if (this.doneCallback != undefined) {
            this.doneCallback(data);
        }
    }

    fireError(data?) {
        this.firedError = true;
        this.firedErrorData = data;

        if (this.errorCallback != undefined) {
            this.errorCallback(data);
        }
    }

    /* Mapping */
    onDone(doneCallback: Function) {
        this.doneCallback = doneCallback;

        if (this.firedDone) {
            this.fireDone(this.firedDoneData);
        }
    }

    onError(errorCallback: Function) {
        this.errorCallback = errorCallback;

        if (this.firedError) {
            this.fireError(this.firedErrorData);
        }
    }
}
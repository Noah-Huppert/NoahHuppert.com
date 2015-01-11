class Tab {
    id: KnockoutObservable<string> = ko.observable<string>();
    prettyName: KnockoutObservable<string> = ko.observable<string>();
    active: KnockoutObservable<boolean> = ko.observable<boolean>();
    data: KnockoutObservable<any> = ko.observable<any>();

    constructor(id: string, prettyName: string, active?: boolean) {
        if(id == undefined){
            Log.e("id can not be undefined", "Tab.constructor");
        } else {
            this.id(id);
        }

        if(prettyName == undefined) {
            Log.e("prettyName can not be undefined", "Tab.constructor");
        } else {
            this.prettyName(prettyName);
        }

        if (active != undefined) {
            this.active(active);
        } else {
            this.active(false);
        }
    }

    loadJsonContentFromUrl(url: string, key?: string): Promise {
        var promise: Promise = new Promise(PromiseType.SuccessOrFail);

        $.getJSON(url, (data, err) => {
            if (err == "success") {
                if (key) {
                    this.data(data[key]);
                    promise.fire(Promise.STAGE_SUCCESS, this);
                } else {
                    this.data(data);
                    promise.fire(Promise.STAGE_SUCCESS, this);
                }
            } else {
                Log.e("Tab-" + this.id() + ".loadJsonContentFromUrl", err);
                promise.fire(Promise.STAGE_FAIL, { "this": this, "err": err });
            }
        });

        return promise;
    }

    loadTextContextFromUrl(url: string): Promise {
        var promise: Promise = new Promise(PromiseType.SuccessOrFail);

        $.get(url, (data, err) => {
            if (err == "success") {
                this.data(data);
                promise.fire(Promise.STAGE_SUCCESS, this);
            } else {
                Log.e("Tab-" + this.id() + ".loadTextContextFromUrl", err);
                promise.fire(Promise.STAGE_FAIL, { "this": this, "err": err });
            }
        });

        return promise;
    }
}
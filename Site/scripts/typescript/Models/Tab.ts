class Tab {
    id: KnockoutObservable<string> = ko.observable<string>();
    prettyName: KnockoutObservable<string> = ko.observable<string>();
    active: KnockoutObservable<boolean> = ko.observable<boolean>();
    data: KnockoutObservable<any> = ko.observable<any>();

    constructor(id: string, prettyName: string, active?: boolean) {
        this.id(id);
        this.prettyName(prettyName);

        if (active != undefined) {
            this.active(active);
        } else {
            this.active(false);
        }
    }

    loadJsonContentFromUrl(url: string, key?: string): Promise {
        var promise: Promise = new Promise();

        $.getJSON(url, (data, err) => {
            if (err == "success") {
                if (key) {
                    this.data(data[key]);
                    promise.fireDone(this);
                } else {
                    this.data(data);
                    promise.fireDone(this);
                }
            } else {
                Log.e("Tab-" + this.id() + ".loadJsonContentFromUrl", err);
                promise.fireError({ "this": this, "err": err });
            }
        });

        return promise;
    }

    loadTextContextFromUrl(url: string): Promise {
        var promise: Promise = new Promise();

        $.get(url, (data, err) => {
            if (err == "success") {
                this.data(data);
                promise.fireDone(this);
            } else {
                Log.e("Tab-" + this.id() + ".loadTextContextFromUrl", err);
                promise.fireError({ "this": this, "err": err });
            }
        });

        return promise;
    }
}
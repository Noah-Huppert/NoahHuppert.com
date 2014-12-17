class Tab {
    id: KnockoutObservable<string> = ko.observable<string>();
    active: KnockoutObservable<boolean> = ko.observable<boolean>();
    data: KnockoutObservable<any> = ko.observable<any>();

    constructor(id: string, active?: boolean) {
        this.id(id);
        if (active) {
            this.active(active);
        }

        Log.d(this.id, "Tab.constructor");
    }

    loadContentFromUrl(url: string) {
        Log.d(this.id, "Tab.loadContentFromUrl");
        $.getJSON(url, this.fetchedJsonData);
    }

    fetchedJsonData(data, err) {
        Log.d(this.id, "Tab.fetchedJsonData");
        /*if (err == "success") {
            this.data(data);
            Log.i(this.data());
        } else {
            Log.e("Tab-" + this.id() + ".loadContentFromUrl", err);
        }*/
    }
}
class Tab {
    id: KnockoutObservable<string> = ko.observable<string>();
    active: KnockoutObservable<boolean> = ko.observable<boolean>();
    data: KnockoutObservable<any> = ko.observable<any>();

    constructor(id: string, active?: boolean) {
        this.id(id);
        if (active) {
            this.active(active);
        }
    }

    loadContentFromUrl(url: string) {
        $.getJSON(url, function fetchedJson(data, err) {
            if (err == undefined) {
                this.data = data;
            } else {
                Log.e("Tab[" + this.id() + "].loadContentFromUrl", "Can not load data from \"" + url + "\", error: " + err);
            }
        });
    }
}
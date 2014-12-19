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

    loadContentFromUrl(url: string, key?: string): void {
        $.getJSON(url, (data, err) => {
            if (err == "success") {
                if (key) {
                    this.data(data[key]);
                } else {
                    this.data(data);
                }
            } else {
                Log.e("Tab-" + this.id() + ".loadContentFromUrl", err);
            }
        });
    }
}
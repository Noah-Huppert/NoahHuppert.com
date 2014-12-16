class AppModel{
    tabs: KnockoutObservableArray<Tab> = ko.observableArray<Tab>();

    /* Actions */
    addTab(tab: Tab) {
        if (this.getTabById(tab.id()) ==  undefined){
            this.tabs().push(tab);
        }
    }

    getTabById(tabId: string): Tab {
        return _.filter(this.tabs(), function (item) {
            return item.id() === tabId;
        })[0];
    }
}
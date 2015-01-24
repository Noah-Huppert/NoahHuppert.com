class AppController{
    tabs: KnockoutObservableArray<Tab> = ko.observableArray<Tab>();

    /* Actions */
    //Tabs
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

    shouldShowTab(tabId: string): boolean {
        var tab: Tab = this.getTabById(tabId);
        return tab != undefined && tab.active();
    }

    switchTab(tabId: string) {
        if(this.getTabById(tabId) != undefined) {
            _.each(this.tabs(), function (tab) {
                if (tab.id() == tabId) {
                    tab.active(true);
                } else {
                    tab.active(false);
                }
            });
        }
    }
}
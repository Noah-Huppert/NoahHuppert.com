class Project {
    name: KnockoutObservable<string> = ko.observable<string>();
    body: KnockoutObservable<string> = ko.observable<string>();
    github: KnockoutObservable<string> = ko.observable<string>();

    constructor(name: string, body: string, github: string) {
        this.name(name);
        this.body(body);
        this.github(github);
    }

    static fromObject(obj: any): Project {
        return new Project(obj.name, obj.body, obj.github);
    }
}
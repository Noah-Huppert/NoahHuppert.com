﻿class Project {
    name: KnockoutObservable<string> = ko.observable<string>();
    body: KnockoutObservable<string> = ko.observable<string>();
    github: KnockoutObservable<string> = ko.observable<string>();

    constructor(name: string, body: string, github: string) {
        this.name(name);
        this.body(body);
        this.github(github);
    }

    static fromObject(obj: any): Project {
        var validObj: boolean = true;

        if(obj.name == undefined){
            Log.e("Object must contain property \"name\"", "Project.fromObject");
            validObj = false;
        }

        if(obj.body == undefined){
            Log.e("Object must contain property \"body\"", "Project.fromObject");
            validObj = false;
        }
        if(obj.github == undefined){
            Log.e("Object must contain property \"github\"", "Project.fromObject");
            validObj = false;
        }

        if(validObj) {
            return new Project(obj.name, obj.body, obj.github);
        }
    }

    getGithubUsername(): string {
        var githubParts = this.github().split("/");
        return githubParts[0];
    }

    getGithubRepo(): string {
        var githubParts = this.github().split("/");
        if(githubParts.length >= 2){
            return githubParts[1];
        } else{
            return "";
        }
    }

    getGithubOther(): string {
        var githubParts = this.github().split("/");
        githubParts.splice(0, 2);

        return githubParts.join("/");
    }

    getGithubUrl(): string {
        return "https://github.com/" + this.github();
    }
}
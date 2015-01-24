describe("Tests Project model constructor", function () {
    it("saves constructor args properly", function () {
        var model: Project = new Project("name", "body", "github");

        expect(model.name()).toEqual("name");
        expect(model.body()).toEqual("body");
        expect(model.github()).toEqual("github");
    });
});

describe("Tests that Project has the correct ko.observables", function(){
    var model: Project;

    beforeEach(function(){
        model = new Project("name", "body", "github");
    });

    it("has ko name", function(){
        expect(typeof model.name).toEqual("function");
        expect(model.name()).toEqual("name");

        model.name("newName");
        expect(model.name()).toEqual("newName");
    });

    it("has ko body", function(){
        expect(typeof model.body).toEqual("function");
        expect(model.body()).toEqual("body");

        model.body("newBody");
        expect(model.body()).toEqual("newBody");
    });

    it("has ko github", function(){
        expect(typeof model.github).toEqual("function");
        expect(model.github()).toEqual("github");

        model.github("newGithub");
        expect(model.github()).toEqual("newGithub");
    });
});

describe("Tests Project.getGithubUsername()", function(){
    it("has valid github", function(){
        var model: Project = new Project("name", "body", "user/project");

        expect(model.getGithubUsername()).toEqual("user");
    });

    it("has empty user", function(){
        var model: Project = new Project("name", "body", "/project");

        expect(model.getGithubUsername()).toEqual("");
    });

    it("has empty project", function(){
        var model: Project = new Project("name", "body", "user/");

        expect(model.getGithubUsername()).toEqual("user");
    });

    it("has empty user and project", function(){
        var model: Project = new Project("name", "body", "/");

        expect(model.getGithubUsername()).toEqual("");
    });

    it("has empty github", function(){
        var model: Project = new Project("name", "body", "");

        expect(model.getGithubUsername()).toEqual("");
    });
});

describe("Tests Project.getGithubRepo()", function(){
    it("has valid github", function(){
        var model: Project = new Project("name", "body", "user/project");

        expect(model.getGithubRepo()).toEqual("project");
    });

    it("has empty user", function(){
        var model: Project = new Project("name", "body", "/project");

        expect(model.getGithubRepo()).toEqual("project");
    });

    it("has empty project", function(){
        var model: Project = new Project("name", "body", "user/");

        expect(model.getGithubRepo()).toEqual("");
    });

    it("has empty user and project", function(){
        var model: Project = new Project("name", "body", "/");

        expect(model.getGithubRepo()).toEqual("");
    });

    it("has empty github", function(){
        var model: Project = new Project("name", "body", "");

        expect(model.getGithubRepo()).toEqual("");
    });
});

describe("Tests Project.getGithubOther()", function(){
    it("has valid github", function(){
        var model: Project = new Project("name", "body", "user/project/other1/other2");

        expect(model.getGithubOther()).toEqual("other1/other2");
    });

    it("has empty user", function(){
        var model: Project = new Project("name", "body", "/project/other1/other2");

        expect(model.getGithubOther()).toEqual("other1/other2");
    });

    it("has empty project", function(){
        var model: Project = new Project("name", "body", "user//other1/other2");

        expect(model.getGithubOther()).toEqual("other1/other2");
    });

    it("has empty user and project", function(){
        var model: Project = new Project("name", "body", "//other1/other2");

        expect(model.getGithubOther()).toEqual("other1/other2");
    });

    it("has empty github", function(){
        var model: Project = new Project("name", "body", "");

        expect(model.getGithubOther()).toEqual("");
    });

    it("has empty other", function(){
        var model: Project = new Project("name", "body", "user/project");

        expect(model.getGithubOther()).toEqual("");
    });

    it("has empty user and empty other", function(){
        var model: Project = new Project("name", "body", "/project");

        expect(model.getGithubOther()).toEqual("");
    });

    it("has empty project and empty other", function(){
        var model: Project = new Project("name", "body", "user/");

        expect(model.getGithubOther()).toEqual("");
    });

    it("has empty user, empty user and empty other", function(){
        var model: Project = new Project("name", "body", "//");

        expect(model.getGithubOther()).toEqual("");
    });
});

describe("Test Project.getGithubUrl()", function(){
    it("has valid github", function(){
        var model: Project = new Project("name", "body", "user/project");

        expect(model.getGithubUrl()).toEqual("https://github.com/user/project");
    });

    it("has an empty github", function(){
       var model: Project = new Project("name", "body", "");

        expect(model.getGithubUrl()).toEqual("https://github.com/");
    });
});

describe("Tests creating Project from object", function(){
    beforeEach(function(){
        spyOn(console, "log");
    });

    it("has good name, good body, good github", function(){
        var model: Project = Project.fromObject({ "name": "name", "body": "body", "github": "github"});

        expect(model).toBeDefined();
        expect(model.name()).toEqual("name");
        expect(model.body()).toEqual("body");
        expect(model.github()).toEqual("github");
    });

    it("has no name, good body, good github", function(){
        var model: Project = Project.fromObject({ "body": "body", "github": "github" });

        expect(model).toBeUndefined();
        expect(console.log).toHaveBeenCalled();
    });

    it("has good name, no body, good github", function(){
        var model: Project = Project.fromObject({ "name": "name", "github": "github" });

        expect(model).toBeUndefined();
        expect(console.log).toHaveBeenCalled();
    });

    it("has good name, good body, no github", function(){
        var model: Project = Project.fromObject({ "name": "name", "body": "body" });

        expect(model).toBeUndefined();
        expect(console.log).toHaveBeenCalled();
    });
});
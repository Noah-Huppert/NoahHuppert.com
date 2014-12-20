class GithubController {
    URL_ROOT: string = "https://api.github.com";
    OPTIONS = {
        "Accept": "application/vnd.github.v3+json"
    };

    entryPoints = {
        "repos": {
            "get": new ApiEntryPoint(this.URL_ROOT, "/repos/:owner/:repo", this.OPTIONS)
        }
    };
}
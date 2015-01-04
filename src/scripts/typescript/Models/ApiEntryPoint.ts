class ApiEntryPoint {
    host: string;
    path: string;
    options;

    constructor(host: string, path: string, options?) {
        this.host = host;
        this.path = path;

        if (options != undefined && typeof options == "object") {
            this.options = options;
        } else {
            this.options = {};
        }
    }

    build(wildcards) {
        var replacedPath: string = this.path;

        _.each(wildcards, (value, key: string) => {
            var pathParts: Array<string> = replacedPath.split(":" + key);
            replacedPath = pathParts.join(value);
        });

        return this.host + replacedPath;
    }

    call(wildcards, method: string, options?): Promise {
        var promise: Promise = new Promise(PromiseType.SuccessOrFail);

        if(options == undefined){
            options = {};
        }

        _.each(this.options, (key:any, value) => {
            options[key] = value;
        });

        if (options.url == undefined) {
            options.url = this.build(wildcards);
        }

        if(method == undefined){
            Log.e("method cannot be undefined", "ApiEntryPoint.call()");
        }

        if (options.type == undefined) {
            options.type = method;
        }

        options.complete = (data) => {
            if (data.status == 200) {
                promise.fire(Promise.STAGE_SUCCESS, data);
                Log.d("CALLED SUCCESS", "ApiEntryPoint.call()");
            } else {
                promise.fire(Promise.STAGE_FAIL, data);
                Log.d("CALLED FAIL", "ApiEntryPoint.call()");
            }
        }

        $.ajax(options);

        Log.d("RETURNING", "ApiEntryPoint.call()");
        return promise;
    }
}

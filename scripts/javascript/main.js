var LogHelper = (function () {
    function LogHelper() {
        this.INFO_TAG = "INFO";
        this.DEBUG_TAG = "DEBUG";
        this.ERROR_TAG = "ERROR";
        this.mutedTags = [];
    }
    LogHelper.prototype.write = function (data, tag, location) {
        if (this.mutedTags.indexOf(tag) == -1 && this.mutedTags.indexOf("*") == -1) {
            var tagSuffix = location ? " " : " - ";
            if (tag) {
                tag = "[" + tag + "]" + tagSuffix;
            }
            else {
                tag = tagSuffix;
            }
            if (location) {
                location += " - ";
            }
            else {
                location = "";
            }
            console.log(tag + location + data);
        }
    };
    LogHelper.prototype.mute = function (tag) {
        if (tag && this.mutedTags.indexOf(tag) == -1) {
            this.mutedTags.push(tag);
        }
        else if (!tag) {
            this.mutedTags = ["*"];
        }
    };
    LogHelper.prototype.unmute = function (tag) {
        if (tag) {
            this.mutedTags = _.without(this.mutedTags, tag);
        }
        else {
            this.mutedTags = [];
        }
    };
    LogHelper.prototype.i = function (data, location) {
        this.write(data, this.INFO_TAG, location);
    };
    LogHelper.prototype.d = function (data, location) {
        this.write(data, this.DEBUG_TAG, location);
    };
    LogHelper.prototype.e = function (data, location) {
        this.write(data, this.ERROR_TAG, location);
    };
    return LogHelper;
})();
var Log = new LogHelper();
$(document).ready(function () {
    Log.i("Cool!", "main.ts");
    Log.i("Cool");
});
//# sourceMappingURL=main.js.map
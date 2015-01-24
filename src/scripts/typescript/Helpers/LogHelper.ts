module Log {
    export var INFO_TAG: string = "INFO";
    export var DEBUG_TAG: string = "DEBUG";
    export var ERROR_TAG: string = "ERROR";

    var mutedTags: string[] = [];

    export function write(data, tag?: string, location?: string) {
        if (mutedTags.indexOf(tag) == -1 && mutedTags.indexOf("*") == -1) {
            var tagSuffix: string = location != undefined ? " " : " - ";
            if (tag != undefined) {
                tag = "[" + tag + "]" + tagSuffix;
            } else if(location == undefined) {
                tag = "";
            } else {
                tag = "";
            }

            if (location != undefined) {
                location += " - ";
            } else {
                location = "";
            }

            console.log(tag, location, data);
        }
    }

    export function mute(tag?: string) {
        if (tag != undefined && mutedTags.indexOf(tag) == -1) {
            mutedTags.push(tag);
        } else if (tag == undefined) {
            mutedTags = ["*"];
        }
    }

    export function unmute(tag?: string) {
        if (tag != undefined && mutedTags.indexOf("*") == -1) {
            mutedTags = _.without(mutedTags, tag);
        } else if(tag != undefined) {
            mutedTags = [INFO_TAG, DEBUG_TAG, ERROR_TAG];
            mutedTags = _.without(mutedTags, tag);
        } else {
            mutedTags = [];
        }
    }

    /* Tags */
    export function i(data, location?: string) {
        Log.write(data, INFO_TAG, location);
    }

    export function d(data, location?: string) {
        Log.write(data, DEBUG_TAG, location);
    }

    export function e(data, location?: string) {
        Log.write(data, ERROR_TAG, location);
    }
}
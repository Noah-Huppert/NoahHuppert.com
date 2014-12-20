module Log {
    var INFO_TAG: string = "INFO";
    var DEBUG_TAG: string = "DEBUG";
    var ERROR_TAG: string = "ERROR";

    var mutedTags: string[] = [];

    export function write(data, tag?: string, location?: string) {
        if (mutedTags.indexOf(tag) == -1 && mutedTags.indexOf("*") == -1) {
            var tagSuffix: string = location ? " " : " - ";
            if (tag) {
                tag = "[" + tag + "]" + tagSuffix;
            } else {
                tag = tagSuffix;
            }

            if (location) {
                location += " - ";
            } else {
                location = "";
            }

            console.log(tag, location, data);
        }
    }

    export function mute(tag?: string) {
        if (tag && mutedTags.indexOf(tag) == -1) {
            mutedTags.push(tag);
        } else if (!tag) {
            mutedTags = ["*"];
        }
    }

    export function unmute(tag?: string) {
        if (tag) {
            mutedTags = _.without(mutedTags, tag);
        } else {
            mutedTags = [];
        }
    }

    /* Tags */
    export function i(data, location?: string) {
        write(data, INFO_TAG, location);
    }

    export function d(data, location?: string) {
        write(data, DEBUG_TAG, location);
    }

    export function e(data, location?: string) {
        write(data, ERROR_TAG, location);
    }
}
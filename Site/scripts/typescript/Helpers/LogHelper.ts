class LogHelper {
    INFO_TAG: string = "INFO";
    DEBUG_TAG: string = "DEBUG";
    ERROR_TAG: string = "ERROR";

    mutedTags: string[] = [];

    write(data, tag?: string, location?: string) {
        if (this.mutedTags.indexOf(tag) == -1 && this.mutedTags.indexOf("*") == -1) {
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

            console.log(tag + location + data);
        }
    }

    mute(tag?: string) {
        if (tag && this.mutedTags.indexOf(tag) == -1) {
            this.mutedTags.push(tag);
        } else if (!tag) {
            this.mutedTags = ["*"];
        }
    }

    unmute(tag?: string) {
        if (tag) {
            this.mutedTags = _.without(this.mutedTags, tag);
        } else {
            this.mutedTags = [];
        }
    }

    /* Tags */
    i(data, location?: string) {
        this.write(data, this.INFO_TAG, location);
    }

    d(data, location?: string) {
        this.write(data, this.DEBUG_TAG, location);
    }

    e(data, location?: string) {
        this.write(data, this.ERROR_TAG, location);
    }
}
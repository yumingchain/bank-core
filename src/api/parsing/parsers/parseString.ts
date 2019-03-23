import { failedParseObject } from "../helpers/failedParseObject";
import { successfulParse } from "../helpers/successfulParse";
import { ParseFunc } from "../ParseFunc";

export const parseString: ParseFunc<string> = (value: any, key?: string) => {
    if (value === null || value === undefined) {
        return failedParseObject(key);
    }

    if (typeof value !== "string") {
        return failedParseObject(key);
    }

    return successfulParse(value);
};

export const parseOptionalString: ParseFunc<string | undefined> = (value: any, key?: string) => {
    if (value === null || value === undefined) {
        return successfulParse(undefined);
    }

    return parseString(value, key);
};

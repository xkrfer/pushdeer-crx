import {request} from "@/helpers/request";

export function getAppid() {
    return request("", {
        method: "get"
    })
}

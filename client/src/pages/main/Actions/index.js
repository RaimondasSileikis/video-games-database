import { GET_DATA_FROM_SERVER, SORT_CLIENT_HEIGHT_ASC, SORT_CLIENT_HEIGHT_DESC, SORT_CLIENT_NAME_ASC, SORT_CLIENT_NAME_DESC } from "../Constants";

export function getDataFromServer(serverData) {
    return {
        type: GET_DATA_FROM_SERVER,
        payload: serverData
    }
}

export function sortClientNameAsc() {
    return {
        type: SORT_CLIENT_NAME_ASC
    }
}

export function sortClientNameDesc() {
    return {
        type: SORT_CLIENT_NAME_DESC
    }
}

export function sortClientHeightAsc() {
    return {
        type: SORT_CLIENT_HEIGHT_ASC
    }
}

export function sortClientHeightDesc() {
    return {
        type: SORT_CLIENT_HEIGHT_DESC
    }
}
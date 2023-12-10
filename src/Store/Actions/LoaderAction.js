
export const LoaderActionTypes = {
    SET_LOADER: "SET_LOADER"
}

export const showLoaderAction = () => {
    return {
        type: LoaderActionTypes.SET_LOADER,
        payload: true
    }
}

export const hideLoaderAction = () => {
    return {
        type: LoaderActionTypes.SET_LOADER,
        payload: false
    }
}


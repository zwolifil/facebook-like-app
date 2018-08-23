export const images = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES_SUCCESS':
            return action.images;
        default:
            return state
    }
};
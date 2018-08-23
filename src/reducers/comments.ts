export const comments = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMMENTS_SUCCESS':
            return action.comments;
        default:
            return state
    }
};
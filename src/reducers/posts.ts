export const posts = (state = [], action) => {
    switch (action.type) {
        case 'SET_POSTS_SUCCESS':
            return action.posts;
        default:
            return state
    }
};

export const hashedPosts = (state = [], action) => {
    switch (action.type) {
        case 'SET_HASHED_POSTS_SUCCESS':
            return action.hashedPosts;
        default:
            return state
    }
};
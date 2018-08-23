export const profiles = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILES_SUCCESS':
            return action.profiles;
        default:
            return state
    }
};

export const myProfile = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MY_PROFILE_SUCCESS':
            return action.profile;
        default:
            return state
    }
}
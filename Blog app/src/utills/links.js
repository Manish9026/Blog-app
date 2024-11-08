export const singleFrndLink="/single-friend/friends"
export const profileLink="/user/profile/about";

export const urlCreater=({path,params}={})=>{

    const queryParams = new URLSearchParams(params);
    return `${path}?${queryParams.toString()}`;

}


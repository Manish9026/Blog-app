export const urlCreater=({path,params}={})=>{

    const queryParams = new URLSearchParams(params);
    return `${path}?${queryParams.toString()}`;

}
console.log(urlCreater({path:singleFrndLink,params:{uid:"dgfhdh"}}));
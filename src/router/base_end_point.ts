export default () :string => {
    if(import.meta.env.VITE_IS_DEV_MODE === "No"){
        var url : string = import.meta.env.VITE_BASE_PROD_URL;
        return url
    }else{
        var url : string = import.meta.env.VITE_BASE_DEV_URL;
        return url
    }
}
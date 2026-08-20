export const GlobalConstants={
    API_METHODS:{
        LOGIN:"Login",
        GETALLUSERS:"staff",
        CREATE_USER:"staff",
        UPDATEUSER:"staff/",
        DELETEUSER:"DeleteUser",
        GETUSERBYID:"GetUserById",
        
    },
    REG_EXP:{
        EMAIL:'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
        PAN_CARD:'[A-Z]{5}[0-9]{4}[A-Z]{1}'
    },
    VALIDAION_MESSAGE:{
        EMAIL_REQUIRED:'Email is required',
        EMAIL_INVALID:'Email is invalid',
        PASSWORD_REQUIRED:'Password is required',
        PASSWORD_MIN_LENGTH:'Password must be at least 6 characters long',
        PASSWORD_MAX_LENGTH:'Password must be at most 20 characters long',
        PASSWORD_MISMATCH:'Passwords do not match',
        
    }
}
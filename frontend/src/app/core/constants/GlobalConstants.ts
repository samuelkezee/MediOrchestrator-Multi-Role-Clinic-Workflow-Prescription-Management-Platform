export const GlobalConstants={
    API_METHODS:{
        LOGIN:"Login",
        GETALLUSERS:"staff",
        CREATE_USER:"staff",
        UPDATEUSER:"staff/",
        DELETEUSER:"DeleteUser",
        GETUSERBYID:"GetUserById",
        FILTER_USER:"staff?roleName=",
        GET_PATIENT:"patients",
        GET_PATIENT_BY_ID:"patients/",
        GETALLMEDICINE:"Medicines",
        CREATE_MEDICINE:"Medicines",
        UPDATE_MEDICINE:"Medicines",
        DELETE_MEDICINE:"Medicines/",
        GET_MEDICINE_BY_ID:"Medicines/",
        GET_VISIT:"visits",
        VISIT_BY_PATIENT:"visits/patient/",
        CREATE_VISIT:"visits",
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
        
    },
    LOGGED_USER_SESSION_NAME:"hospitalUser",
    TOKEN_SESSION_NAME:"token",
    MEDICINE_FORM_LIST:[
        "Tablet",
        "Capsule",
        "Syrup",
        "Injection",
        "Ointment",
    
    ],
    ROLE:{
        DOCTOR:"Doctor",
        ADMIN:"Admin",
        RECEPTIONIST:"Receptionist"

        
    }
    
}
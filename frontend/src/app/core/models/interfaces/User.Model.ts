export interface UserResponseModel {
    id: number;
    fullName: string;
    email: string;
    mobileNo: string;
    roleId: number;
    roleName: string;
    isActive: boolean;
    token?: string;
    projectName?: string;
}


export interface LoginAPIResponseModel {
    token: string;
    expiresOn: string;
    user: UserResponseModel;
}


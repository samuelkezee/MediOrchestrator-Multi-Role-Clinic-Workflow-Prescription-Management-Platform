export interface LoginAPIResponseModel {
    id: number;
    fullName: string;
    email: string;
    mobileNo: string;
    roleId: number;
    roleName: string;
    isActive: boolean;
    token?: string;
}


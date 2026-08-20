export class LoginModel {
    projectName: string;
    email: string;
    password: string;

    constructor() {
        this.projectName = ""
        this.email = ""
        this.password = ""
    }
}
export class userModel {
    fullName: string;
    email: string;
    password?: string;
    mobileNo: string;
    roleName: String;
    isActive: boolean;


    constructor() {
        this.fullName = ""
        this.email = ""
        this.password = ""
        this.mobileNo = ""
        this.roleName = ""
        this.isActive = false;
    }
}
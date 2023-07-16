export class User {
    id!: number;
    email!: string;
    name!: string;
    phone!: string;
    google_token: any;
    is_staff!: boolean;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.phone = user.phone;
        this.google_token = user.google_token;
        this.is_staff = user.is_staff;
    }
}
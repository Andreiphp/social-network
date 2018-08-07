export interface RegistrationUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    day: string;
    month: string;
    year: string;
    country: string;
}

export interface CheckUser {
    login: string;
    password: string;
}
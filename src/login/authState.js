//lowkey stealing this bc it's a good idea

export class AuthState {
    static Authenticated = new AuthState("authenticated");
    static Unauthenticated = new AuthState("unauthenticated");

    constructor(name) {
        this.name = name;
    }
}
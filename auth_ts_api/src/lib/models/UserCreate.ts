
export default class UserCreate {
    public constructor(
        public email: string,
        public hashedPassword: string,
        public claims: string[],
    ) {}
}

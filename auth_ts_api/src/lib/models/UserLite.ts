
export default class UserLite {
    public constructor(
        public userId: string,
        public email: string,
        public claims: string[],
    ) {}
}

export interface Secret {
    name: string;
    static_version: {
        value: string | object;
    };
}

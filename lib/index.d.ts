export declare class SoWeSign {
    private token;
    private temporaryToken;
    private lastTokenDate;
    private baseUrl;
    private toIgnoreStudents;
    private students;
    private trainers;
    private thirds;
    /**
     * @description Inits the SoWeSign class with the token and baseUrl
     * @param token Token to use to get the temporary token
     * @param baseUrl Base url of the SoWeSign api
     */
    initialize(token: string, baseUrl?: string): Promise<this>;
    tokenValidityCheck(date1: Date, date2: Date): Promise<void>;
    getTemporaryToken(): Promise<void>;
    getAccessToken(): {
        token: string | undefined;
        baseUrl: string;
    };
}
export declare const wait: (ms: number) => Promise<unknown>;

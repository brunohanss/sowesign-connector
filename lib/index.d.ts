export declare class SoWeSign {
    private token;
    private temporaryToken;
    private baseUrl;
    private toIgnoreStudents;
    constructor(token: string, temporaryToken: string);
    getTemporaryToken(): Promise<void>;
    getAllStudents(): Promise<string | SoWeSignStudent[] | undefined>;
}
export declare const wait: (ms: number) => Promise<unknown>;
interface SoWeSignStudent {
    reference: string;
    gender: 'm' | 'f';
    lastName: string;
    firstName: string;
    birthDate: string;
    email: string;
    mobilePhone: string;
    phone: string;
    start: string;
    end: string;
    data: {
        data1: string;
        data2: string;
        data3: string;
        data4: string;
        data5: string;
        data6: string;
        data7: string;
        data8: string;
        dataJson: any;
        region: string;
        erp: any;
        bi: any;
        cfa: any;
    };
    address: {
        addressLine1: any;
        addressLine2: any;
        addressLine3: any;
        addressLine4: any;
        zipcode: any;
        city: any;
        state: any;
        country: any;
    };
    employer: any;
    thirds: [];
    financers: [];
    opcaNumber: any;
    regionNumber: any;
    unemployedNumber: any;
    fileNumber: string;
    biNumber: any;
    cfaNumber: any;
    training: string;
    degree: string;
    corporate: any;
    ssoUid: any;
    requiredSignature: boolean;
    typeRegion: any;
    weeklyEnterprise: any;
    nationalIdentity: any;
}
export {};

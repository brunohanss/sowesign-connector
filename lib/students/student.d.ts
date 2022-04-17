import { SoWeSign } from '..';
export declare class Student {
    private main;
    constructor(main: SoWeSign);
    getAll(include?: 'reference' | 'gender' | 'lastName' | 'firstName' | 'birthDate' | 'email' | 'mobilePhone' | 'phone' | 'adress' | 'opcaNumber' | 'regionNumber' | 'unemployedNumber' | 'fileNumber' | 'photo' | 'employer' | 'start' | 'end' | 'data' | 'thirds' | 'financers'[]): Promise<SoWeSignStudent[] | {
        isError: boolean;
        message: string;
        details: any;
    }> | {
        isError: boolean;
        message: string;
        details: string;
    };
    counter(from: Date | string, to: Date | string, reference: string): Promise<Counter | {
        isError: boolean;
        message: string;
        details: any;
    }> | {
        isError: boolean;
        message: string;
        details: string;
    };
    updateOrCreate(student: SoWeSignStudent): Promise<{
        isError: boolean;
        message: string;
        details: any;
    }> | {
        isError: boolean;
        message: string;
        details: string;
    };
    delete(reference: string): Promise<{
        isError: boolean;
        message: string;
        details: any;
    }> | {
        isError: boolean;
        message: string;
        details: string;
    };
}
export interface SoWeSignStudent {
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
    weeklyEnterprise?: any;
    nationalIdentity: any;
}
interface Counter {
    summary: {
        training: {
            presents: number;
            absents: number;
            justified: number;
            lateness: number;
            earlyDeparture: number;
            timefixPresents: number;
            timefixAbsents: number;
        };
        enterprise: {
            presents: number;
            absents: number;
            justified: number;
            lateness: number;
            earlyDeparture: number;
            timefixPresents: number;
            timefixAbsents: number;
        };
    };
    counters: {
        training: {
            presents: number;
            absents: number;
            justified: number;
            lateness: number;
            earlyDeparture: number;
            timefixPresents: number;
            timefixAbsents: number;
        };
        enterprise: {
            presents: number;
            absents: number;
            justified: number;
            lateness: number;
            earlyDeparture: number;
            timefixPresents: number;
            timefixAbsents: number;
        };
    };
}
export {};

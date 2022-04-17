import { SoWeSign } from '..';
export declare class Trainer {
    private main;
    constructor(main: SoWeSign);
    getAll(include?: 'reference' | 'gender' | 'lastName' | 'firstName' | 'birthDate' | 'email' | 'mobilePhone' | 'phone' | 'adress' | 'opcaNumber' | 'regionNumber' | 'unemployedNumber' | 'fileNumber' | 'photo' | 'employer' | 'start' | 'end' | 'data' | 'thirds' | 'financers'[]): Promise<SoWeSignTrainer[] | {
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
interface SoWeSignTrainer {
    reference: string;
    gender: string;
    lastName: string;
    firstName: string;
    birthDate: string;
    email: string;
    mobilePhone: string;
    phone: string;
    address: {
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
        addressLine4: string;
        zipcode: string;
        city: string;
        state: string;
        country: string;
    };
    photo: string;
    employer: string;
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
        erp: string;
        bi: string;
        cfa: string;
        region: string;
    };
}
export {};

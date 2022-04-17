import { SoWeSign } from '..';
export declare class Third {
    private main;
    constructor(main: SoWeSign);
    getAll(include?: 'reference' | 'gender' | 'lastName' | 'firstName' | 'birthDate' | 'email' | 'mobilePhone' | 'phone' | 'adress' | 'opcaNumber' | 'regionNumber' | 'unemployedNumber' | 'fileNumber' | 'photo' | 'employer' | 'start' | 'end' | 'data' | 'thirds' | 'financers'[]): "Wrong credential" | Promise<SoWeSignThird[] | {
        isError: boolean;
        message: string;
        details: any;
    }>;
    updateOrCreate(third: SoWeSignThird): "Wrong credential" | Promise<SoWeSignThird | {
        isError: boolean;
        message: string;
        details: any;
    }>;
    delete(reference: string): "Wrong credential" | Promise<{
        isError: boolean;
        message: string;
        details: any;
    }>;
}
interface SoWeSignThird {
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
    type: string;
}
export {};

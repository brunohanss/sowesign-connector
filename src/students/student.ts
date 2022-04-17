import axios, { AxiosError, AxiosResponse } from 'axios';
import { SoWeSign } from '..';

export class Student {
  private main: SoWeSign;
  constructor(main: SoWeSign) {
    this.main = main;
  }

  getAll(
    include?:
      | 'reference'
      | 'gender'
      | 'lastName'
      | 'firstName'
      | 'birthDate'
      | 'email'
      | 'mobilePhone'
      | 'phone'
      | 'adress'
      | 'opcaNumber'
      | 'regionNumber'
      | 'unemployedNumber'
      | 'fileNumber'
      | 'photo'
      | 'employer'
      | 'start'
      | 'end'
      | 'data'
      | 'thirds'
      | 'financers'[],
  ) {
    const credentials = this.main.getAccessToken();
    if (!credentials.baseUrl || !credentials.token) {
      return { isError: true, message: 'Error finding students', details: 'Invalid token' };
    }
    return all(credentials.baseUrl, credentials.token, include);
  }
  counter(from: Date | string, to: Date | string, reference: string) {
    const credentials = this.main.getAccessToken();
    if (!credentials.baseUrl || !credentials.token) {
      return { isError: true, message: 'Error finding counter', details: 'Invalid token' };
    }
    return counter(credentials.baseUrl, credentials.token, from, to, reference);
  }
  updateOrCreate(student: SoWeSignStudent) {
    const credentials = this.main.getAccessToken();
    if (!credentials.baseUrl || !credentials.token) {
      return { isError: true, message: 'Student was not edited nor created', details: 'Invalid token' };
    }
    return updateOrCreate(credentials.baseUrl, credentials.token, student);
  }
  delete(reference: string) {
    const credentials = this.main.getAccessToken();
    if (!credentials.baseUrl || !credentials.token) {
      return { isError: true, message: 'Student was not deleted', details: 'Invalid token' };
    }
    return deleteStudent(credentials.baseUrl, credentials.token, reference);
  }
}
const all = async (
  baseUrl: string,
  temporaryToken: string,
  include?:
    | 'reference'
    | 'gender'
    | 'lastName'
    | 'firstName'
    | 'birthDate'
    | 'email'
    | 'mobilePhone'
    | 'phone'
    | 'adress'
    | 'opcaNumber'
    | 'regionNumber'
    | 'unemployedNumber'
    | 'fileNumber'
    | 'photo'
    | 'employer'
    | 'start'
    | 'end'
    | 'data'
    | 'thirds'
    | 'financers'[],
) => {
  try {
    const studentsResponse: AxiosResponse = await axios.get(
      !include ? `${baseUrl}/connectors/students` : `${baseUrl}/connectors/students?include=${include}`,
      {
        headers: { Authorization: temporaryToken },
      },
    );

    return studentsResponse.data as SoWeSignStudent[];
  } catch (error) {
    return {
      isError: true,
      message: 'Could not get students',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};

const counter = async (
  baseUrl: string,
  temporaryToken: string,
  from: Date | string,
  to: Date | string,
  reference: string,
) => {
  try {
    const fromDate = typeof (from as any).getMonth === 'function' ? (from as Date) : new Date(from);
    const toDate = typeof (to as any).getMonth === 'function' ? (to as Date) : new Date(to);

    const response: AxiosResponse = await axios.get(
      `${baseUrl}/connectors/students/${reference}/counters?from=${fromDate.getFullYear()}/${fromDate.getMonth()}/${fromDate.getUTCDate()}&to=${toDate.getFullYear()}/${toDate.getMonth()}/${toDate.getUTCDate()}`,
      {
        headers: { Authorization: temporaryToken },
      },
    );

    return response.data as Counter;
  } catch (error) {
    return {
      isError: true,
      message: 'Could not get student counter',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};

const updateOrCreate = async (baseUrl: string, temporaryToken: string, newStudent: SoWeSignStudent) => {
  try {
    const response: AxiosResponse = await axios.post(`${baseUrl}/connectors/students`, newStudent, {
      headers: { Authorization: temporaryToken },
    });
    let student: SoWeSignStudent;
    student = response.data as SoWeSignStudent;
    return { isError: false, message: 'Student was edited or created', details: response.status };
  } catch (error) {
    return {
      isError: true,
      message: 'Could not edit or create student',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};
const deleteStudent = async (baseUrl: string, temporaryToken: string, reference: string) => {
  try {
    const response: AxiosResponse = await axios.delete(`${baseUrl}/connectors/students?reference=${reference}`, {
      headers: { Authorization: temporaryToken },
    });

    return { isError: false, message: 'Student was delete', details: response.status };
  } catch (error) {
    return {
      isError: true,
      message: 'Could not delete student',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};

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

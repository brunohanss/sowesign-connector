import axios, { AxiosResponse } from 'axios';
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
      return 'Wrong credential';
    }
    return all(credentials.baseUrl, credentials.token, include);
  }
}
export const all = async (
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
  const studentsResponse: AxiosResponse = await axios.get(
    !include ? `${baseUrl}/connectors/students` : `${baseUrl}/connectors/students?include=${include}`,
    {
      headers: { Authorization: temporaryToken },
    },
  );
  let students: SoWeSignStudent[] = [];
  if (studentsResponse.data) {
    students = studentsResponse.data as SoWeSignStudent[];
    return students;
  } else {
    return { isError: true, message: 'Could not get students', details: studentsResponse.status };
  }
};

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

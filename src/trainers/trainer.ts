import axios, { AxiosError, AxiosResponse } from 'axios';
import { SoWeSign } from '..';

export class Trainer {
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
      return { isError: true, message: 'Trainer was not deleted', details: 'Invalid token' };
    }
    return all(credentials.baseUrl, credentials.token, include);
  }
  // updateOrCreate(student: SoWeSignTrainer) {
  //   const credentials = this.main.getAccessToken();
  //   if (!credentials.baseUrl || !credentials.token) {
  //     return { isError: true, message: 'Trainer was not created or edited', details: 'Invalid token' };
  //   }
  //   return updateOrCreate(credentials.baseUrl, credentials.token, student);
  // }
  delete(reference: string) {
    const credentials = this.main.getAccessToken();
    if (!credentials.baseUrl || !credentials.token) {
      return { isError: true, message: 'Trainer was not deleted', details: 'Invalid token' };
    }
    return deleteTrainer(credentials.baseUrl, credentials.token, reference);
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
      !include ? `${baseUrl}/connectors/trainers` : `${baseUrl}/connectors/trainers?include=${include}`,
      {
        headers: { Authorization: temporaryToken },
      },
    );
    let students: SoWeSignTrainer[] = [];
    students = studentsResponse.data as SoWeSignTrainer[];
    return students;
  } catch (error) {
    return {
      isError: true,
      message: 'Could not get trainers',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};

// const updateOrCreate = async (baseUrl: string, temporaryToken: string, rainer: SoWeSignTrainer) => {
//   try {
//     const response: AxiosResponse = await axios.post(`${baseUrl}/connectors/trainers`, {
//       headers: { Authorization: temporaryToken },
//     });
//     let student: SoWeSignTrainer;
//     student = response.data as SoWeSignTrainer;
//     return student;
//   } catch (error) {
//     return {
//       isError: true,
//       message: 'Could not edit or create trainer',
//       details:
//         (error as AxiosError).response?.data.messages.errors &&
//         (error as AxiosError).response?.data.messages.errors.body
//           ? (error as AxiosError).response?.data.messages.errors.body.toString()
//           : error,
//     };
//   }
// };

const deleteTrainer = async (baseUrl: string, temporaryToken: string, reference: string) => {
  try {
    const response: AxiosResponse = await axios.delete(`${baseUrl}/connectors/trainers?reference=${reference}`, {
      headers: { Authorization: temporaryToken },
    });
    return { isError: false, message: 'Trainer was delete', details: response.status };
  } catch (error) {
    return {
      isError: true,
      message: 'Could not delete trainer',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};

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

import axios, { AxiosError, AxiosResponse } from 'axios';
import { SoWeSign } from '..';

export class Third {
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
  updateOrCreate(third: SoWeSignThird) {
    const credentials = this.main.getAccessToken();
    if (!credentials.baseUrl || !credentials.token) {
      return 'Wrong credential';
    }
    return updateOrCreate(credentials.baseUrl, credentials.token, third);
  }
  delete(reference: string) {
    const credentials = this.main.getAccessToken();
    if (!credentials.baseUrl || !credentials.token) {
      return 'Wrong credential';
    }
    return deleteThird(credentials.baseUrl, credentials.token, reference);
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
    const thirdsResponse: AxiosResponse = await axios.get(
      !include ? `${baseUrl}/connectors/trainers` : `${baseUrl}/connectors/thirds?include=${include}`,
      {
        headers: { Authorization: temporaryToken },
      },
    );
    let thirds: SoWeSignThird[] = [];

    thirds = thirdsResponse.data as SoWeSignThird[];
    return thirds;
  } catch (error) {
    return {
      isError: true,
      message: 'Could not get thirds',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};

const updateOrCreate = async (baseUrl: string, temporaryToken: string, third: SoWeSignThird) => {
  try {
    const response: AxiosResponse = await axios.post(`${baseUrl}/connectors/thirds`, third, {
      headers: { Authorization: temporaryToken },
    });
    let thirds: SoWeSignThird;
    thirds = response.data as SoWeSignThird;
    return thirds;
  } catch (error) {
    return {
      isError: true,
      message: 'Could not edit or create third',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};
const deleteThird = async (baseUrl: string, temporaryToken: string, reference: string) => {
  try {
    const response: AxiosResponse = await axios.delete(`${baseUrl}/connectors/thirds?reference=${reference}`, {
      headers: { Authorization: temporaryToken },
    });

    return { isError: false, message: 'Third was delete', details: response.status };
  } catch (error) {
    return {
      isError: true,
      message: 'Could not delete third',
      details: (error as AxiosError).response?.data.messages.errors.body
        ? (error as AxiosError).response?.data.messages.errors.body.toString()
        : error,
    };
  }
};

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

import axios, { AxiosError, AxiosResponse } from 'axios';
import { all, Student } from './students/student';

export class SoWeSign {
  private token: string;
  private temporaryToken: string | undefined;
  private baseUrl: string = 'https://app.sowesign.com/api';
  private toIgnoreStudents: string[] = [];
  private students = new Student(this);

  constructor(token: string, temporaryToken: string) {
    this.token = token;
  }

  async getTemporaryToken() {
    const tempToken: {
      token: string;
      type: 'Bearer';
    } = (
      await axios.post(
        `${this.baseUrl}/portal/authentication/token`,
        {},
        { headers: { Authorization: `${this.token}` } },
      )
    ).data;
    if (tempToken && tempToken.token && tempToken.type) {
      this.temporaryToken = `${tempToken.type} ${tempToken.token}`;
      // console.log('Got token', this.temporaryToken);
    } else {
      // console.log('Could not get token');
      // console.log(tempToken);
    }
  }
  getAccessToken() {
    return { token: this.temporaryToken, baseUrl: this.baseUrl };
  }

  async getAllStudents() {
    try {
      if (!this.temporaryToken) {
        return 'Invalid temporary token';
      }

      let response: AxiosResponse = await axios.get(`${this.baseUrl}/connectors/students`, {
        headers: { Authorization: this.temporaryToken },
      });
      let students: SoWeSignStudent[] = [];
      if (response.data) {
        students = response.data as SoWeSignStudent[];
        return students;
      } else {
        await this.getTemporaryToken();
        await wait(1000 * 5);
        response = await axios.get(`${this.baseUrl}/connectors/students`, {
          headers: { Authorization: this.temporaryToken },
        });
        students = [];
        if (response.data) {
          students = response.data as SoWeSignStudent[];
          return students.filter((student) => !this.toIgnoreStudents.includes(student.reference));
        }
      }
    } catch (error: any) {
      // console.log(error);
      return `Error getting students: ${error}`;
    }
  }
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
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

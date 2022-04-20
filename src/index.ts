import axios, { AxiosError, AxiosResponse } from 'axios';
import { SoWeSignStudent, Student } from './students/student';
import { Third } from './thirds/thirds';
import { Trainer } from './trainers/trainer';

export class SoWeSign {
  private token: string | undefined;
  private temporaryToken: string | undefined;
  private lastTokenDate: Date | undefined;
  private baseUrl: string = 'https://app.sowesign.com/api';
  private toIgnoreStudents: string[] = [];
  public students = new Student(this);
  public trainers = new Trainer(this);
  public thirds = new Third(this);

  /**
   * @description Inits the SoWeSign class with the token and baseUrl
   * @param token Token to use to get the temporary token. Example : https://app.sowesign.com/api
   * @param baseUrl Base url of the SoWeSign api. Example : API TOOOOOOOOKKKKKKKKKENNNNNNNNNNNNNN
   */
  async initialize(token: string, baseUrl?: string) {
    this.token = token;
    this.baseUrl = baseUrl || this.baseUrl;
    await this.getTemporaryToken();
    this.lastTokenDate = new Date();

    return this;
  }
  async tokenValidityCheck(date1: Date, date2: Date) {
    if (Math.abs(date1.getTime() - date2.getTime()) / 36e5 > 22) {
      await this.getTemporaryToken();
    }
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
    this.tokenValidityCheck(new Date(), this.lastTokenDate || new Date());
    return { token: this.temporaryToken, baseUrl: this.baseUrl };
  }
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// interface SoWeSignStudent {
//   reference: string;
//   gender: 'm' | 'f';
//   lastName: string;
//   firstName: string;
//   birthDate: string;
//   email: string;
//   mobilePhone: string;
//   phone: string;
//   start: string;
//   end: string;
//   data: {
//     data1: string;
//     data2: string;
//     data3: string;
//     data4: string;
//     data5: string;
//     data6: string;
//     data7: string;
//     data8: string;
//     dataJson: any;
//     region: string;
//     erp: any;
//     bi: any;
//     cfa: any;
//   };
//   address: {
//     addressLine1: any;
//     addressLine2: any;
//     addressLine3: any;
//     addressLine4: any;
//     zipcode: any;
//     city: any;
//     state: any;
//     country: any;
//   };
//   employer: any;
//   thirds: [];
//   financers: [];
//   opcaNumber: any;
//   regionNumber: any;
//   unemployedNumber: any;
//   fileNumber: string;
//   biNumber: any;
//   cfaNumber: any;
//   training: string;
//   degree: string;
//   corporate: any;
//   ssoUid: any;
//   requiredSignature: boolean;
//   typeRegion: any;
//   weeklyEnterprise: any;
//   nationalIdentity: any;
// }

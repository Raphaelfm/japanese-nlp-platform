import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Wellcome to the tranlations API. To use this application, please access the link: https://japanese-nlp-platform.vercel.app/';
  }
}

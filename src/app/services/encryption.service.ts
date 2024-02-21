import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  key: string = 'Key029:N9n/xQLWrUOSXcbPCp/Dvw==';
  appProperties = {
    VALUES: {
      KEY: 'Key030:CXEApDV4g7zhaqEoK4VYMg==',
      IV: 'MTIzNDU2Nzg='
    }
  };

  constructor() { }

  encryptionAES (data: any) {
    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(data, 'Je s8 vraiment CONTENT!', this.appProperties);
    return ciphertext.toString();
  }

  decryptionAES (msg: any) {
    // Decrypt
    const bytes  = CryptoJS.AES.decrypt(msg, 'Je s8 vraiment CONTENT!', this.appProperties);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }
}

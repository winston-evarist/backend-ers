let KeyString: any =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export function Encrypt(input: any): string {
  input = JSON.stringify(input);
  let output: string[] = [];
  let chr1: any,
    chr2: any,
    chr3: any = "";
  let enc1: any,
    enc2: any,
    enc3: any,
    enc4: any = "";
  let i: number = 0;

  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output.push(
      KeyString.charAt(enc1) +
        KeyString.charAt(enc2) +
        KeyString.charAt(enc3) +
        KeyString.charAt(enc4)
    );
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return output.join("");
}

export function Decrypt( payload : any) {
  let output: any = "";
  let chr1: any,
    chr2: any,
    chr3: any = "";
  let enc1: any,
    enc2: any,
    enc3: any,
    enc4: any = "";
  let i: number = 0;

  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  // eslint-disable-next-line
  let base64test: any = /[^A-Za-z0-9\+\/\=]/g;
  if (base64test.exec(payload)) {
    window.alert(
      "There were invalid taprotec decoder characters in the input text.\n" +
        "Valid taprotec decoder characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
        "Expect errors in decoding."
    );
  }
  // eslint-disable-next-line
  payload = payload.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  do {
    enc1 = KeyString.indexOf(payload.charAt(i++));
    enc2 = KeyString.indexOf(payload.charAt(i++));
    enc3 = KeyString.indexOf(payload.charAt(i++));
    enc4 = KeyString.indexOf(payload.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    // eslint-disable-next-line
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    // eslint-disable-next-line
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }

    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < payload.length);

  return JSON.parse(output);
}

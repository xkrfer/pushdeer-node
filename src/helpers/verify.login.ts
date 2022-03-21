import { AppleLoginDto } from '../dto/user.dto';
import verifyAppleIdToken from 'verify-apple-id-token';

export async function verifyAppleToken(idToken: AppleLoginDto['idToken']) {
  const jwtClaims = await verifyAppleIdToken({
    idToken: idToken,
    clientId: '',
    nonce: 'nonce', // optional
  });
  console.log('jwtClaims', jwtClaims);
}

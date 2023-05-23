export class TokenData {
 constructor(
   public sub: string,
   public roles: string[],
   public iat: number,
   public exp: number) {
 }
}

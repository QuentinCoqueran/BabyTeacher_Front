export class ResponseUser {
  response: {
    response: boolean,
    type: string,
    firstConnection: boolean,
    role: string,
    token: string,
    userId: number
  } | undefined;
}

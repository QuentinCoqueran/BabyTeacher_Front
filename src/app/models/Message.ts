export class Message {
  id: number | undefined;
  idSender: number;
  idReceiver: number;
  content: string;
  sendAt: string;
  readAt: string | undefined;

  constructor(id: number | undefined, idSender: number, idReceiver: number, content: string, sendAt: string, readAt: string | undefined) {
    this.id = id;
    this.idSender = idSender;
    this.idReceiver = idReceiver;
    this.content = content;
    this.sendAt = sendAt;
    this.readAt = readAt;
  }
}

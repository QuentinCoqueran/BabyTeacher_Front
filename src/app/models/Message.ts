export class Message {
  id: number;
  idSender: number;
  idReceiver: number;
  content: string;
  sendAt: string;
  readAt: string;

  constructor(id: number, idSender: number, idReceiver: number, content: string, sendAt: string, readAt: string) {
    this.id = id;
    this.idSender = idSender;
    this.idReceiver = idReceiver;
    this.content = content;
    this.sendAt = sendAt;
    this.readAt = readAt;
  }
}

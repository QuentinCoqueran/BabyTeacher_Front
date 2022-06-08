export class Comment {
  id: number;
  idProfile: number;
  idUserComment: number;
  date: string;
  content: string;
  note: number;

  constructor(id: number, idProfile: number, idUserComment: number, date: string, content: string, note: number) {
    this.id = id;
    this.idProfile = idProfile;
    this.idUserComment = idUserComment;
    this.date = date;
    this.content = content;
    this.note = note;
  }
}

export class Skill {
  id: number;
  idUser: number;
  idCategorie: number;
  name: string;
  description: string;

  constructor(id: number, idUser: number, idCategorie: number, name: string, description: string){
    this.id = id;
    this.idUser = idUser;
    this.idCategorie = idCategorie;
    this.name = name;
    this.description = description;
  }
}

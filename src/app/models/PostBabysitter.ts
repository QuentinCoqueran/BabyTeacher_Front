export class PostBabysitter {
  id: number;
  idUser: number;
  city: string;
  activityZone: string;
  hourlyWage: number;
  description: string;

  constructor(id: number, idUser: number, city: string, activityZone: string, hourlyWage: number, description: string) {
    this.id = id;
    this.idUser = idUser;
    this.city = city;
    this.activityZone = activityZone;
    this.hourlyWage = hourlyWage;
    this.description = description;
  }
}

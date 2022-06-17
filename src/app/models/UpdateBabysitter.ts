export class UpdateBabysitter {
  id: number;
  arraySkill: [{
    category: string;
    skill: string;
  }] | undefined;
  description: string | undefined;
  photo: string | ArrayBuffer | null;
}

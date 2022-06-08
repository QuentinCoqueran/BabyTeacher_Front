export class Contract {
  id: number;
  idParent: number;
  idBabysitter: number;
  validateAt: string;
  numberOfHours: number;
  hourlyWage: number;
  qrCode: string | undefined;
  numberOfSitting: number;
  numberOfAttendance: number;
  startDate: string;
  endDate: string;

  constructor(id: number, idParent: number, idBabysitter: number, validateAt: string, numberOfHours: number, hourlyWage: number, qrCode: string | undefined, numberOfSitting: number, numberOfAttendance: number, startDate: string, endDate: string) {
    this.id = id;
  this.idParent = idParent;
  this.idBabysitter = idBabysitter;
  this.validateAt = validateAt;
  this.numberOfHours = numberOfHours;
  this.hourlyWage = hourlyWage;
  this.qrCode = qrCode;
  this.numberOfSitting = numberOfSitting;
  this.numberOfAttendance = numberOfAttendance;
  this.startDate = startDate;
  this.endDate = endDate;
  }
}

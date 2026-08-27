export interface IVisitModel{
    
    visitId: number,
    patientId: number,
    patientName: string,
    patientPhone: string,
    patientGender: string,
    patientDateOfBirth: string,
    patientAddress: string,
    patientCreatedDate: string,
    doctorId: number,
    doctorName: string,
    doctorEmail: string,
    doctorMobileNo: string,
    doctorPassword: string,
    doctorRoleId: number,
    doctorRoleName: string,
    doctorProjectName: string,
    doctorIsActive: boolean,
    doctorCreatedOn: string,
    visitDate: string,
    symptoms: string,
    diagnosis: string,
    visitStatus: string,
    prescriptionItems: [
      {
        prescriptionItemId: number,
        visitId: number,
        medicineId: number,
        medicineName: string,
        medicineStrength: string,
        medicineForm: string,
        dosage: string,
        frequency: string,
        durationDays: number,
        instructions: string
      }
    ]
  }

export interface IVisitListModel{
  visitId: number
  patientId: number
  patientName: string
  patientPhone: string
  patientGender: string
  patientDateOfBirth: string
  patientAddress: string
  patientCreatedDate: string
  doctorId: number
  doctorName: string
  doctorEmail: string
  doctorMobileNo: string
  doctorPassword: string
  doctorRoleId: number
  doctorRoleName: string
  doctorProjectName: string
  doctorIsActive: boolean
  doctorCreatedOn: string
  visitDate: string
  symptoms: string
  diagnosis: string
  visitStatus: string
  prescriptionItems: PrescriptionItem[]
}

export interface PrescriptionItem {
  prescriptionItemId: number
  visitId: number
  medicineId: number
  medicineName: string
  medicineStrength: string
  medicineForm: string
  dosage: string
  frequency: string
  durationDays: number
  instructions: string
}

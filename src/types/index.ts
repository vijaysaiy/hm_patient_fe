// redux state type

import { Dispatch, SetStateAction } from "react";

export interface UserState {
  user: User | null;
}

export interface IWeekday {
  id: string;
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
}
export interface IAppointmentState {
  weekdays: IWeekday[] | null;
}

// app types
export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  isMobileNumberVerified: boolean;
  phoneNumber: string;
  isd_code: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  profilePictureUrl: string | undefined;
  bloodGroup: string;
  address: {
    houseNumber: string;
    colony: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}
export interface Doctor {
  id: string;
  name: string;
  profilePictureUrl: string;
  speciality: string;
  isd_code: string;
  phoneNumber: string;
  address: string;
}

export interface IAppointmentForm {
  doctorId: string;
  doctorSlotId: string;
  hospitalId: string;
  remarks: string;
  decease: string;
  appointmentDate: string;
  documents?: Record<string, string>[];
}

export interface IloginForm {
  userName: string;
  password: string;
}
export interface ISlot {
  id: string;
  startTime: string;
  hospitalId: string;
}
export interface ISlots {
  Morning?: ISlot[];
  Afternoon?: ISlot[];
  Evening?: ISlot[];
}
export interface ITimeSlot {
  isSlotAvailable: boolean;
  slots: ISlots;
}

export interface IAppointmentResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  doctorSlotId: string;
  doctorId: string;
  patientId: string;
  hospitalId: string;
  remarks: string;
  doctorRemarks: string | null;
  decease: string;
  appointmentStatus:
    | "SCHEDULED"
    | "PENDING"
    | "COMPLETED"
    | "CANCELED"
    | "APPROVED";
  appointmentDate: string;
  doctor: Doctor;
  doctorSlots: {
    id: string;
    doctorId: string;
    createdAt: string;
    updatedAt: string;
    slotId: string;
    weekDaysId: string;
    slotLimit: number;
    isEnabled: boolean;
    isActive: boolean;
    isDeleted: boolean;
    slot: {
      id: string;
      startTime: string;
      endTime: string;
      createdAt: string;
      updatedAt: string;
      hospitalId: string;
    };
  };
  patientAppointmentDocs?: Record<string, string>[];
}

export interface IMedicationResponse {
  prescriptionId: string;
  appointmentId: string;
  hospitalId: string;
  patientId: string;
  medicationName: string;
  medicationDosage: string;
  foodRelation: string;
  prescriptionDate: string;
  prescriptionDayId: string;
  prescriptionTimeOfDayId: string;
  isPrescriptionTakenForTheDay: boolean;
  prescriptionTimeOfDay: string;
  isPrescriptionTaken: boolean;
}

export interface ITodaysMedicationsResponse {
  isPriscriptionAvailableForTheDay: boolean;
  morningPrescription: IMedicationResponse[];
  afterNoonPrescription: IMedicationResponse[];
  eveningPrescription: IMedicationResponse[];
  nightPrescription: IMedicationResponse[];
}

export interface MedicationsProps {
  medicationDate: Date | undefined;
  setMedicationDate: Dispatch<SetStateAction<Date | undefined>>;
  loadingMedications: boolean;
  medications: { [key: string]: IMedicationResponse[] };
}

export interface IUpdatePrescriptionTakenPayload {
  prescriptionDayId: string;
  prescriptionTimeOfDayId: string;
  isPrescriptionTaken: boolean;
}

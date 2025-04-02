export enum UserType {
  COMMON = "common",
  MERCHANT = "merchant",
}

export interface User {
  id: number;
  fullName: string;
  cpf: string; // Para simplificar, usaremos apenas CPF (sem CNPJ)
  email: string;
  password: string; // Em produção, seria criptografada
  balance: number;
  type: UserType;
}

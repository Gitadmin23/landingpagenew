export interface ILogin {
  username: string,
  password: string
}

export interface IRegister {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  dob: string,
  email: string,
  phone: string,
  confirmPassword: string,
}

export interface ILoginUser { 
  firstName: string,
  lastName: string,
  username: string,
  phone: string,
}
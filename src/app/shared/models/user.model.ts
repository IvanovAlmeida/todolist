export interface User {
  id: string
  name: string
  email: string
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UserLogin {
  email: string;
  password: string;
}


export interface AuthResponse {
  accessToken: string
  expiresIn: number
  user: User
}


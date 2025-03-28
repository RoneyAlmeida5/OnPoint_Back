export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  companyId?: number;
}

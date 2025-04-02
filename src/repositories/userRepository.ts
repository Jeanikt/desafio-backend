import { User, UserType } from "../models/user";

export class UserRepository {
  private users: User[] = [
    {
      id: 1,
      fullName: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      password: "123",
      balance: 500,
      type: UserType.COMMON,
    },
    {
      id: 2,
      fullName: "Loja XPTO",
      cpf: "987.654.321-00",
      email: "loja@xpto.com",
      password: "456",
      balance: 1000,
      type: UserType.MERCHANT,
    },
  ];

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async updateBalance(id: number, newBalance: number): Promise<void> {
    const user = this.users.find((user) => user.id === id);
    if (user) user.balance = newBalance;
  }
}

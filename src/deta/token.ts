import type DetaClass from "deta/dist/types/deta";
import type BaseClass from "deta/dist/types/base";

type BaseToken = {
  userId: string;
  accessToken: string;
  expires: Date;
};

type CreateProps = {
  userId: string;
  accessToken: string;
  options?: {
    expireAt?: Date | number;
    exprireIn?: number;
  };
};

export class TokenRepository {
  private readonly db: BaseClass;

  constructor(deta: DetaClass) {
    this.db = deta.Base("Token");
  }

  async create(data: CreateProps): Promise<void> {
    const { userId, options, accessToken } = data;
    const token = await this.db.put({ accessToken }, userId, options);
    if (!token) {
      throw new Error("Token not created");
    }
  }

  async get(userId: string): Promise<BaseToken | null> {
    const token = await this.db.get(userId);
    if (!token) {
      return null;
    }
    return {
      userId,
      accessToken: token.accessToken as string,
      expires: new Date(token.__expires as number),
    };
  }
}

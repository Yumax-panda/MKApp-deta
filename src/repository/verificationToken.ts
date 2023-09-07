import type DetaClass from "deta/dist/types/deta";
import type BaseClass from "deta/dist/types/base";

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export class VerificationTokenRepository {
  private readonly db: BaseClass;

  constructor(deta: DetaClass) {
    this.db = deta.Base("VerificationToken");
  }

  async create(payload: VerificationToken): Promise<VerificationToken> {
    const { identifier, token, expires } = payload;
    const data = await this.db.put({ token }, identifier, {
      expireAt: expires,
    });

    if (!data) throw new Error("Verification token not created");

    return VerificationTokenRepository.parse(data);
  }

  async use(identifier: string): Promise<VerificationToken | null> {
    const data = await this.db.get(identifier);
    if (!data) {
      return null;
    }
    return VerificationTokenRepository.parse(data);
  }

  static parse(data: any) {
    return {
      identifier: data.identifier as string,
      token: data.token as string,
      expires: new Date(data.__expires as number),
    };
  }
}

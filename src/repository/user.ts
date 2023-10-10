import type DetaClass from "deta/dist/types/deta";
import type BaseClass from "deta/dist/types/base";

export interface BaseUser {
  key: string;
  discordId?: string | null;
  name?: string | null;
  image?: string | null;
  email: string;
  refreshToken?: string | null;
  emailVerified: Date | null;
}

export type DiscordUser = BaseUser & {
  name: string;
  image: string;
  discordId: string;
};

export type UpdateProps = Omit<Partial<BaseUser>, "key">;

export class UserRepository {
  private readonly db: BaseClass;

  constructor(deta: DetaClass) {
    this.db = deta.Base("User");
  }

  async create(data: Omit<BaseUser, "key">): Promise<BaseUser> {
    const { emailVerified, ...rest } = data;
    const payload: any = rest;
    if (emailVerified) {
      payload.emailVerified = emailVerified.toISOString();
    }

    const user = await this.db.put(payload);
    if (!user) {
      throw new Error("User not created");
    }
    return UserRepository.parse(user);
  }

  async get(key: string): Promise<BaseUser | null> {
    const user = await this.db.get(key);
    if (!user) {
      return null;
    }
    return UserRepository.parse(user);
  }

  async getByDiscordId(discordId: string): Promise<DiscordUser | null> {
    const { items: users } = await this.db.fetch({ discordId });
    console.log("getByDiscordId called", users);
    if (users.length) {
      return users[0] as unknown as DiscordUser;
    }
    return null;
  }

  async getByEmail(email: string): Promise<BaseUser | null> {
    const { items: users } = await this.db.fetch({ email });
    if (users.length) {
      return users[0] as unknown as BaseUser;
    }
    return null;
  }

  async update(key: string, updates: UpdateProps): Promise<BaseUser | null> {
    const { emailVerified, ...rest } = updates;
    const payload: any = rest;
    if (emailVerified) {
      payload.emailVerified = emailVerified.toISOString();
    }
    await this.db.update(payload, key);
    const user = await this.get(key);
    if (!user) {
      console.log("User not found on update called");
      return null;
    }
    return UserRepository.parse(user);
  }

  static parse(data: any): BaseUser {
    return {
      key: data.key as string,
      discordId: data?.discordId || null,
      name: data?.name || null,
      image: data?.image || null,
      email: data.email,
      refreshToken: data?.refreshToken || null,
      emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
    };
  }
}

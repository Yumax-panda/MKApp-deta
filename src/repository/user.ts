import type DetaClass from "deta/dist/types/deta";
import type BaseClass from "deta/dist/types/base";

export interface BaseUser {
  key: string;
  discordId?: string | null;
  name?: string | null;
  image?: string | null;
  email: string;
  refreshToken?: string | null;
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
    const user = await this.db.put(data);
    if (!user) {
      throw new Error("User not created");
    }
    return {
      key: String(user.key) || "",
      ...data,
    };
  }

  async get(key: string): Promise<BaseUser | null> {
    const user = await this.db.get(key);
    if (!user) {
      return null;
    }
    return user as unknown as BaseUser;
  }

  async getByDiscordId(discordId: string): Promise<DiscordUser | null> {
    const { items: users } = await this.db.fetch({ discordId });
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
    await this.db.update(updates, key);
    return await this.get(key);
  }
}

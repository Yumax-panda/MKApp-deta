import type DetaClass from "deta/dist/types/deta";
import type BaseClass from "deta/dist/types/base";

export interface Session {
  expires: Date;
  sessionToken: string;
  userId: string;
}

export class SessionRepository {
  private readonly db: BaseClass;

  constructor(deta: DetaClass) {
    this.db = deta.Base("Session");
  }

  async create(data: Session): Promise<Session> {
    const { sessionToken, userId, expires } = data;
    const session = await this.db.put({ userId }, sessionToken, {
      expireAt: expires,
    });
    if (!session) {
      throw new Error("Session not created");
    }
    return {
      sessionToken: session.sessionToken as string,
      userId: session.userId as string,
      expires: new Date(session.__expires as number),
    };
  }

  async get(sessionToken: string): Promise<Session | null> {
    const data = await this.db.get(sessionToken);
    if (!data) {
      return null;
    }
    return {
      sessionToken: data.sessionToken as string,
      userId: data.userId as string,
      expires: new Date(data.__expires as number),
    };
  }

  async update(
    session: Partial<Session> & Pick<Session, "sessionToken">,
  ): Promise<Session> {
    const { sessionToken, userId, expires } = session;
    const updated = await this.db.put({ userId }, sessionToken, {
      expireAt: expires,
    });
    if (!updated) {
      throw new Error("Session not updated");
    }
    return {
      sessionToken: updated.sessionToken as string,
      userId: updated.userId as string,
      expires: new Date(updated.__expires as number),
    };
  }

  async delete(sessionToken: string): Promise<void> {
    await this.db.delete(sessionToken);
  }
}

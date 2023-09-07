import type { DetaClientType } from "@/repository/deta";
import type { Adapter } from "next-auth/adapters";
import type { UpdateProps as UserUpdate } from "@/repository/user";

export function DetaAdapter(d: DetaClientType, options = {}): Adapter {
  return {
    async createUser(user) {
      console.log("createUser called", user);
      const createdUser = await d.user.create(user);
      if (!createdUser) {
        throw new Error("User not created on createUser called");
      }
      const { key, ...rest } = createdUser;
      return { id: key, ...rest };
    },
    async getUser(id) {
      console.log("getUser called", id);
      const user = await d.user.get(id);
      if (!user) {
        console.log("User not found on getUser called");
        return null;
      }
      const { key, ...rest } = user;
      return { id: key, ...rest };
    },
    async getUserByEmail(email) {
      console.log("getUserByEmail called", email);
      const user = await d.user.getByEmail(email);
      if (!user) {
        console.log("User not found on getUserByEmail called");
        return null;
      }
      const { key, ...rest } = user;
      return { id: key, ...rest };
    },
    async getUserByAccount(providerAccountId) {
      console.log("getUserByAccount called", providerAccountId);
      const user = await d.user.getByDiscordId(
        providerAccountId.providerAccountId,
      );
      if (!user) {
        console.log("User not found on getUserByAccount called");
        return null;
      }
      const { key, ...rest } = user;
      return { id: key, ...rest };
    },
    async linkAccount(account) {
      console.log("linkAccount called", account);
      const user = await d.user.get(account.userId);

      if (!user) {
        console.log("User not found on linkAccount called");
        return null;
      }

      let updates: UserUpdate = { discordId: account.providerAccountId };
      const { access_token, refresh_token, expires_at } = account;

      if (refresh_token) {
        updates = { ...updates, refreshToken: refresh_token };
      }

      await Promise.all([
        d.user.update(user.key, updates),
        d.token.create({
          userId: user.key,
          accessToken: access_token,
          options: { expireAt: expires_at },
        }),
      ]);
      return account;
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log("createSession called", sessionToken, userId, expires);
      const session = await d.session.create({
        sessionToken,
        userId,
        expires,
      });
      return session;
    },
    async getSessionAndUser(sessionToken) {
      console.log("getSessionAndUser called", sessionToken);
      const session = await d.session.get(sessionToken);
      if (!session) {
        console.log("Session not found on getSessionAndUser called");
        return null;
      }
      const user = await d.user.get(session.userId);
      if (!user) {
        console.log("User not found on getSessionAndUser called");
        return null;
      }
      const { key, ...rest } = user;
      return {
        session: {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: session.expires,
        },
        user: { id: key, ...rest },
      };
    },
    async updateSession(session) {
      console.log("updateSession called", session);
      return await d.session.update(session);
    },
    async deleteSession(sessionToken) {
      console.log("deleteSession called", sessionToken);
      return await d.session.delete(sessionToken);
    },
    async updateUser(user) {
      console.log("updateUser called", user);
      const { id, emailVerified, ...updates } = user;
      const newUser = await d.user.update(id, updates);
      if (!newUser) {
        throw new Error("User not updated on updateUser called");
      }
      const { key, ...rest } = newUser;
      return { id: key, ...rest };
    },
    async createVerificationToken(verificationToken) {
      console.log("createVerificationToken called", verificationToken);
      return await d.verificationToken.create(verificationToken);
    },
    async useVerificationToken({ identifier, token }) {
      console.log("useVerificationToken called", identifier, token);
      return await d.verificationToken.use(identifier);
    },
  };
}

import type DetaClass from "deta/dist/types/deta";
import type BaseClass from "deta/dist/types/base";

export class SessionRepository {
  private readonly db: BaseClass;

  constructor(deta: DetaClass) {
    this.db = deta.Base("Session");
  }
}

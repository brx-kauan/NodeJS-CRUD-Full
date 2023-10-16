import path from "path";
import fs from "fs";

export class UtilsFileUser {
  private static _userPath = ["assets", "files"];

  private static _validadeFolder(userId: string) {
    return fs.existsSync(path.resolve(...this._userPath, userId));
  }

  public static createUserFolder(userId: string) {
    if (!this._validadeFolder(userId)) {
      fs.mkdirSync(path.resolve(...this._userPath, userId), {
        recursive: true,
      });
    }
  }
  public static deleteUserFolder(userId: string) {
    if (this._validadeFolder(userId)) {
      fs.rmSync(path.resolve(...this._userPath, userId), {
        recursive: true,
        force: true,
      });
    }
  }
}

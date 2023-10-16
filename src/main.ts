import express from "express";
import { router } from "router";
class Main {
  private _server;
  constructor() {
    this._server = express();
    this.middleware();
    this._router();
  }
  private middleware() {
    this._server.use(express.json());
  }
  private _router() {
    this._server.use(router);
  }
  get server() {
    return this._server;
  }
}
export const main = new Main();

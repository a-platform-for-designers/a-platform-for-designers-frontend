import { AxiosInstance } from "axios";

export class TokenManager {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
    this.loadTokenFromLocalStorage();
  }

  private loadTokenFromLocalStorage() {
    const token = localStorage.getItem("token");
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Token ${token}`;
    }
  }

  public hasToken(): boolean {
    const token = localStorage.getItem("token");
    return token !== null;
  }

  public getToken() {
    return localStorage.getItem("token");
  }

  public setToken(token: string): void {
    this.api.defaults.headers.common["Authorization"] = `Token ${token}`;
    localStorage.setItem("token", token);
  }

  public clearToken(): void {
    localStorage.removeItem("token");
    this.api.defaults.headers.common["Authorization"] = undefined;
    console.log(localStorage, this.api.defaults.headers.common);
  }
}

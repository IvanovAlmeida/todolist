export const environment = {
  production: false,
  apiUrl: '',

  sessionPrefix: '',

  isProduction(): boolean {
    return this.production;
  },

  isDevelopment(): boolean {
    return !this.production;
  }
};

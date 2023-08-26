export const environment = {
  production: false,
  apiUrl: '',

  sessionPrefix: '',
  logging: false,

  isProduction(): boolean {
    return this.production;
  },

  isDevelopment(): boolean {
    return !this.production;
  }
};

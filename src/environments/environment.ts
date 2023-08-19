export const environment = {
  production: false,
  apiUrl: '',

  authenticated: true, // temp

  isProduction(): boolean {
    return this.production;
  },

  isDevelopment(): boolean {
    return !this.production;
  }
};

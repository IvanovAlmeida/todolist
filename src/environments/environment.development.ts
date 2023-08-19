export const environment = {
  production: false,
  apiUrl: 'https://api.todo.maracanau.ifce.edu.br/v1',

  authenticated: false, // temp

  isProduction(): boolean {
    return this.production;
  },

  isDevelopment(): boolean {
    return !this.production;
  }
};

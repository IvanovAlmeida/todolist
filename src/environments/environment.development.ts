export const environment = {
  production: false,
  apiUrl: 'https://api.todo.maracanau.ifce.edu.br',

  sessionPrefix: 'todo',
  logging: true,

  isProduction(): boolean {
    return this.production;
  },

  isDevelopment(): boolean {
    return !this.production;
  }
};

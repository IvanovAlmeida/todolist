export const environment = {
  production: false,
  //apiUrl: 'https://api.todo.maracanau.ifce.edu.br',
  apiUrl: 'https://localhost:7069',

  sessionPrefix: 'todo',

  isProduction(): boolean {
    return this.production;
  },

  isDevelopment(): boolean {
    return !this.production;
  }
};

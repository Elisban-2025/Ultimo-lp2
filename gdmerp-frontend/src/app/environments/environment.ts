export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081/api/v1',
  keycloak: {
    issuer: 'http://localhost:8080/realms/gdmerp', // Cambiado estrictamente a gdmerp
    clientId: 'gdmerp-client', // Cambiado estrictamente a gdmerp
    redirectUri: 'http://localhost:4200/',
    postLogoutRedirectUri: 'http://localhost:4200/'
  }
};

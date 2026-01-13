export const environment = {
  applicationTitle: 'Ortia',
  backendUrl: 'http://localhost:8080',
  frontendUrl: 'https://localhost:4200',
  menuPath: '../../../../assets/dicionario/menu/menu.json',
  jsonPath: '../../../../assets/dicionario/',
  msalConfig: {
    auth: {
      clientId: '46513151-51f8-4912-8051-8de83c3ef9ed', // Client ID
      authority:
        'https://allystore.b2clogin.com/b46b5b87-a08e-487b-ae9b-fec172a9a90b/b2c_1_entradaEcadastro/v2.0/', // Tenant ID
      redirectUri: 'callback', // URL para redirecionamento após login
      //postLogoutRedirectUri: window.location.origin // URL para redirecionamento após logout
    },
    cache: {
      cacheLocation: 'localStorage', // 'localStorage' ou 'sessionStorage'
      storeAuthStateInCookie: false,
    },
    // Escopos de API que a aplicação acessa
    tokenRequest: {
      scopes: [
        'https://allystore.onmicrosoft.com/46513151-51f8-4912-8051-8de83c3ef9ed/test.read openid',
      ],
    },
  },

  testeJSONPath: '../../../../assets/dicionario/teste.json',
  registroJSONPath: '../../../../assets/dicionario/registro.json',
};

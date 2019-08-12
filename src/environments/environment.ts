export const environment = {
  production: false,
  OIDC: {
    baseUrl: 'http://localhost:4200',
    authorizationEndpoint: '/login',
    tokenEndpoint: '/connect/token',
    urlUser: 'http://10.199.15.95/authorize',
    userinfoEndpoint: '/connect/userinfo',
    Paramaters: {
      'url': 'http://localhost:4200/login',
      'scope': 'openid',
      'client_id': 'adss',
      'clientSecret': '',
      'redirect_uri': 'http://localhost:4300',
      'response_type': 'code id_token token',
      'nonce': 'n-0S6_WzA2Mj'
    }
  },
  Languager: '/assets/i18n/'
};

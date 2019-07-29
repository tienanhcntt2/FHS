export const environment = {
  production: true,
  OIDC: {
    baseUrl: 'http://10.199.15.95',
    authorizationEndpoint: '/login',
    tokenEndpoint: '/connect/token',
    urlUser: 'http://10.199.15.95/authorize',
    userinfoEndpoint: '/connect/userinfo',
    Paramaters: {
      'url': 'http://10.199.15.95/login',
      'scope': 'openid',
      'client_id': 'adss',
      'clientSecret': '',
      'redirect_uri': 'http://10.199.15.95/wind/home',
      'response_type': 'code id_token token',
      'nonce': 'n-0S6_WzA2Mj'
    }
  },
  Languager: '/weather/assets/i18n/'

};

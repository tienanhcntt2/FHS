export const environment = {
    production: true,
    OIDC: {
      baseUrl: 'http://10.199.15.93:8081/',
      authorizationEndpoint: '/',
      tokenEndpoint: '/connect/token',
      urlUser: 'http://10.199.15.95/authorize',
      userinfoEndpoint: '/connect/userinfo',
      Paramaters: {   
      'scope': 'openid',
      'client_id': 'weather',
      'clientSecret': '',
      'redirect_uri': 'http://10.199.15.93:8080/',
      'response_type': 'id_token token',
      'nonce': 'n-0S6_WzA2Mj'
      }
      },
      
    Languager: '/assets/i18n/'
  
  };
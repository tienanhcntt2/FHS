export const environment = {
  production: false,
  OIDC: {
    baseUrl: 'http://10.199.15.93',
    authorizationEndpoint: '/login',
    tokenEndpoint:'/connect/token',
    urlUser :'http://10.199.15.95/authorize',
    userinfoEndpoint:'/connect/userinfo',
    Paramaters: {
    'url' :'http://10.199.15.93/login',
    'scope': 'openid',
    'client_id': 'adss',
    'clientSecret': '',
    'redirect_uri': 'http://10.199.15.93/wind/home',
    'response_type': 'code id_token token',
    'nonce':'n-0S6_WzA2Mj'
    }
    }
};

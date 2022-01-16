export interface AmadeusToken {
  type: string; // The type of resource. The value will be amadeusOAuth2Token
  username: string; // Your username (email address)
  application_name: string; // The name of your application
  client_id: string; // The API Key for your application
  token_type: string; // The type of token issued by the authentication server. Value will be Bearer
  access_token: string; // The token to authenticate your requests
  expires_in: number; // The number of seconds until the token expires
  state: string; // The status of your request. Values can be approved or expired
  scope: string;
}

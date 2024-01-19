export default {
  backendApi:
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === 'production'
      ? 'https://dev.profescipta.co.id/so-api'
      : 'https://dev.profescipta.co.id/so-api',

  bodyGetToken: {
    grant_type: "client_credentials",
    client_id: "profes-api",
    client_secret: "P@ssw0rd"
  }
};


export function generateRandomNumber() {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return randomNumber.toString();
}
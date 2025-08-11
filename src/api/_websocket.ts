// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// import Config from 'config';

// import { setTokenHeader } from './_token';

// let echo: Echo | undefined;
// let token: string | undefined;

// const getEcho = async () => {
//   // Check if token has changed, if so, create pusher with new token
//   const newToken = (await setTokenHeader())?.token;

//   if (Config.disableWs || !Config.wsDomain || !newToken) {
//     console.debug('WS DISABLED');
//     return null;
//   }

//   if (echo && token === newToken) {
//     return echo;
//   }

//   if (echo) {
//     destroyEcho();
//   }

//   token = newToken;

//   const pusher = new Pusher(Config.pusherId, {
//     cluster: Config.pusherId,
//     authEndpoint: `${Config.apiDomain}/api/broadcasting/auth`,
//     // trim http(s)
//     httpHost: Config.apiDomain.replace(/(^\w+:|^)\/\//, ''),
//     wsHost: Config.wsDomain,
//     wsPort: Config.wsPort,
//     wssPort: Config.wssPort,
//     forceTLS: false,
//     disableStats: true,
//     auth: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });

//   echo = new Echo({
//     broadcaster: 'pusher',
//     client: pusher,
//   });
//   return echo;
// };

// export const destroyEcho = () => {
//   if (echo) {
//     echo.disconnect();
//   }
//   echo = undefined;
//   return;
// };

// getEcho();

// export default getEcho;

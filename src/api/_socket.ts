// import Echo from 'laravel-echo';
// import { isNumber } from 'lodash-es';

// import { callAPIHandler } from 'api/_base';
// import type { ResponseAsyncType, ResponseType } from 'types/response';

// import { fallbackCmsOptions } from './helper';

// const getAsyncDetail = <T>(asyncId: string, module: string) => {
//   return callAPIHandler<T & ResponseType>(
//     'get',
//     `/api/admin/${module}${module ? '/' : ''}async-action-details`,
//     {
//       async_action_id: asyncId,
//     },
//     true,
//     {},
//   );
// };

// // Use action id from socket response to get result details
// const getAsyncResponse = <T>(
//   res: ResponseAsyncType,
//   module: string,
// ): Promise<T & ResponseType> => {
//   // Only call api if async_action_details is true
//   if (res.async_action_id && res.async_action_details) {
//     return getAsyncDetail<T>(res.async_action_id, module);
//   }
//   // Otherwise, details is already in ws response
//   return new Promise((resolve, reject) => {
//     if (!res.async_action_response) {
//       reject({
//         error_message: 'No async action response or details flag',
//         ...res,
//       });
//       return;
//     }
//     resolve(fallbackCmsOptions(res.async_action_response) as any);
//   });
// };

// const asyncActionCallback = <T>(
//   res: ResponseAsyncType,
//   module: string,
// ): Promise<(T & ResponseType) | undefined> => {
//   if (res.async_action_progress) {
//     console.debug(`WS Processing: ${res.async_action_progress}`);
//   }
//   switch (res?.async_action_status) {
//     case 'cancelled':
//     case 'failed':
//       console.warn('WS Processing Failed');
//       return getAsyncResponse(res, module);
//     case 'completed':
//       console.debug('COMPLETED', res, module);
//       return getAsyncResponse(res, module);
//     case 'processing':
//       return new Promise(resolve => resolve(undefined));
//     // default:
//     //   throw new Error('Invalid WS response ' + JSON.stringify(res));
//   }
// };

// export const waitForWsData = async <T>(
//   asyncId: string,
//   module: string,
//   wsCallback?: (e: ResponseAsyncType) => void,
// ): Promise<T & ResponseType> =>
//   new Promise((resolve, reject) => {
//     let interval: NodeJS.Timer | undefined;
//     let echo: Echo | undefined;
//     const channelId = `async_action_update.${asyncId}`;

//     const endAndRetry = (e: unknown) => {
//       if (isNumber(interval)) {
//         clearInterval(interval);
//       }
//       reject(e);
//     };

//     const handleRes = (res: T & ResponseAsyncType) => {
//       wsCallback?.(res);
//       asyncActionCallback<T & ResponseAsyncType>(res, module)
//         .then(asyncRes => {
//           console.debug('asyncRes', { asyncRes });
//           if (asyncRes) {
//             // Ended
//             echo?.leave(channelId);

//             // Lets stop this interval
//             if (isNumber(interval)) {
//               clearInterval(interval);
//             }
//             resolve(asyncRes);
//           } else {
//             // Processing
//           }
//         })
//         .catch(e => {
//           endAndRetry(e);
//         });
//     };

//     const handleAsyncUpdate = (wsRes: (T & ResponseAsyncType) | undefined) => {
//       if (wsRes) {
//         // Have response
//         handleRes(wsRes);
//       } else {
//         getAsyncDetail<T & ResponseAsyncType>(asyncId, module)
//           .then(res => {
//             handleRes(res);
//           })
//           .catch(e => {
//             endAndRetry(e);
//           });
//       }
//     };

//     // If no update in 5 sec, refetch or reject this api call
//     interval = setInterval(() => {
//       console.debug('Requesting async update', asyncId, module);
//       handleAsyncUpdate(undefined);
//     }, 5000);

//     // FIXME: Backend is solely relying on the above interval without setting up echo at all
//     // So this will always be error, sometimes will exit before even calling details api
//     // getEcho()
//     //   .then(resEcho => {
//     //     if (!resEcho) {
//     //       return;
//     //     }
//     //     echo = resEcho;
//     //     echo
//     //       .private(channelId)
//     //       .listen(
//     //         '.async_action_update',
//     //         (asyncUpdateRes: T & ResponseAsyncType) => {
//     //           handleAsyncUpdate(asyncUpdateRes);
//     //         },
//     //       )
//     //       .error(e => {
//     //         endAndRetry(e);
//     //       });
//     //   })
//     //   .catch(e => {
//     //     console.warn(e);
//     //   });
//   });

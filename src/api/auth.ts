import { callAPIHandler } from './_base';

export interface ServerAuthToken {
  token: string;
  privateToken: string | null;
}

export const apiUserLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<ServerAuthToken> =>
  callAPIHandler(
    'get',
    '/moodle/login/token.php',
    { username, password, service: 'moodle_mobile_app' },
    false,
  );
apiUserLogin.queryKey = 'get,/moodle/login/token.php';

export const apiUserLogout = async () =>
  callAPIHandler('post', '/moodle/logout', {}, true, {
    redirect: false,
  });

export const apiUserRefreshToken = (refreshToken): Promise<ServerAuthToken> =>
  callAPIHandler(
    'post',
    '/api/refresh',
    {
      refresh_token: refreshToken,
    },
    false,
  );

// export interface CmsUserProfile {
//   id: string;
//   name: string;
//   is_superadmin?: boolean;
//   permissions:
//     | {
//         [module: string]: string[];
//       }
//     | undefined;
//   cms_user_group:
//     | {
//         [groupKey: string]: string;
//       }
//     | undefined;
// }

// export const apiGetProfile = (): Promise<CmsUserProfile> =>
//   callAPIHandler('get', '/api/user_auth/profile', {}, true, {
//     redirect: false,
//     cache: 604800000,
//   });
// apiGetProfile.queryKey = 'get,/api/user_auth/profile';

// export interface UpdateProfileParam {
//   new_password?: string;
//   current_password?: string;
// }

// export const apiUpdateProfile = (
//   newProfileData: UpdateProfileParam,
// ): Promise<{ success: true }> => {
//   return callAPIHandler(
//     'post',
//     '/api/user_auth/profile/update',
//     newProfileData,
//     true,
//   );
// };

// // MFA
// export const apiUserMfaVerify = ({
//   salt,
//   verificationCode,
//   channel,
// }: {
//   salt: string;
//   verificationCode: string;
//   channel: string;
// }): Promise<ServerAuthToken | MFAResponse> =>
//   callAPIHandler(
//     'post',
//     '/api/user_auth/verify-mfa',
//     {
//       salt,
//       verification_code: verificationCode,
//       fa_channel: channel,
//     },
//     false,
//   );

// export const apiUserMfaRequest = ({
//   salt,
// }: {
//   salt: string;
// }): Promise<MFAResponse> =>
//   callAPIHandler('post', '/api/user_auth/request-mfa', { salt }, false);

// // Forget Password
// export const apiUserForgetPassword = ({
//   email,
// }: {
//   email: string;
// }): Promise<MFAResponse> =>
//   callAPIHandler('post', '/api/user_auth/forgot-password', { email }, false);

// export const apiUserChangePassword = ({
//   email,
//   verify,
//   password,
// }: {
//   email: string;
//   verify: string;
//   password: string;
// }): Promise<MFAResponse> =>
//   callAPIHandler(
//     'post',
//     '/api/user_auth/forgot-password',
//     { email, verify, password },
//     false,
//   );

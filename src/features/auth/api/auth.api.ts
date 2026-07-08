import api from "../../../api/axios";
import type {
  ApiResponse,
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
  RegisterResponseData,
  VerifyEmailPayload,
} from "../types/auth.type";

export async function registerApi(payload: RegisterPayload) {
  const response = await api.post<ApiResponse<RegisterResponseData>>(
    "/public/auth/register",
    payload,
  );
  return response.data;
}

export async function verifyEmailApi(payload: VerifyEmailPayload) {
  const response = await api.post<ApiResponse<null | { verified?: boolean }>>(
    "/public/auth/verify-email",
    payload,
  );
  return response.data;
}

export async function loginApi(payload: LoginPayload) {
  const response = await api.post<ApiResponse<LoginResponseData>>(
    "/public/auth/login",
    payload,
  );

  console.log(response);

  return response.data;
}

import { AxiosError, AxiosResponse } from "axios";

type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;

type SuccessResponse<V> = {
  success: true;
  data: V;
};

type ErrorRepsonse<E = AxiosError> = {
  success: false;
  error: E;
};

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorRepsonse<E>>;

export function requestHandler<T, V, E = AxiosError>(
  request: BaseRequest<T, V>
) {
  return async (params?: T): Promise<BaseResponse<V, E>> => {
    try {
      const response = await request(params);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error as E };
    }
  };
}

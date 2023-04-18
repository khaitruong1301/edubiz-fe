import environment from "../environments/environment";

export const getHinhAnh = (url) => {
  return `${environment.baseUrl}/${url}`;
};

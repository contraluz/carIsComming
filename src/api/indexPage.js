import instance from "./index";

// 登录
export const login = function ({ username, password }) {
  return instance.post(`springBootSwagger/login?username=${username}&password=${password}`)
}

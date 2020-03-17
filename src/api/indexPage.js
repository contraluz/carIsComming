import instance from "./index";

// 登录
export const login = function ({ username, password }) {
  return instance.post(`springBootSwagger/login?username=${username}&password=${password}`)
}

// 用户查询
export const selectAllUser = function ({ page, size }) {
  return instance.get(`springBootSwagger/selectAllUser/${page}/${size}`)
}


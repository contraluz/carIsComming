import instance from "./index";

// 登录
export const login = function ({ username, password }) {
  return instance.post(`springBootSwagger/login?username=${username}&password=${password}`)
}

// 用户查询
export const selectAllUser = function ({ page, size }) {
  return instance.get(`springBootSwagger/selectAllUser/${page}/${size}`)
}

// ------------------------

// 日值查询
export const mapSfcLog = function ({ page, size, outs }) {
  return instance.get(`springBootSwagger/mapSfcLog/${page}/${size}?outs=${outs}`)
}

// 日值删除
export const deleteSfcLog = function (id) {
  return instance.post(`springBootSwagger/deleteSfcLog?id=${id}`)
}

// ------------------------

// 用户信息查询
export const listAllSfcUser = function ({ page, size, name, phone }) {
  return instance.get(`springBootSwagger/listAllSfcUser/${page}/${size}?name=${name}&phone=${phone}`)
}

// 用户信息更新
export const updateSfcUser = function ({ id, name, phone, money, reputation }) {
  return instance.post(`springBootSwagger/updateSfcUser?id=${id}&name=${name}&phone=${phone}&money=${money}&reputation=${reputation}`)
}

// 用户信息删除
export const deleteSfcUser = function (id) {
  return instance.post(`springBootSwagger/deleteSfcUser?id=${id}`)
}

// ------------------------


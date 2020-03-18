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

// 热门城市查询
export const mapSfcCountry = function ({ page, size, code, cityName }) {
  return instance.get(`springBootSwagger/mapSfcCountry/${page}/${size}?code=${code}&cityName=${cityName}`)
}

// 热门城市新增
export const insertSfcCountry = function ({ code, cityName }) {
  return instance.post(`springBootSwagger/insertSfcCountry?&code=${code}&cityName=${cityName}`)
}

// 热门城市删除
export const deleteSfcCountry = function ({ code, cityName }) {
  return instance.post(`springBootSwagger/deleteSfcCountry?&code=${code}&cityName=${cityName}`)
}

// ------------------------

// 支付管理查询
export const sfcZfService = function ({ page, size, number, isNonG }) {
  return instance.get(`springBootSwagger/sfcZfService/${page}/${size}?number=${number}&isNonG=${isNonG}`)
}

// 支付管理编辑
export const updateSfcZf = function ({ id, time, number, isNonG }) {
  return instance.post(`springBootSwagger/updateSfcZf?&id=${id}&time=${time}&number=${number}&isNonG=${isNonG}`)
}

// ------------------------

// 行驶证 驾驶证管理查询
export const mapSfcMotor = function ({ page, size, number, type }) {
  return instance.get(`springBootSwagger/mapSfcMotor/${page}/${size}?number=${number}&type=${type}`)
}

// 行驶证编辑
export const updateSfcMotor = function ({ id, number, type }) {
  return instance.post(`springBootSwagger/updateSfcMotor?&id=${id}&number=${number}&type=${type}`)
}

// 行驶证新增
export const insertSfcMotor = function ({ id, number, type }) {
  return instance.post(`springBootSwagger/insertSfcMotor?&id=${id}&number=${number}&type=${type}`)
}

// 行驶证删除
export const deleteSfcMotor = function (id) {
  return instance.post(`springBootSwagger/deleteSfcMotor?&id=${id}`)
}

// ------------------------

// 车费查询
export const mapSfcPice = function ({ page, size }) {
  return instance.get(`springBootSwagger/mapSfcPice/${page}/${size}`)
}

// 车费编辑
export const updateSfcPice = function ({ id, num }) {
  return instance.post(`springBootSwagger/updateSfcPice?&id=${id}&num=${num}`)
}

// 车费新增
export const insertSfcPice = function (num) {
  return instance.post(`springBootSwagger/insertSfcPice?&num=${num}`)
}

// 车费删除
export const deleteSfcPice = function (id) {
  return instance.post(`springBootSwagger/deleteSfcPice?&id=${id}`)
}

// ------------------------

// 实名查询
export const mapListSfcAuthorize = function ({ page, size, name, card }) {
  return instance.get(`springBootSwagger/mapListSfcAuthorize/${page}/${size}name=${name}&card=${card}`)
}

// 实名编辑
export const updateSfcAuthorize = function ({ id, name, card }) {
  return instance.post(`springBootSwagger/updateSfcAuthorize?&id=${id}&name=${name}&card=${card}`)
}

// 实名新增
export const insertSfcAuthorize = function ({ id, name, card }) {
  return instance.post(`springBootSwagger/insertSfcAuthorize?&id=${id}&name=${name}&card=${card}`)
}

// 实名删除
export const deleteSfcAuthorize = function (id) {
  return instance.post(`springBootSwagger/deleteSfcAuthorize?&id=${id}`)
}

// ------------------------
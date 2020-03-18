import instance from "./index";

// 登录
export const login = function ({
  username,
  password
}) {
  return instance.post(`springBootSwagger/login?username=${username}&password=${password}`)
}

// 用户查询
export const selectAllUser = function ({
  page,
  size
}) {
  return instance.get(`springBootSwagger/selectAllUser/${page}/${size}`)
}

// ------------------------

// 日值查询
export const mapSfcLog = function ({
  page,
  size,
  outs
}) {
  return instance.get(`springBootSwagger/mapSfcLog/${page}/${size}?outs=${outs}`)
}

// 日值删除
export const deleteSfcLog = function (id) {
  return instance.post(`springBootSwagger/deleteSfcLog?id=${id}`)
}

// ------------------------

// 用户信息查询
export const listAllSfcUser = function ({
  page,
  size,
  name,
  phone
}) {
  return instance.get(`springBootSwagger/listAllSfcUser/${page}/${size}?name=${name}&phone=${phone}`)
}

// 用户信息更新
export const updateSfcUser = function ({
  id,
  name,
  phone,
  money,
  reputation
}) {
  return instance.post(`springBootSwagger/updateSfcUser?id=${id}&name=${name}&phone=${phone}&money=${money}&reputation=${reputation}`)
}

// 用户信息删除
export const deleteSfcUser = function (id) {
  return instance.post(`springBootSwagger/deleteSfcUser?id=${id}`)
}

// ------------------------

// 热门城市查询
export const mapSfcCountry = function ({
  page,
  size,
  code,
  cityName
}) {
  return instance.get(`springBootSwagger/mapSfcCountry/${page}/${size}?code=${code}&cityName=${cityName}`)
}

// 热门城市新增
export const insertSfcCountry = function ({
  code,
  cityName
}) {
  return instance.post(`springBootSwagger/insertSfcCountry?&code=${code}&cityName=${cityName}`)
}

// 热门城市删除
export const deleteSfcCountry = function ({
  code,
  cityName
}) {
  return instance.post(`springBootSwagger/deleteSfcCountry?&code=${code}&cityName=${cityName}`)
}

// ------------------------

// 支付管理查询
export const sfcZfService = function ({
  page,
  size,
  number,
  isNonG
}) {
  return instance.get(`springBootSwagger/sfcZfService/${page}/${size}?number=${number}&isNonG=${isNonG}`)
}

// 支付管理编辑
export const updateSfcZf = function ({
  id,
  time,
  number,
  isNonG
}) {
  return instance.post(`springBootSwagger/updateSfcZf?&id=${id}&time=${time}&number=${number}&isNonG=${isNonG}`)
}

// ------------------------

// 行驶证 驾驶证管理查询
export const mapSfcMotor = function ({
  page,
  size,
  number,
  type
}) {
  return instance.get(`springBootSwagger/mapSfcMotor/${page}/${size}?number=${number}&type=${type}`)
}

// 行驶证编辑
export const updateSfcMotor = function ({
  id,
  number,
  type
}) {
  return instance.post(`springBootSwagger/updateSfcMotor?&id=${id}&number=${number}&type=${type}`)
}

// 行驶证新增
export const insertSfcMotor = function ({
  id,
  number,
  type
}) {
  return instance.post(`springBootSwagger/insertSfcMotor?&id=${id}&number=${number}&type=${type}`)
}

// 行驶证删除
export const deleteSfcMotor = function ({
  id
}) {
  return instance.post(`springBootSwagger/deleteSfcMotor?&id=${id}`)
}

// ------------------------

// 车费查询
export const mapSfcPice = function ({
  page,
  size
}) {
  return instance.get(`springBootSwagger/mapSfcPice/${page}/${size}`)
}

// 车费编辑
export const updateSfcPice = function ({
  id,
  num
}) {
  return instance.post(`springBootSwagger/updateSfcPice?&id=${id}&num=${num}`)
}

// 车费新增
export const insertSfcPice = function ({
  num
}) {
  return instance.post(`springBootSwagger/insertSfcPice?&num=${num}`)
}

// 车费删除
export const deleteSfcPice = function ({
  id
}) {
  return instance.post(`springBootSwagger/deleteSfcPice?&id=${id}`)
}

// ------------------------

// 实名查询
export const mapListSfcAuthorize = function ({
  page,
  size,
  name,
  card
}) {
  return instance.get(`springBootSwagger/mapListSfcAuthorize/${page}/${size}?name=${name}&card=${card}`)
}

// 实名编辑
export const updateSfcAuthorize = function ({
  id,
  name,
  cardId
}) {
  return instance.post(`springBootSwagger/updateSfcAuthorize?&id=${id}&name=${name}&card=${cardId}`)
}

// 实名新增
export const insertSfcAuthorize = function ({
  id,
  name,
  cardId
}) {
  return instance.post(`springBootSwagger/insertSfcAuthorize?&id=${id}&name=${name}&card=${cardId}`)
}

// 实名删除
export const deleteSfcAuthorize = function ({
  id
}) {
  return instance.post(`springBootSwagger/deleteSfcAuthorize?&id=${id}`)
}

// ------------------------

// 预约查询
export const mapSfcYy = function ({
  page,
  size,
  start,
  end,
  remake
}) {
  return instance.get(`springBootSwagger/mapSfcYy/${page}/${size}?start=${start}&end=${end}&remake=${remake}`)
}

// 预约编辑
export const updateSfcYy = function ({
  id,
  start,
  end,
  time,
  num,
  remake
}) {
  return instance.post(`springBootSwagger/updateSfcYy?&id=${id}&start=${start}&end=${end}&time=${time}&num=${num}&remake=${remake}`)
}

// 预约新增
export const insertSfcYy = function ({
  rid,
  userId,
  start,
  end,
  time,
  num,
  remake
}) {
  return instance.post(`springBootSwagger/insertSfcYy?&rid=${rid}&userId=${userId}&start=${start}&end=${end}&time=${time}&num=${num}&remake=${remake}`)
}

// 预约删除
export const deleteSfcYy = function ({
  id
}) {
  return instance.post(`springBootSwagger/deleteSfcYy?&id=${id}`)
}

// ------------------------

// 取消预订查询
export const mapSfcUnsubscribe = function ({
  page,
  size,
  remake
}) {
  return instance.get(`springBootSwagger/mapSfcUnsubscribe/${page}/${size}${remake?'?remake=' + remake : ''}`)
}

// 取消预订编辑
export const updateSfcUnsubscribe = function ({
  id,
  remake
}) {
  return instance.post(`springBootSwagger/updateSfcUnsubscribe?&id=${id}&remake=${remake}`)
}

// 取消预订删除
export const deleteSfcUnsubscribe = function ({
  id
}) {
  return instance.post(`springBootSwagger/deleteSfcUnsubscribe?&id=${id}`)
}

// ------------------------

// 预约查询
export const mapListSfcOwnerRelease = function ({
  page,
  size,
  start,
  end,
  type
}) {
  return instance.get(`springBootSwagger/mapListSfcOwnerRelease/${page}/${size}?start=${start}&end=${end}&type=${type}`)
}

// 预约编辑
export const updateSfcOwnerRelease = function ({
  id,
  userID,
  start,
  end,
  roadLine,
  type,
  free,
  cost,
  remake
}) {
  return instance.post(`springBootSwagger/updateSfcOwnerRelease?&id=${id}&start=${start}&end=${end}&roadLine=${roadLine}&userID=${userID}&type=${type}&free=${free}&cost=${cost}&remake=${remake}`)
}

// 预约新增
export const insertSfcOwnerRelease = function ({
  id,
  roadLine,
  start,
  end,
  type,
  free,
  cost,
  remake
}) {
  return instance.post(`springBootSwagger/insertSfcOwnerRelease?&id=${id}&roadLine=${roadLine}&start=${start}&end=${end}&type=${type}&free=${free}&cost=${cost}&remake=${remake}`)
}

// 预约删除
export const deleteSfcOwnerRelease = function ({
  id
}) {
  return instance.post(`springBootSwagger/deleteSfcOwnerRelease?&id=${id}`)
}

// ------------------------

// 路线查询
export const mapSfcPosition = function ({
  page,
  size,
  start,
  end
}) {
  return instance.get(`springBootSwagger/mapSfcPosition/${page}/${size}?start=${start}&end=${end}`)
}

// 路线编辑
export const updateSfcPosition = function ({
  id,
  start,
  end
}) {
  return instance.post(`springBootSwagger/updateSfcPosition?&id=${id}&start=${start}&end=${end}`)
}

// 路线新增
export const insertSfcPosition = function ({
  start,
  end
}) {
  return instance.post(`springBootSwagger/insertSfcPosition?start=${start}&end=${end}`)
}

// 路线删除
export const deleteSfcPosition = function ({
  id
}) {
  return instance.post(`springBootSwagger/deleteSfcPosition?&id=${id}`)
}

// ------------------------

// 座位查询
export const mapListSfcReserve = function ({
  page,
  size,
  start,
  phone,
  startPoint,
  endPoint
}) {
  return instance.get(`springBootSwagger/mapListSfcReserve/${page}/${size}?start=${start}&phone=${phone}&startPoint=${startPoint}&endPoint=${endPoint}`)
}

// 座位编辑
export const updateSfcReserve = function ({
  id,
  phone,
  start,
  startPoint,
  endPoint,
  num,
  userId
}) {
  return instance.post(`springBootSwagger/updateSfcReserve?&id=${id}&start=${start}&phone=${phone}&startPoint=${startPoint}&endPoint=${endPoint}&num=${num}&userId=${userId}`)
}

// 座位新增
export const insertSfcReserve = function ({
  id,
  phone,
  start,
  startPoint,
  endPoint,
  num,
  userId
}) {
  return instance.post(`springBootSwagger/insertSfcReserve?&id=${id}&start=${start}&phone=${phone}&startPoint=${startPoint}&endPoint=${endPoint}&num=${num}&userId=${userId}`)
}

// 座位删除
export const deleteSfcReserve = function ({
  id,
  userId
}) {
  return instance.post(`springBootSwagger/deleteSfcReserve?&id=${id}&userId=${userId}`)
}

// ------------------------
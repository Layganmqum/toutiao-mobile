/**
 * 本地存储封装模块
 *  - 目的是为了方便管理
 *  - 提高开发效率，增强可维护性
 *  - 提高重用性
 */
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // ?为什么要把 JSON.parse 放到 try-catch 里面?
  // *因为 data 可能不是 JSON格式字符串
  try {
    // *尝试把 data 转为对象形式
    JSON.parse(data)
    return data
  } catch {
    // *data 不是 JSON 格式字符串,直接原样返回
    return data
  }
}

export const setItem = (name, value) => {
  // ?如果 value 是对象，就把 value 转为 JSON 格式字符串再进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}

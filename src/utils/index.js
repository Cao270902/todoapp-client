// export const getQueryString = (params) => {
//   let queryString = "";
//   Object.keys(params).forEach((key) => {
//     if (params[key] !== null && params[key] !== undefined) {
//       queryString += `${key}=${params[key]}&`;
//     }
//   });
//   return queryString;
// };

export const getQueryString = (params) => {
  let queryString = "";
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined) {
      queryString += `${key}=${params[key]}&`;
    }
  });
  return queryString.slice(0, -1); // Loại bỏ ký tự & cuối cùng
};

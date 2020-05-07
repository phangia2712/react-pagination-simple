export default class Functions {
  static object = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //   'Authorization': 'Bearer ' + configs.ACCESS_TOKEN,
      // 'Host': 'api.producthunt.com'
    },
  };
  static async fetchData(urlGetTotalPage, urlPagination) {
    let totalPage = fetch(urlGetTotalPage, Functions.object).then((res) =>
      res.json()
    );
    console.log("Functions -> fetchData -> totalPage", totalPage);
    let data = fetch(urlPagination, Functions.object).then((res) => res.json());
    console.log("Functions -> fetchData -> data", data);
    return await Promise.all([totalPage, data]);
  }
}

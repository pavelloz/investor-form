const api = {
  createInvestor: ({ data, callback }) => {
    return fetch("http://localhost:3001/investor", {
      method: "post",
      body: data,
    })
      .then((data) => data.json())
      .then((res) => {
        res.status === 200 &&
          callback({
            type: "success",
            title: "Investor successfully added",
            message:
              "Investor has been saved. You can now use your profile on any supported website.",
          });
        res.status === 500 &&
          callback({
            type: "error",
            title: "Something went wrong on the server",
            message:
              "If it happens again please contact us on support@example.com.", // Ideally we would say what went wrong without original errors
          });
      })
      .catch((err) => console.error(err));
  },
};

export default api;

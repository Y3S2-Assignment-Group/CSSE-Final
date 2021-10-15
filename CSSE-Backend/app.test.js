const axios = require("axios");

// IT19132310 - Lasal Hettiarachchi
describe("Testing the Site  API", () => {
  const site = {
    id: "61571f3b0a910a199d125e12",
    siteName: "Site 1",
    siteAddress: "Colombo",
  };

  it("GET/Site -> get an array of sites", async () => {
    const response = await axios.get(
      "https://csse-backend.herokuapp.com/api/site"
    );
    expect(response.status).toBe(200);
  });
  it("GET/Site/id -> get a specific site by id", async () => {
    const response = await axios.get(
      "https://csse-backend.herokuapp.com/api/site/61571f3b0a910a199d125e12"
    );
    expect(response.status).toBe(200);
    expect(response.data._id).toBe(site.id);
    expect(response.data.siteName).toBe(site.siteName);
    expect(response.data.siteAddress).toBe(site.siteAddress);
  });
  it("POST/Site/ -> add a site", async () => {
    const response = await axios.post(
      "https://csse-backend.herokuapp.com/api/site",
      {
        siteName: "Site 2",
        siteAddress: "Colombo",
        siteContactNumber: "0779142664",
        siteManager: {
          _id: "61571d99d6bfb9e562e40d95",
        },
      }
    );
    expect(response.status).toBe(200);
    expect(response.data.siteName).toBe("Site 2");
    expect(response.data.siteAddress).toBe("Colombo");
    expect(response.data.siteContactNumber).toBe("0779142664");
  });
});

// IT19139036 - Senura Jayadeva
describe("Testing the Product  API", () => {
  const product = {
    id: "61571dc0d6bfb9e562e40d99",
    ProductName: "Product 1",
    pPrice: 2500,
    isRestricted: false,
  };
  it("GET/Product -> get an array of products", async () => {
    const response = await axios.get(
      "https://csse-backend.herokuapp.com/api/product"
    );
    expect(response.status).toBe(200);
  });
  it("GET/Product/id -> get a specific product by id", async () => {
    const response = await axios.get(
      "https://csse-backend.herokuapp.com/api/product/61571dc0d6bfb9e562e40d99"
    );
    expect(response.status).toBe(200);
    expect(response.data._id).toBe(product.id);
    expect(response.data.ProductName).toBe(product.ProductName);
    expect(response.data.pPrice).toBe(product.pPrice);
    expect(response.data.isRestricted).toBe(product.isRestricted);
  });
  it("POST/Product/ -> add a product", async () => {
    const response = await axios.post(
      "https://csse-backend.herokuapp.com/api/product",
      {
        ProductName: "Product 3",
        pPrice: 3000,
        isRestricted: false,
        supplierId: "61571d48d6bfb9e562e40d8d",
      }
    );
    expect(response.status).toBe(200);

    expect(response.data.ProductName).toBe("Product 3");
    expect(response.data.pPrice).toBe(3000);
    expect(response.data.isRestricted).toBe(false);
  });
});

// IT19129036 - Dilmi Palliyaguruge
describe("Testing the Manager  API", () => {
  const managerLog = {
    email: "senurajayadeva@gmail.com",
    password: "senura123",
  };
  const managerReg = {
    email: "senurajayadeva2@gmail.com",
    password: "senura123",
    name: "Senura Jayadeva",
  };
  it("POST/Manager/login-> login the manager", async () => {
    const response = await axios.post(
      "https://csse-backend.herokuapp.com/api/manager/login",
      {
        email: managerLog.email,
        password: managerLog.password,
      }
    );
    expect(response.status).toBe(200);
  });
  it("POST/Manager/register-> login the manager", async () => {
    const response = await axios.post(
      "https://csse-backend.herokuapp.com/api/manager/register",
      {
        email: managerReg.email,
        password: managerReg.password,
        name: managerReg.name,
      }
    );
    expect(response.status).toBe(200);
  });

  it("POST/supplier/all-> list of suppliers", async () => {
    const response = await axios.get(
      "https://csse-backend.herokuapp.com/api/supplier/all"
    );
    expect(response.status).toBe(200);
  });
});

// IT19146898 - Ayodya Fernando
describe("Testing the Order API", () => {
  const product = {
    id: "61571dc0d6bfb9e562e40d99",
    ProductName: "Product 1",
    pPrice: 2500,
    isRestricted: false,
  };
  it("GET/Order -> get an array of orders", async () => {
    const response = await axios.get(
      "https://csse-backend.herokuapp.com/api/order"
    );
    expect(response.status).toBe(200);
  });
  it("POST/Order/sitemanager/site/:siteid -> add an Order", async () => {
    const response = await axios.post(
      "https://csse-backend.herokuapp.com/api/order/sitemanager/site/61571f3b0a910a199d125e12",
      {
        placedDate: "2021-09-29",
        requiredDate: "2021-10-02",
        supplier: {
          _id: "61571d48d6bfb9e562e40d8d",
        },
      }
    );
    expect(response.status).toBe(200);
  });
});

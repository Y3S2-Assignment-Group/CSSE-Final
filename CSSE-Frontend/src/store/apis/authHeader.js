export default function authHeader() {
    const token = localStorage.getItem("x-auth-token");
  
    if (token) {
      return { "x-auth-token": token };
    } else {
      return {};
    }
  }
  
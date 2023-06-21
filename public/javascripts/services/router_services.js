import authServices from "../services/auth_services.js"


let routerServices = {
  goToHome: async function () {
    if (authServices.isAuth) {
      window.location.href = '/home';
    } else {
      authServices.deleteUser();
      window.location.href = '/';
      alert("Usuário não autenticado. Por favor faça login novamente.");
    }
  },
  goToReceipts: async function () {
    if (authServices.isAuth) {
      window.location.href = '/register-receipts';
    } else {
      authServices.deleteUser();
      window.location.href = '/';
      alert("Usuário não autenticado. Por favor faça login novamente.");
    }
  },
  goToIngredients: async function () {
    if (authServices.isAuth) {
      window.location.href = '/register-ingredients';
    } else {
      authServices.deleteUser();
      window.location.href = '/';
      alert("Usuário não autenticado. Por favor faça login novamente.");
    }
  },
  goToCategories: async function () {
    if (authServices.isAuth) {
      window.location.href = '/register-receipt-category';
    } else {
      authServices.deleteUser();
      window.location.href = '/';
      alert("Usuário não autenticado. Por favor faça login novamente.");
    }
  },
}

export default routerServices
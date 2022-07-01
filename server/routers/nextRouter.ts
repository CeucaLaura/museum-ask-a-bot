import ImportRouter from "next-routes";

import ROUTES from "../../app/constants/routes";

const NextRouter = new ImportRouter();

NextRouter.add({
  name: ROUTES.HOME,
  page: "Home",
  pattern: "/",
});

NextRouter.add({
  name: ROUTES.ADMIN,
  page: "Admin",
  pattern: "/mgmt/admin",
});

NextRouter.add({
  name: ROUTES.SIGN_IN,
  page: "SignIn",
  pattern: "/mgmt/admin/signin",
});

export default NextRouter;

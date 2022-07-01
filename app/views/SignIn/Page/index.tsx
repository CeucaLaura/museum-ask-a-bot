import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "~/components/Button";
import { Router } from "~/helpers/router";
import ROUTES from "~/constants/routes";

import styles from "./styles";

const Page: React.FC = (): React.ReactElement => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  React.useEffect((): void => {
    if (!isLoading && isAuthenticated) {
      Router.pushRoute(ROUTES.ADMIN);
    }
  }, [isAuthenticated, isLoading]);

  return (
    <>
      <style jsx>{styles}</style>

      <div className="container">
        <Button
          onClick={async (): Promise<void> => loginWithRedirect()}
          variant="contained"
        >
          Log In
        </Button>
      </div>
    </>
  );
};

export default Page;

import * as React from "react";

import AppContext from "~/context/AppContext";
import RoomLayout from "~/layouts/RoomLayout";
import StartOverlay from "~/components/StartOverlay";

import RenderChat from "./RenderChat";
import styles from "./styles";

const Page: React.FC = (): React.ReactElement<any> => {
  const appContext = React.useContext(AppContext);

  const [renderOverlay, setRenderOverlay] = React.useState(true);
  const [overlayIsVisible, setOverlayIsVisible] = React.useState(true);

  return (
    <>
      <style jsx>{styles}</style>

      <RoomLayout>
        {renderOverlay && (
          <StartOverlay
            onChange={(): void => {
              setOverlayIsVisible(false);
              setTimeout((): void => {
                setRenderOverlay(false);
              }, 300);
            }}
            open={overlayIsVisible}
          />
        )}

        {!renderOverlay && (
          <RenderChat
            continuous={Boolean(appContext.state.settings.continuousListening)}
          />
        )}
      </RoomLayout>
    </>
  );
};

export default Page;

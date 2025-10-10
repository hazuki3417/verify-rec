import { Providers } from "./../src/components/Providers";
import { Styles } from "./../src/styles";

export const decorators = [
  (renderStory: any) => {
    let portal = document.getElementById("portal");
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "portal";
      document.body.appendChild(portal);
    }
    return (
      <>
        <Styles />
        <Providers>{renderStory()}</Providers>
        <div id="portal"></div>
      </>
    );
  },
];

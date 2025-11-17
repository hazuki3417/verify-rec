import React, { useCallback } from "react";
import { SiteMap } from "@/components/SiteMap/SiteMap";
import { useBlocker, type BlockerFunction } from "react-router";
import { Button, Portal } from "@/components";
import { Modal } from "@/components/Modal";
import { ActionPanel } from "@/components/ActionPanel";
import { Overlay } from "@/components/Overlay";

export default function Page1() {
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname,
    [],
  );

  const blocker = useBlocker(shouldBlock);

  return (
    <div>
      <div>page1</div>
      <SiteMap />
      <Portal>
        {blocker.state === "blocked" && (
          <Portal.ModalContainer>
            <Overlay />
            <Modal>
              <Modal.CloseButton onClick={blocker.reset} />
              <Modal.Header>title</Modal.Header>
              <Modal.Body>画面遷移検知</Modal.Body>
              <Modal.Divider />
              <Modal.Footer>
                <ActionPanel>
                  <ActionPanel.Left>
                    <Button onClick={blocker.proceed}>ok</Button>
                  </ActionPanel.Left>
                  <ActionPanel.Center></ActionPanel.Center>
                  <ActionPanel.Right>
                    <Button onClick={blocker.reset}>cancel</Button>
                  </ActionPanel.Right>
                </ActionPanel>
              </Modal.Footer>
            </Modal>
          </Portal.ModalContainer>
        )}
      </Portal>
    </div>
  );
}

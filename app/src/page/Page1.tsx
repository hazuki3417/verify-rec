import React from "react";
import { SiteMap } from "@/components/SiteMap/SiteMap";
import { Button, Portal } from "@/components";
import { Modal } from "@/components/Modal";
import { ActionPanel } from "@/components/ActionPanel";
import { Overlay } from "@/components/Overlay";
import { useNavigationGuard } from "@/hooks/useNavigationGuard";

export default function Page1() {
  const navigationGuard = useNavigationGuard();

  return (
    <div>
      <div>page1</div>
      <SiteMap />
      <Portal>
        {navigationGuard.value.state === "blocked" && (
          <Portal.ModalContainer>
            <Overlay />
            <Modal>
              <Modal.CloseButton onClick={navigationGuard.controls.cancel} />
              <Modal.Header>画面遷移を検知</Modal.Header>
              <Modal.Body>画面遷移します。よろしいですか？</Modal.Body>
              <Modal.Divider />
              <Modal.Footer>
                <ActionPanel>
                  <ActionPanel.Left>
                    <Button onClick={navigationGuard.controls.ok}>ok</Button>
                  </ActionPanel.Left>
                  <ActionPanel.Center></ActionPanel.Center>
                  <ActionPanel.Right>
                    <Button onClick={navigationGuard.controls.cancel}>
                      cancel
                    </Button>
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

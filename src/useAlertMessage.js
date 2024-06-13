import { useState } from "react";

export function useAlertMessage() {
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    type: null,
  });

  function handleOpenMessage(messageData) {
    setAlertMessage({
      message: messageData.message,
      type: messageData.type,
    });
    setAlertMessageOpen(true);
  }

  const props = {
    isOpen: alertMessageOpen,
    messageData: alertMessage,
    openMessage: handleOpenMessage,
    setIsOpen: setAlertMessageOpen,
  };

  return props;
}

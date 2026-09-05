/* Ailis — commande du bouton ruban Outlook */

let dialog = null;

Office.onReady(function () {
  // Requis : enregistre la fonction appelable par le manifeste.
  if (Office.actions && Office.actions.associate) {
    Office.actions.associate("showBravo", showBravo);
  }
});

function showBravo(event) {
  const url = window.location.href.replace(/commands\.html.*$/, "dialog.html");

  Office.context.ui.displayDialogAsync(
    url,
    { height: 40, width: 30, displayInIframe: true },
    function (result) {
      if (result.status !== Office.AsyncResultStatus.Succeeded) {
        // Repli : si la boîte de dialogue est bloquée, on affiche une notification.
        notify(event, "Bravo !");
        return;
      }
      dialog = result.value;
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, function () {
        dialog.close();
        event.completed();
      });
      dialog.addEventHandler(Office.EventType.DialogEventReceived, function () {
        event.completed();
      });
    }
  );
}

function notify(event, message) {
  Office.context.mailbox.item.notificationMessages.replaceAsync("ailisBravo", {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: message,
    icon: "icon16",
    persistent: false
  });
  event.completed();
}

// Compatibilité Outlook classique (chargement hors Office.onReady).
if (typeof Office !== "undefined") {
  Office.initialize = function () {};
}

// Exposition globale, requise par certaines versions d'Outlook Win32.
window.showBravo = showBravo;

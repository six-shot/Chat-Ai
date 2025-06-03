"use client";


import "./globals.css";

import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";


  function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [hasUserInstalled, setHasUserInstalled] = useState(false);

    useEffect(() => {
      // Check if user has previously installed
      const installed = localStorage.getItem("appInstalled") === "true";
      setHasUserInstalled(installed);

      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window)
      );

      // Check if app is in standalone mode
      const standalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      setIsStandalone(standalone);

      // If app is in standalone mode, mark as installed
      if (standalone) {
        localStorage.setItem("appInstalled", "true");
        setHasUserInstalled(true);
      }
    }, []);

    // Don't show install button if already installed or previously dismissed
    if (isStandalone || hasUserInstalled) {
      return null;
    }

    return (
      <div>
        <Marquee>
          {isIOS && (
            <p className="font-[family-name:var(--font-manrope)] bg-[#034239] text-white">
              To install this app on your iOS device, tap the share button
              <span role="img" aria-label="share icon">
                {" "}
                ⎋{" "}
              </span>
              and then &quot;Add to Home Screen&quot;
              <span role="img" aria-label="plus icon">
                {" "}
                ➕{" "}
              </span>
              .
            </p>
          )}
        </Marquee>
      </div>
    );
  }

  // function PushNotificationManager() {
  //   const [isSupported, setIsSupported] = useState(false);
  //   const [subscription, setSubscription] = useState<PushSubscription | null>(
  //     null
  //   );
  //   const [message, setMessage] = useState("");

  //   useEffect(() => {
  //     if ("serviceWorker" in navigator && "PushManager" in window) {
  //       setIsSupported(true);
  //       registerServiceWorker();
  //     }
  //   }, []);

  //   async function registerServiceWorker() {
  //     const registration = await navigator.serviceWorker.register("/sw.js", {
  //       scope: "/",
  //       updateViaCache: "none",
  //     });
  //     const sub = await registration.pushManager.getSubscription();
  //     setSubscription(sub);
  //   }

  //   /* eslint-disable @typescript-eslint/no-unused-vars */
  //   async function subscribeToPush() {
  //     const registration = await navigator.serviceWorker.ready;
  //     const sub = await registration.pushManager.subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: urlBase64ToUint8Array(
  //         process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
  //       ),
  //     });
  //     setSubscription(sub);
  //     const serializedSub = JSON.parse(JSON.stringify(sub));
  //     await subscribeUser(serializedSub);
  //   }

  //   async function unsubscribeFromPush() {
  //     await subscription?.unsubscribe();
  //     setSubscription(null);
  //     await unsubscribeUser();
  //   }

  //   async function sendTestNotification() {
  //     if (subscription) {
  //       await sendNotification(message);
  //       setMessage("");
  //     }
  //   }
  //   /* eslint-enable @typescript-eslint/no-unused-vars */

  //   if (!isSupported) {
  //     return <p>Push notifications are not supported in this browser.</p>;
  //   }

  //   return (
  //     <div>
  //       <h3>Push Notifications</h3>
  //     {subscription ? (
  //       <>
  //         <p>You are subscribed to push notifications.</p>
  //         <button onClick={unsubscribeFromPush}>Unsubscribe</button>
  //         <input
  //           type="text"
  //           placeholder="Enter notification message"
  //           value={message}
  //           onChange={(e) => setMessage(e.target.value)}
  //         />
  //         <button onClick={sendTestNotification}>Send Test</button>
  //       </>
  //     ) : (
  //       <>
  //         <p>You are not subscribed to push notifications.</p>
  //         <button onClick={subscribeToPush}>Subscribe</button>
  //       </>
  //     )}
  //     </div>
  //   );
  // }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    useEffect(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
      }
    }, []);
  return (
    
    <html lang="en">
      <body className={` antialiased`}>
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage } from "./kc.gen";

// 取消注释以下代码块来测试特定页面
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "login.ftl",
        overrides: {
            realm: {
                loginWithEmailAllowed: true,
                registrationAllowed: true,
                resetPasswordAllowed: true,
                rememberMeDisabled: false
            },
            social: {
                providers: [
                    {
                        alias: "google",
                        providerId: "google",
                        displayName: "Google",
                        loginUrl: "#"
                    },
                    {
                        alias: "github", 
                        providerId: "github",
                        displayName: "GitHub",
                        loginUrl: "#"
                    }
                ]
            }
        }
    });
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {!window.kcContext ? (
            <h1>No Keycloak Context</h1>
        ) : (
            <KcPage kcContext={window.kcContext} />
        )}
    </StrictMode>
);
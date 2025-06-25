import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/login";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/useGetClassName";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        showAnotherWayIfPresent = true,
        displayWide = false,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        doUseDefaultCss,
        "templatingStrategy": "multipass",
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    if (!isReady) {
        return null;
    }

    return (
        <div className={getClassName("kcLoginClass")}>
            <div id="kc-header" className={getClassName("kcHeaderClass")}>
                <div id="kc-header-wrapper" className={getClassName("kcHeaderWrapperClass")}>
                    {msg("loginTitleHtml", realm.displayNameHtml)}
                </div>
            </div>

            <div className={getClassName("kcFormCardClass")}>
                <div id="kc-content">
                    <div id="kc-content-wrapper">
                        {/* Messages */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div className={clsx("alert", `alert-${message.type}`)}>
                                {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                <span
                                    className="kc-feedback-text"
                                    dangerouslySetInnerHTML={{
                                        __html: message.summary
                                    }}
                                />
                            </div>
                        )}

                        {/* Header */}
                        {headerNode && (
                            <div id="kc-page-title" className={getClassName("kcContentTitleClass")}>
                                {headerNode}
                            </div>
                        )}

                        {/* Username */}
                        {showUsernameNode && (
                            <div id="kc-username" className={getClassName("kcFormGroupClass")}>
                                <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                <a id="reset-login" href={url.loginRestartFlowUrl}>
                                    <div className="kc-login-tooltip">
                                        <i className={getClassName("kcResetFlowIcon")}></i>
                                        <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                    </div>
                                </a>
                            </div>
                        )}

                        {/* Form */}
                        <div id="kc-form">
                            <div id="kc-form-wrapper">
                                {children}
                            </div>
                        </div>

                        {/* Info */}
                        {displayInfo && (
                            <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                    {infoNode}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Language selector */}
            {realm.internationalizationEnabled && (locale?.supported?.length ?? 0) > 1 && (
                <div id="kc-locale">
                    <div id="kc-locale-wrapper" className={getClassName("kcLocaleWrapperClass")}>
                        <div className="kc-dropdown" id="kc-locale-dropdown">
                            <a href="#" id="kc-current-locale-link">
                                {labelBySupportedLanguageTag[currentLanguageTag]}
                            </a>
                            <ul>
                                {locale?.supported?.map(({ languageTag }) => (
                                    <li key={languageTag} className="kc-dropdown-item">
                                        <a href="#" onClick={() => changeLocale(languageTag)}>
                                            {labelBySupportedLanguageTag[languageTag]}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
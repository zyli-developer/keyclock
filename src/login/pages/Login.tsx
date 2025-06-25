import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        auth,
        registrationDisabled,
        rememberMeDisabled,
        messagesPerField
    } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("doLogIn")}
            formNode={
                <div className="login-container">
                    <div className="login-card">
                        {/* Logo */}
                        <div className="login-logo">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect width="48" height="48" rx="12" fill="#2563EB"/>
                                <path d="M24 12L32 20H28V32H20V20H16L24 12Z" fill="white"/>
                            </svg>
                        </div>

                        {/* Title */}
                        <div className="login-header">
                            <h1 className="login-title">欢迎回来</h1>
                            <p className="login-subtitle">请登录您的账户</p>
                        </div>

                        {/* Login Form */}
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className="login-form"
                        >
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                        ? msg("usernameOrEmail")
                                        : msg("email")}
                                </label>
                                <input
                                    tabIndex={1}
                                    id="username"
                                    className={`form-input ${messagesPerField.existsError("username", "password") ? "error" : ""}`}
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus={true}
                                    autoComplete="off"
                                    placeholder={
                                        !realm.loginWithEmailAllowed
                                            ? msgStr("username")
                                            : !realm.registrationEmailAsUsername
                                            ? msgStr("usernameOrEmail")
                                            : msgStr("email")
                                    }
                                />
                                {messagesPerField.existsError("username") && (
                                    <span className="error-message">
                                        {messagesPerField.get("username")}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    {msg("password")}
                                </label>
                                <div className="password-input-container">
                                    <input
                                        tabIndex={2}
                                        id="password"
                                        className={`form-input ${messagesPerField.existsError("username", "password") ? "error" : ""}`}
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="off"
                                        placeholder={msgStr("password")}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                                <line x1="1" y1="1" x2="23" y2="23"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {messagesPerField.existsError("password") && (
                                    <span className="error-message">
                                        {messagesPerField.get("password")}
                                    </span>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="form-options">
                                {!rememberMeDisabled && (
                                    <div className="checkbox-group">
                                        <input
                                            tabIndex={3}
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            className="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                        />
                                        <label htmlFor="rememberMe" className="checkbox-label">
                                            {msg("rememberMe")}
                                        </label>
                                    </div>
                                )}
                                {realm.resetPasswordAllowed && (
                                    <a
                                        tabIndex={5}
                                        href={url.loginResetCredentialsUrl}
                                        className="forgot-password-link"
                                    >
                                        {msg("doForgotPassword")}
                                    </a>
                                )}
                            </div>

                            {/* Login Button */}
                            <input
                                type="hidden"
                                id="id-hidden-input"
                                name="credentialId"
                                value={auth?.selectedCredential}
                            />
                            <button
                                tabIndex={4}
                                className="login-button"
                                name="login"
                                id="kc-login"
                                type="submit"
                                disabled={isLoginButtonDisabled}
                            >
                                {isLoginButtonDisabled ? (
                                    <div className="loading-spinner">
                                        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        登录中...
                                    </div>
                                ) : (
                                    msg("doLogIn")
                                )}
                            </button>
                        </form>

                        {/* Social Login */}
                        {realm.password && social.providers && (
                            <div className="social-login">
                                <div className="divider">
                                    <span className="divider-text">或者使用</span>
                                </div>
                                <div className="social-providers">
                                    {social.providers.map(p => (
                                        <a
                                            key={p.alias}
                                            id={`social-${p.alias}`}
                                            className="social-button"
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            <span className="social-icon">
                                                {p.providerId === "google" && (
                                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                    </svg>
                                                )}
                                                {p.providerId === "github" && (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
                                                )}
                                            </span>
                                            {p.displayName}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Register Link */}
                        {realm.password && realm.registrationAllowed && !registrationDisabled && (
                            <div className="register-link">
                                <span>还没有账户？</span>
                                <a tabIndex={6} href={url.registrationUrl} className="register-link-text">
                                    立即注册
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            }
        />
    );
}
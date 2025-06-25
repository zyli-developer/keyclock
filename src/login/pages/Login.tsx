import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
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
    const [activeTab, setActiveTab] = useState("phone"); // phone, account, sso
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={null}
            formNode={
                <div className="synnovator-login-container">
                    {/* Left Side - Decorative */}
                    <div className="login-left-panel">
                        <div className="brand-logos">
                            <div className="logo-item">
                                <img src="/api/placeholder/60/60" alt="数字创新挑战赛 2025" className="challenge-logo" />
                                <span className="logo-text">数字创新挑战赛<br />2025</span>
                            </div>
                            <div className="logo-item">
                                <img src="/api/placeholder/60/60" alt="SynNovator" className="synnovator-logo" />
                                <span className="logo-text">协同创新者<br />SynNovator</span>
                            </div>
                        </div>
                        
                        <div className="decorative-graphic">
                            <svg viewBox="0 0 400 600" className="flowing-lines">
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#A855F7" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M50 100 Q 150 50, 250 100 T 350 150 Q 300 200, 200 250 T 100 300 Q 150 350, 250 400 T 350 450"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="3"
                                    fill="none"
                                    className="animated-path"
                                />
                                <circle cx="350" cy="450" r="8" fill="#8B5CF6" className="end-dot" />
                            </svg>
                            
                            {/* Floating shapes */}
                            <div className="floating-shapes">
                                <div className="shape shape-1"></div>
                                <div className="shape shape-2"></div>
                                <div className="shape shape-3"></div>
                                <div className="shape shape-4"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="login-right-panel">
                        <div className="login-form-container">
                            {/* Header */}
                            <div className="login-header">
                                <h1 className="login-title">
                                    登录到 <span className="brand-highlight">SynNovator</span>
                                </h1>
                                <div className="search-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="m21 21-4.35-4.35"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Tab Navigation */}
                            <div className="login-tabs">
                                <button
                                    type="button"
                                    className={`tab-button ${activeTab === "phone" ? "active" : ""}`}
                                    onClick={() => setActiveTab("phone")}
                                >
                                    验证码登录
                                </button>
                                <button
                                    type="button"
                                    className={`tab-button ${activeTab === "account" ? "active" : ""}`}
                                    onClick={() => setActiveTab("account")}
                                >
                                    账号登录
                                </button>
                                <button
                                    type="button"
                                    className={`tab-button ${activeTab === "sso" ? "active" : ""}`}
                                    onClick={() => setActiveTab("sso")}
                                >
                                    SSO登录
                                </button>
                            </div>

                            {/* Phone Login Form */}
                            {activeTab === "phone" && (
                                <form className="login-form phone-login-form">
                                    <div className="form-group">
                                        <label className="form-label">手机号</label>
                                        <div className="phone-input-group">
                                            <select className="country-code">
                                                <option value="+86">+86</option>
                                            </select>
                                            <input
                                                type="tel"
                                                className="form-input phone-input"
                                                placeholder="请输入手机号"
                                            />
                                        </div>
                                        <span className="input-hint">请输入有效手机号</span>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">短信验证码</label>
                                        <div className="verification-input-group">
                                            <input
                                                type="text"
                                                className="form-input verification-input"
                                                placeholder="请输入6位短信验证码"
                                                maxLength={6}
                                            />
                                            <button type="button" className="send-code-btn">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="m22 2-7 20-4-9-9-4Z"/>
                                                    <path d="M22 2 11 13"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <span className="input-hint">请输入短信验证码</span>
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-group">
                                            <input type="checkbox" className="agreement-checkbox" />
                                            <span className="checkbox-text">
                                                勾选即代表您已阅读并同意相关的 <a href="#" className="link">用户协议</a> 及 <a href="#" className="link">隐私政策</a>，未注册的手机号将自动注册
                                            </span>
                                        </label>
                                    </div>

                                    <button type="submit" className="login-submit-btn">
                                        主题
                                    </button>
                                </form>
                            )}

                            {/* Account Login Form */}
                            {activeTab === "account" && (
                                <form
                                    id="kc-form-login"
                                    onSubmit={() => {
                                        setIsLoginButtonDisabled(true);
                                        return true;
                                    }}
                                    action={url.loginAction}
                                    method="post"
                                    className="login-form account-login-form"
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

                                    <div className="form-options">
                                        {!rememberMeDisabled && (
                                            <label className="checkbox-group">
                                                <input
                                                    tabIndex={3}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    className="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />
                                                <span className="checkbox-text">{msg("rememberMe")}</span>
                                            </label>
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

                                    <input
                                        type="hidden"
                                        id="id-hidden-input"
                                        name="credentialId"
                                        value={auth?.selectedCredential}
                                    />
                                    <button
                                        tabIndex={4}
                                        className="login-submit-btn"
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
                            )}

                            {/* SSO Login Form */}
                            {activeTab === "sso" && (
                                <div className="login-form sso-login-form">
                                    {realm.password && social.providers && (
                                        <div className="social-providers">
                                            {social.providers.map(p => (
                                                <a
                                                    key={p.alias}
                                                    id={`social-${p.alias}`}
                                                    className="social-button"
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
                                                    使用 {p.displayName} 登录
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        />
    );
}
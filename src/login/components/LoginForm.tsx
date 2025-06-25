import { useState, useEffect } from "react";
import type { KcContext } from "../KcContext";
import OptimizedTabs from "./OptimizedTabs";

interface LoginFormProps {
  onSubmit: (data: any) => void;
  onSendOTP: (phoneOrEmail: string) => Promise<boolean>;
  loading?: boolean;
  error?: string;
  kcContext: KcContext;
}

// 输入框组件
const FormInput = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  prefix,
  suffix,
  className = ""
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
}) => (
  <div className="space-y-2">
    <label className="block text-[#1a1a1a] text-[16px] font-medium">
      {label}
      {required && <span className="text-[#EF4444] ml-1">*</span>}
    </label>
    <div className="relative">
      <div className={`flex items-center bg-white border-2 rounded-xl px-4 h-14 text-[16px] transition-all duration-200 focus-within:border-[#A7BEFF] focus-within:shadow-lg focus-within:shadow-[#A7BEFF]/10 hover:border-[#CBD5E1] ${error ? 'border-[#EF4444]' : 'border-[#E2E8F0]'} ${className}`}>
        {prefix && <div className="mr-3">{prefix}</div>}
        <input
          className="flex-1 bg-transparent outline-none text-[#1a1a1a] placeholder-[#94A3B8] text-[16px]"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
        {suffix && <div className="ml-2">{suffix}</div>}
      </div>
      {error && (
        <div className="text-[#EF4444] text-[14px] mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  </div>
);

// 按钮组件
const Button = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  size = "default",
  disabled = false, 
  loading = false, 
  onClick,
  className = ""
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2";
  
  const sizeClasses = {
    small: "px-4 h-10 text-[14px]",
    default: "px-6 h-14 text-[16px]",
    large: "px-8 h-16 text-[18px]"
  };

  const variantClasses = {
    primary: disabled || loading
      ? "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
      : "bg-gradient-to-r from-[#A7BEFF] to-[#8B5CF6] hover:from-[#9333EA] hover:to-[#7C3AED] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-[#F8FAFC] text-[#64748B] border-2 border-[#E2E8F0] hover:bg-white hover:text-[#475569] hover:border-[#CBD5E1]",
    outline: "bg-transparent text-[#A7BEFF] border-2 border-[#A7BEFF] hover:bg-[#A7BEFF] hover:text-white"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {loading && (
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default function LoginForm({ onSubmit, onSendOTP, loading = false, error = "", kcContext }: LoginFormProps) {
  const [activeTab, setActiveTab] = useState("sms");
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    smsCode: "",
    password: "",
    agreed: false,
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendingOTP, setSendingOTP] = useState(false);

  // 倒计时效果
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 输入类型识别
  const detectInputType = (value: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (phoneRegex.test(value)) return "phone";
    if (emailRegex.test(value)) return "email";
    return "unknown";
  };

  // 表单验证
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (activeTab === "sms") {
      const inputType = detectInputType(formData.phone);
      if (!formData.phone) {
        newErrors.phone = "请输入手机号或邮箱";
      } else if (inputType === "unknown") {
        newErrors.phone = "请输入有效的手机号或邮箱格式";
      }
      
      if (!formData.smsCode) {
        newErrors.smsCode = "请输入验证码";
      } else if (formData.smsCode.length !== 6) {
        newErrors.smsCode = "验证码应为6位数字";
      }
    } else {
      const inputType = detectInputType(formData.email);
      if (!formData.email) {
        newErrors.email = "请输入账号";
      } else if (inputType === "unknown") {
        newErrors.email = "请输入有效的手机号或邮箱格式";
      }
      
      if (!formData.password) {
        newErrors.password = "请输入密码";
      } else if (formData.password.length < 6) {
        newErrors.password = "密码至少6位字符";
      }
    }

    if (!formData.agreed) {
      newErrors.agreed = "请同意用户协议和隐私政策";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 发送验证码
  const handleSendCode = async () => {
    const inputType = detectInputType(formData.phone);
    if (inputType !== "unknown" && countdown === 0) {
      setSendingOTP(true);
      try {
        await onSendOTP(formData.phone);
        setCountdown(60);
        console.log("验证码发送成功");
      } catch (error) {
        console.error("发送验证码失败:", error);
        setErrors(prev => ({ ...prev, phone: "发送验证码失败，请重试" }));
      } finally {
        setSendingOTP(false);
      }
    }
  };

  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        type: activeTab,
        ...formData
      });
    }
  };

  // 更新表单数据
  const updateFormData = (key: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // 清除对应字段的错误
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const tabItems = [
    { key: "sms", label: "验证码登录" },
    { key: "account", label: "账号登录" }
  ];

  const canSendCode = formData.phone && detectInputType(formData.phone) !== "unknown" && countdown === 0 && !sendingOTP;
  const canSubmit = activeTab === "sms" 
    ? formData.phone && formData.smsCode && formData.agreed
    : formData.email && formData.password && formData.agreed;

  return (
    <div className="w-full max-w-[480px] space-y-8">
      {/* 页面标题 */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-[28px] font-semibold text-[#1a1a1a] leading-tight">
            登录到
          </h1>
          <div className="relative">
            <div className="bg-gradient-to-r from-[#A7BEFF] to-[#8B5CF6] rounded-2xl px-6 py-2 shadow-lg">
              <span className="text-[28px] font-semibold text-white">SynNovator</span>
            </div>
            <div className="absolute -top-1 -right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 flex items-center space-x-3">
          <svg className="w-5 h-5 text-[#EF4444] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-[#EF4444] text-[14px] font-medium">{error}</span>
        </div>
      )}

      {/* 优化后的登录方式切换 */}
      <OptimizedTabs 
        items={tabItems}
        activeKey={activeTab}
        onChange={setActiveTab}
        variant="default"
        size="default"
        className="w-full"
      />

      {/* 登录表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === "sms" ? (
          // 验证码登录表单
          <>
            <FormInput
              label="手机号/邮箱"
              placeholder="请输入手机号或邮箱"
              value={formData.phone}
              onChange={(value) => updateFormData("phone", value)}
              error={errors.phone}
              required
              prefix={
                <div className="flex items-center text-[#64748B] border-r border-[#E2E8F0] pr-3">
                  <span className="text-[16px] font-medium">+86</span>
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              }
            />

            <div className="space-y-2">
              <label className="block text-[#1a1a1a] text-[16px] font-medium">
                短信验证码 <span className="text-[#EF4444] ml-1">*</span>
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <FormInput
                    label=""
                    placeholder="请输入6位验证码"
                    value={formData.smsCode}
                    onChange={(value) => updateFormData("smsCode", value.replace(/\D/g, '').slice(0, 6))}
                    error={errors.smsCode}
                    className="mb-0"
                  />
                </div>
                <Button
                  variant="outline"
                  size="default"
                  disabled={!canSendCode}
                  loading={sendingOTP}
                  onClick={handleSendCode}
                  className="whitespace-nowrap"
                >
                  {sendingOTP ? "发送中..." : countdown > 0 ? `${countdown}s` : "发送验证码"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          // 账号登录表单
          <>
            <FormInput
              label="账号"
              placeholder="请输入手机号或邮箱"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              error={errors.email}
              required
            />

            <FormInput
              label="密码"
              type={showPassword ? "text" : "password"}
              placeholder="请输入密码"
              value={formData.password}
              onChange={(value) => updateFormData("password", value)}
              error={errors.password}
              required
              suffix={
                <button 
                  type="button" 
                  className="text-[#64748B] hover:text-[#475569] transition-colors p-1" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              }
            />

            {/* 记住我选项 */}
            {!kcContext.realm.rememberMeDisabled && (
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => updateFormData("rememberMe", e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-[#CBD5E1] accent-[#A7BEFF] focus:ring-2 focus:ring-[#A7BEFF]/20 transition-all duration-200"
                />
                <span className="text-[14px] text-[#475569]">记住我</span>
              </div>
            )}
          </>
        )}

        {/* 用户协议 */}
        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.agreed}
              onChange={(e) => updateFormData("agreed", e.target.checked)}
              className="w-5 h-5 rounded border-2 border-[#CBD5E1] mt-0.5 accent-[#A7BEFF] focus:ring-2 focus:ring-[#A7BEFF]/20 transition-all duration-200"
            />
            <span className="text-[14px] text-[#475569] leading-relaxed">
              勾选即代表您已阅读并同意我们的
              <a href="#" className="text-[#A7BEFF] hover:text-[#8B5CF6] underline mx-1 font-medium transition-colors">用户协议</a>
              与
              <a href="#" className="text-[#A7BEFF] hover:text-[#8B5CF6] underline mx-1 font-medium transition-colors">隐私政策</a>
              {activeTab === "sms" && "，未注册的手机号将自动注册"}
            </span>
          </div>
          {errors.agreed && (
            <div className="text-[#EF4444] text-[14px] flex items-center ml-8">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.agreed}
            </div>
          )}
        </div>

        {/* 登录按钮 */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={!canSubmit}
            loading={loading}
            className="w-full"
          >
            {loading ? "登录中..." : "登录"}
          </Button>
        </div>

        {/* 忘记密码链接 */}
        {activeTab === "account" && kcContext.realm.resetPasswordAllowed && (
          <div className="text-center">
            <a
              href={kcContext.url.loginResetCredentialsUrl}
              className="text-[#A7BEFF] hover:text-[#8B5CF6] text-[14px] font-medium transition-colors"
            >
              忘记密码？
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
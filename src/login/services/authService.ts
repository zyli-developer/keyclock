import type { KcContext } from "../KcContext";

/**
 * 认证服务类
 * 处理与 Keycloak 的认证交互
 */
export class AuthService {
  private kcContext: KcContext;

  constructor(kcContext: KcContext) {
    this.kcContext = kcContext;
  }

  /**
   * 验证码登录
   * @param phoneOrEmail 手机号或邮箱
   * @param otp 验证码
   */
  async loginWithOTP(phoneOrEmail: string, otp: string): Promise<void> {
    return this.submitLoginForm({
      username: phoneOrEmail,
      otp: otp,
      loginType: 'otp'
    });
  }

  /**
   * 账号密码登录
   * @param username 用户名（手机号或邮箱）
   * @param password 密码
   * @param rememberMe 是否记住我
   */
  async loginWithCredentials(username: string, password: string, rememberMe: boolean = false): Promise<void> {
    return this.submitLoginForm({
      username: username,
      password: password,
      rememberMe: rememberMe ? 'on' : undefined,
      loginType: 'credentials'
    });
  }

  /**
   * 发送验证码
   * @param phoneOrEmail 手机号或邮箱
   */
  async sendOTP(phoneOrEmail: string): Promise<boolean> {
    try {
      // 构建发送验证码的请求
      const response = await fetch(`${this.kcContext.url.loginAction}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneOrEmail,
          realm: this.kcContext.realm.name,
          clientId: this.kcContext.client?.clientId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.error('发送验证码失败:', error);
      throw new Error('发送验证码失败，请重试');
    }
  }

  /**
   * 提交登录表单到 Keycloak
   * @param formData 表单数据
   */
  private async submitLoginForm(formData: Record<string, string | undefined>): Promise<void> {
    // 创建隐藏表单
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = this.kcContext.url.loginAction;
    form.style.display = 'none';

    // 添加表单字段
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    });

    // 添加 credentialId（如果存在）
    if (this.kcContext.auth?.selectedCredential) {
      const credentialInput = document.createElement('input');
      credentialInput.type = 'hidden';
      credentialInput.name = 'credentialId';
      credentialInput.value = this.kcContext.auth.selectedCredential;
      form.appendChild(credentialInput);
    }

    // 提交表单
    document.body.appendChild(form);
    form.submit();
  }

  /**
   * 验证输入格式
   * @param input 输入值
   * @returns 输入类型：'phone' | 'email' | 'unknown'
   */
  static validateInputType(input: string): 'phone' | 'email' | 'unknown' {
    const phoneRegex = /^1[3-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (phoneRegex.test(input)) return 'phone';
    if (emailRegex.test(input)) return 'email';
    return 'unknown';
  }

  /**
   * 格式化错误消息
   * @param error 错误对象
   * @returns 用户友好的错误消息
   */
  static formatErrorMessage(error: any): string {
    if (typeof error === 'string') return error;
    
    if (error?.message) {
      // 根据错误类型返回中文提示
      const errorMap: Record<string, string> = {
        'Invalid credentials': '用户名或密码错误',
        'Account disabled': '账号已被禁用',
        'Account locked': '账号已被锁定',
        'Invalid OTP': '验证码错误或已过期',
        'OTP expired': '验证码已过期，请重新获取',
        'User not found': '用户不存在',
        'Network error': '网络连接失败，请检查网络设置'
      };
      
      return errorMap[error.message] || '登录失败，请重试';
    }
    
    return '登录失败，请重试';
  }
}

/**
 * 创建认证服务实例
 * @param kcContext Keycloak 上下文
 * @returns AuthService 实例
 */
export function createAuthService(kcContext: KcContext): AuthService {
  return new AuthService(kcContext);
}
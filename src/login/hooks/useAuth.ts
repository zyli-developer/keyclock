import { useState, useCallback } from 'react';
import { AuthService, createAuthService } from '../services/authService';
import type { KcContext } from '../KcContext';

interface UseAuthOptions {
  kcContext: KcContext;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface UseAuthReturn {
  loading: boolean;
  error: string;
  loginWithOTP: (phoneOrEmail: string, otp: string) => Promise<void>;
  loginWithCredentials: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
  sendOTP: (phoneOrEmail: string) => Promise<boolean>;
  clearError: () => void;
}

/**
 * 认证相关的 Hook
 * 提供登录、发送验证码等功能
 */
export function useAuth({ kcContext, onSuccess, onError }: UseAuthOptions): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const authService = createAuthService(kcContext);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const handleError = useCallback((err: any) => {
    const errorMessage = AuthService.formatErrorMessage(err);
    setError(errorMessage);
    onError?.(errorMessage);
  }, [onError]);

  const loginWithOTP = useCallback(async (phoneOrEmail: string, otp: string) => {
    setLoading(true);
    setError('');
    
    try {
      // 验证输入格式
      const inputType = AuthService.validateInputType(phoneOrEmail);
      if (inputType === 'unknown') {
        throw new Error('请输入有效的手机号或邮箱格式');
      }

      // 验证码格式检查
      if (!/^\d{6}$/.test(otp)) {
        throw new Error('验证码应为6位数字');
      }

      await authService.loginWithOTP(phoneOrEmail, otp);
      onSuccess?.();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [authService, onSuccess, handleError]);

  const loginWithCredentials = useCallback(async (username: string, password: string, rememberMe: boolean = false) => {
    setLoading(true);
    setError('');
    
    try {
      // 验证输入格式
      const inputType = AuthService.validateInputType(username);
      if (inputType === 'unknown') {
        throw new Error('请输入有效的手机号或邮箱格式');
      }

      // 密码长度检查
      if (password.length < 6) {
        throw new Error('密码至少6位字符');
      }

      await authService.loginWithCredentials(username, password, rememberMe);
      onSuccess?.();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [authService, onSuccess, handleError]);

  const sendOTP = useCallback(async (phoneOrEmail: string): Promise<boolean> => {
    try {
      // 验证输入格式
      const inputType = AuthService.validateInputType(phoneOrEmail);
      if (inputType === 'unknown') {
        throw new Error('请输入有效的手机号或邮箱格式');
      }

      const success = await authService.sendOTP(phoneOrEmail);
      if (!success) {
        throw new Error('发送验证码失败');
      }
      
      return true;
    } catch (err) {
      handleError(err);
      return false;
    }
  }, [authService, handleError]);

  return {
    loading,
    error,
    loginWithOTP,
    loginWithCredentials,
    sendOTP,
    clearError
  };
}
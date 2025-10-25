import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await forgotPassword(data.email);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Check Your Email</h2>
        <p className="text-gray-600">
          We've sent password reset instructions to your email address.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Reset Instructions'}
      </Button>

      <div className="text-center text-sm">
        Remember your password?{' '}
        <a href="/login" className="text-primary hover:underline">
          Back to Login
        </a>
      </div>
    </form>
  );
} 
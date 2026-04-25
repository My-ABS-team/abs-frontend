import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Phone, User, Lock } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { RegisterStep1 } from '@/types/auth.types'

const schema = z.object({
  fullName: z.string().min(3, 'Enter your legal name (min 3 characters)'),
  email:    z.string().email('Enter a valid email address'),
  phone:    z
    .string()
    .regex(/^(0|234|\+234)[7-9][01]\d{8}$/, 'Enter a valid Nigerian phone number'),
  password: z
    .string()
    .min(8, 'Minimum 8 characters')
    .regex(/[A-Z]/, 'Include at least one uppercase letter')
    .regex(/[0-9]/, 'Include at least one number'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  path:    ['confirmPassword'],
  message: 'Passwords do not match',
})

interface Step1Props {
  onNext: (data: RegisterStep1) => void
  isLoading: boolean
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-label text-market-down mt-1">{message}</p>
}

function InputIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
  )
}

export function Step1Credentials({ onNext, isLoading }: Step1Props) {
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterStep1>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">

      {/* Full name */}
      <div>
        <label className="label">Full Name</label>
        <div className="relative">
          <InputIcon icon={User} />
          <input
            {...register('fullName')}
            placeholder="Enter your legal name"
            className={cn('input pl-9', errors.fullName && 'border-market-down')}
          />
        </div>
        <FieldError message={errors.fullName?.message} />
      </div>

      {/* Email */}
      <div>
        <label className="label">Email Address</label>
        <div className="relative">
          <InputIcon icon={Mail} />
          <input
            {...register('email')}
            type="email"
            placeholder="name@example.com"
            className={cn('input pl-9', errors.email && 'border-market-down')}
          />
        </div>
        <FieldError message={errors.email?.message} />
      </div>

      {/* Phone */}
      <div>
        <label className="label">Phone Number</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 bg-navy-800 border border-r-0 border-navy-700 rounded-l-chip text-navy-300 text-sm">
            +234
          </span>
          <div className="relative flex-1">
            <InputIcon icon={Phone} />
            <input
              {...register('phone')}
              type="tel"
              placeholder="800 000 0000"
              className={cn('input pl-9 rounded-l-none', errors.phone && 'border-market-down')}
            />
          </div>
        </div>
        <FieldError message={errors.phone?.message} />
      </div>

      {/* Password */}
      <div>
        <label className="label">Password</label>
        <div className="relative">
          <InputIcon icon={Lock} />
          <input
            {...register('password')}
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            className={cn('input pl-9 pr-10', errors.password && 'border-market-down')}
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white"
          >
            {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <FieldError message={errors.password?.message} />
      </div>

      {/* Confirm password */}
      <div>
        <label className="label">Confirm Password</label>
        <div className="relative">
          <InputIcon icon={Lock} />
          <input
            {...register('confirmPassword')}
            type={showConfirm ? 'text' : 'password'}
            placeholder="••••••••"
            className={cn('input pl-9 pr-10', errors.confirmPassword && 'border-market-down')}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white"
          >
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <FieldError message={errors.confirmPassword?.message} />
      </div>

      <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 mt-2">
        {isLoading ? 'Creating account…' : 'Continue'}
      </button>
    </form>
  )
}

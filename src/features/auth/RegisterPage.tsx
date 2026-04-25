import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Step1Credentials } from './components/Step1Credentials'
import { Step2AccountType  } from './components/Step2AccountType'
import { useAuthStore }      from '@/stores/authStore'
import { authApi }           from '@/services/api/auth'
import { ROUTES }            from '@/constants/routes'
import type { RegisterStep1, AccountType } from '@/types/auth.types'

type Step = 1 | 2

export function RegisterPage() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const setAuth   = useAuthStore((s) => s.setAuth)

  // Which step we're currently on — driven by URL
  const isStep2   = location.pathname === ROUTES.REGISTER_ACCOUNT
  const step: Step = isStep2 ? 2 : 1

  // Step 1 data held in state to pass to step 2
  const [step1Data, setStep1Data]         = useState<RegisterStep1 | null>(null)
  const [sessionToken, setSessionToken]   = useState<string>('')

  // Step 1 mutation
  const step1Mutation = useMutation({
    mutationFn: authApi.registerStep1,
    onSuccess: (res, variables) => {
      setStep1Data(variables)
      setSessionToken(res.sessionToken)
      navigate(ROUTES.REGISTER_ACCOUNT)
    },
  })

  // Step 2 mutation
  const step2Mutation = useMutation({
    mutationFn: (accountType: AccountType) =>
      authApi.registerStep2({ accountType }, sessionToken),
    onSuccess: ({ user, tokens }) => {
      setAuth(user, tokens)
      navigate(ROUTES.DASHBOARD, { replace: true })
    },
  })

  const bgImage = step === 1
    ? 'bg-[url(/images/register-bg-1.jpg)]'   // city skyline at night
    : 'bg-[url(/images/register-bg-2.jpg)]'   // waterfront towers

  return (
    <div className="flex w-full min-h-screen">

      {/* Left: background image with tagline */}
      <div
        className={`hidden lg:flex flex-1 relative bg-navy-900 bg-cover bg-center items-end p-12 ${bgImage}`}
      >
        <div className="absolute inset-0 bg-navy-950/60" />
        <div className="relative z-10 space-y-4 max-w-md">
          {step === 1 ? (
            <>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Secure Your Capital.<br />
                <span className="text-gold">Elevate Your Wealth.</span>
              </h2>
              <p className="text-navy-300 text-sm leading-relaxed">
                Licensed by SEC, Regulated by NGX. Your premium gateway to Nigerian
                capital markets and institutional-grade wealth management.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Tailored for your specific
                <br />investment goals.
              </h2>
              <p className="text-navy-300 text-sm leading-relaxed">
                Whether you are growing personal wealth or managing corporate assets,
                we provide the platform for your success.
              </p>
            </>
          )}
          <p className="text-label text-navy-400 uppercase tracking-[0.15em] flex items-center gap-2">
            <span className="w-6 h-px bg-gold" />
            Institutional Grade Security
          </p>
        </div>

        {/* Bottom badges */}
        <div className="absolute bottom-6 left-12 flex gap-6">
          {[['MEMBER', 'NGX GROUP'], ['REGULATED', 'SEC NIGERIA']].map(([top, bottom]) => (
            <div key={top}>
              <p className="text-label text-navy-500">{top}</p>
              <p className="text-label text-navy-300 font-medium">{bottom}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: form panel */}
      <div className="w-full lg:w-[460px] flex flex-col justify-center px-8 lg:px-12 py-12 bg-navy-950">

        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-gold/20 rounded-chip flex items-center justify-center mb-4">
            <span className="text-gold font-bold text-sm">CA</span>
          </div>
          <p className="text-label text-navy-400 uppercase tracking-widest mb-1">
            Capital Assets Limited
          </p>
          <h1 className="text-xl font-bold text-white">
            Create Your Capital Assets Account
          </h1>
          <p className="text-sm text-navy-400 mt-1">
            Step {step} of 2:{' '}
            {step === 1 ? 'Account Credentials' : 'Choose Your Account Type'}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-gold' : 'bg-navy-700'
              }`}
            />
          ))}
        </div>

        {/* Form steps */}
        {step === 1 ? (
          <Step1Credentials
            onNext={(data) => step1Mutation.mutate(data)}
            isLoading={step1Mutation.isPending}
          />
        ) : (
          <Step2AccountType
            onNext={(type) => step2Mutation.mutate(type)}
            onBack={() => navigate(ROUTES.REGISTER)}
            isLoading={step2Mutation.isPending}
          />
        )}

        {/* Error message */}
        {(step1Mutation.isError || step2Mutation.isError) && (
          <p className="text-label text-market-down mt-4 text-center">
            {(step1Mutation.error as Error)?.message ??
             (step2Mutation.error as Error)?.message ??
             'Something went wrong. Please try again.'}
          </p>
        )}

        <p className="text-sm text-navy-400 text-center mt-6">
          Already have an account?{' '}
          <a href={ROUTES.LOGIN} className="text-gold font-medium hover:underline">
            Login here.
          </a>
        </p>

        <p className="text-label text-navy-600 text-center mt-8">
          STEP {step} OF 2 &nbsp;•&nbsp; VERIFIED ACCESS
        </p>
      </div>
    </div>
  )
}

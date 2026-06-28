import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { useMemberStore } from '../store/memberStore'
import { MEMBERSHIP_TYPES } from '../data/mockMembers'
import { Input, Select } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function AddMember() {
  const { members, addMember, addingMember } = useMemberStore()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', membershipType: 'Basic' },
  })

  async function onSubmit(data) {
    setServerError('')
    try {
      await addMember(data)
      setSuccess(true)
      setTimeout(() => navigate('/members'), 1400)
    } catch (err) {
      // Surface server-side errors (e.g. duplicate email caught by API)
      setServerError(err.message ?? 'Something went wrong. Please try again.')
    }
  }

  const emailExistsLocally = (value) =>
    !members.some(m => m.email.toLowerCase() === value.toLowerCase()) ||
    'This email is already registered'

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center animate-slide-up">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Member added!</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Redirecting to members list…</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Back
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">New Member</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Fill in the details below. The member will be active immediately.
          </p>
        </div>

        <div className="px-6 py-6 space-y-5">
          <Input
            id="name"
            label="Full Name"
            placeholder="e.g. Arjun Sharma"
            error={errors.name?.message}
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              maxLength: { value: 60, message: 'Name is too long' },
            })}
          />

          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="e.g. arjun@example.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
              validate: emailExistsLocally,
            })}
          />

          <Select
            id="membershipType"
            label="Membership Plan"
            error={errors.membershipType?.message}
            {...register('membershipType', { required: 'Plan is required' })}
          >
            {MEMBERSHIP_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>

          {/* Plan pricing hint */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 px-4 py-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p className="font-medium text-gray-600 dark:text-gray-300 mb-1.5">Pricing</p>
            <div className="flex justify-between"><span>Basic</span><span className="font-mono">$10 / mo</span></div>
            <div className="flex justify-between"><span>Pro</span><span className="font-mono">$25 / mo</span></div>
            <div className="flex justify-between"><span>Enterprise</span><span className="font-mono">$100 / mo</span></div>
          </div>

          {/* Server-side error banner */}
          {serverError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {serverError}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3 bg-gray-50/60 dark:bg-gray-800/20">
          <Button variant="secondary" onClick={() => navigate('/members')} type="button" disabled={addingMember}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={addingMember}>
            {addingMember
              ? <><Loader2 size={15} className="animate-spin" /> Adding…</>
              : 'Add Member'
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

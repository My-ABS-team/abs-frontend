import { useState } from 'react'
import { Shield, Check, Sliders, Smartphone, Monitor, Save } from 'lucide-react'

function Toggle({ checked, onChange, label, sub }: { checked: boolean; onChange: (v: boolean) => void; label: string; sub: string }) {
  return (
    <div className="row between" style={{ gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-0)' }}>{label}</div>
        <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{sub}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: 44, height: 24, borderRadius: 99,
          background: checked ? 'var(--gold-400)' : 'var(--bg-4)',
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background .2s',
          flexShrink: 0,
        }}
        aria-checked={checked}
        role="switch"
      >
        <span style={{
          position: 'absolute', top: 3, left: checked ? 22 : 3,
          width: 18, height: 18, borderRadius: '50%',
          background: 'white',
          transition: 'left .2s',
        }} />
      </button>
    </div>
  )
}

const SESSIONS = [
  { device: 'iPhone 15 Pro Max', agent: 'Safari Mobile · 102.34.12.5', loc: 'Abuja, Nigeria',  status: 'Active Now',      color: 'green', Icon: Smartphone },
  { device: 'MacBook Pro M3',    agent: 'Chrome Desktop · 192.168.1.4', loc: 'Lagos, Nigeria', status: 'Last seen 2h ago', color: 'gold',  Icon: Monitor    },
]

export function SettingsPage() {
  const [twoFA,     setTwoFA]     = useState(true)
  const [biometric, setBiometric] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif,  setPushNotif]  = useState(false)
  const [smsNotif,   setSmsNotif]   = useState(true)
  const [researchFreq, setResearchFreq] = useState('Daily')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="page-title-row">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Account</div>
          <h1 className="h2" style={{ margin: 0 }}>Account Settings & Security</h1>
          <p className="muted" style={{ marginTop: 4, fontSize: 13 }}>
            Manage your authentication, intelligence preferences, and active sessions.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 16, marginBottom: 16 }} className="settings-grid">
        {/* Security & Auth */}
        <div className="card card-padded" style={{ padding: 20 }}>
          <div className="row gap-2" style={{ marginBottom: 20 }}>
            <Shield size={18} style={{ color: 'var(--gold-300)' }} />
            <strong style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-300)' }}>
              Security & Authentication
            </strong>
          </div>

          <div className="field" style={{ marginBottom: 24 }}>
            <label className="field-label">Update Password</label>
            <input type="password" className="input mono" defaultValue="••••••••••••" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Toggle checked={twoFA}     onChange={setTwoFA}     label="Two-Factor Authentication (2FA)" sub="Secure your account with a secondary code." />
            <Toggle checked={biometric} onChange={setBiometric} label="Biometric Login"                  sub="Use FaceID or Fingerprint for quick access." />
          </div>
        </div>

        {/* Membership tier */}
        <div className="card card-padded" style={{ padding: 20 }}>
          <div className="row between wrap gap-2" style={{ marginBottom: 16 }}>
            <div className="row gap-2">
              <Check size={18} style={{ color: 'var(--gold-300)' }} />
              <strong style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-300)' }}>Membership Tier</strong>
            </div>
            <span className="chip chip-gold">Verified</span>
          </div>
          <div className="label" style={{ marginBottom: 8 }}>Current Status</div>
          <div className="kpi-value gold" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', marginBottom: 24, lineHeight: 1.1 }}>
            Tier 3 · Full Access
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card" style={{ padding: 14, background: 'var(--bg-1)' }}>
              <div className="label" style={{ marginBottom: 4 }}>Daily Withdrawal Limit</div>
              <div className="mono" style={{ fontWeight: 700, fontSize: 16 }}>₦10,000,000</div>
            </div>
            <div className="card" style={{ padding: 14, background: 'var(--bg-1)' }}>
              <div className="label" style={{ marginBottom: 4 }}>Single Trade Limit</div>
              <div className="mono" style={{ fontWeight: 700, fontSize: 16 }}>No Limit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence preferences */}
      <div className="card card-padded" style={{ padding: 20, marginBottom: 16 }}>
        <div className="row gap-2" style={{ marginBottom: 20 }}>
          <Sliders size={18} style={{ color: 'var(--gold-300)' }} />
          <strong style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-300)' }}>
            Intelligence Preferences
          </strong>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          <Toggle checked={emailNotif} onChange={setEmailNotif} label="Email Recap"          sub="Daily performance summary" />
          <Toggle checked={pushNotif}  onChange={setPushNotif}  label="Push Notifications"  sub="Real-time terminal alerts" />
          <Toggle checked={smsNotif}   onChange={setSmsNotif}   label="SMS Trade Alerts"    sub="Critical security & trade logs" />
          <div className="field">
            <label className="field-label">Research Frequency</label>
            <select className="select" value={researchFreq} onChange={(e) => setResearchFreq(e.target.value)}>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active sessions */}
      <div className="card card-padded" style={{ padding: 20, marginBottom: 24 }}>
        <div className="row between" style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15 }}>Active Sessions</div>
          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--red-100)' }}>Log out of all other sessions</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SESSIONS.map(({ device, agent, loc, status, color, Icon }, i) => (
            <div key={i} className="row between" style={{ padding: 16, borderRadius: 8, background: 'var(--bg-1)', gap: 16, flexWrap: 'wrap' }}>
              <div className="row gap-3">
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)', flexShrink: 0 }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-0)' }}>{device}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{agent}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`chip chip-${color}`}>{status}</span>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <div className="row between" style={{ flexWrap: 'wrap', gap: 12 }}>
        <button className="btn btn-ghost">Cancel</button>
        <button className="btn btn-primary btn-lg" onClick={handleSave}>
          {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
        </button>
      </div>
    </div>
  )
}

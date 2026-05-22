import { useState } from 'react'
import { Plus, CheckCircle, AlertTriangle, Clock, Fingerprint, Key, Building, Upload } from 'lucide-react'

const KYC_STEPS = [
  { Icon: CheckCircle,    title: 'Identity (BVN)',                   sub: 'Verified on 12 Jan 2024',                              status: 'Verified',       color: 'green', action: false },
  { Icon: CheckCircle,    title: 'Government ID (Passport / NIN)',   sub: 'Verified on 14 Jan 2024',                              status: 'Verified',       color: 'green', action: false },
  { Icon: AlertTriangle,  title: 'Proof of Address (Utility Bill)',  sub: 'Required for full Tier 3 functionality',               status: 'Pending Action', color: 'gold',  action: true  },
  { Icon: Clock,          title: 'Next of Kin Details',              sub: 'Unlocks after Proof of Address',                       status: 'Incomplete',     color: 'blue',  action: false },
]

const ICON_BG: Record<string, string> = {
  green: 'rgba(112,219,157,0.12)',
  gold:  'rgba(221,176,96,0.12)',
  blue:  'rgba(100,116,139,0.12)',
}
const ICON_FG: Record<string, string> = {
  green: 'var(--green-300)',
  gold:  'var(--gold-300)',
  blue:  'var(--text-3)',
}

export function CompliancePage() {
  const [uploadHover, setUploadHover] = useState(false)

  return (
    <div>
      <div className="page-title-row">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Investor Identity</div>
          <h1 className="h2" style={{ margin: 0 }}>Compliance & Security</h1>
          <p className="muted" style={{ marginTop: 4, fontSize: 13 }}>
            Complete your profile verification to unlock institutional-grade investment limits and premium trade execution.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(0, 2fr)', gap: 16 }} className="compliance-grid">
        {/* Profile sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Profile card */}
          <div className="card card-padded" style={{ padding: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 16px' }}>
                <div style={{
                  width: 96, height: 96, borderRadius: 999,
                  background: 'linear-gradient(135deg, #2A1F0E, var(--gold-600))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: '#1A1404',
                }}>EA</div>
                <span className="chip-dot" style={{ position: 'absolute', bottom: 4, right: 4, width: 18, height: 18, background: 'var(--green-300)', border: '3px solid var(--bg-2)', borderRadius: '50%' }} />
              </div>
              <h3 className="h3" style={{ margin: '0 0 8px' }}>Emmanuel Adeniyi</h3>
              <span className="chip chip-gold">Tier 2 · Leveling up</span>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', margin: '20px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Member Since', 'Jan 2024', ''],
                ['Account Status', 'Active', 'green'],
                ['Identity Score', '98%', 'gold'],
              ].map(([label, val, color]) => (
                <div key={label} className="row between" style={{ fontSize: 13 }}>
                  <span className="muted">{label}</span>
                  <strong style={{ color: color === 'green' ? 'var(--green-300)' : color === 'gold' ? 'var(--gold-300)' : 'var(--text-0)' }}>{val}</strong>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, height: 6, background: 'var(--bg-4)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: '98%', height: '100%', background: 'var(--gold-300)', borderRadius: 99, transition: 'width 0.5s ease' }} />
            </div>
          </div>

          {/* Security overview */}
          <div className="card card-padded" style={{ padding: 20 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 14, marginBottom: 16 }}>Security Overview</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { Icon: Fingerprint, label: 'Biometrics',    sub: 'Enabled on Mobile',   color: 'green' },
                { Icon: Key,         label: '2FA Recovery',  sub: 'Configured via SMS',   color: 'gold'  },
              ].map(({ Icon, label, sub, color }) => (
                <div key={label} className="row gap-3" style={{ padding: 12, borderRadius: 8, background: 'var(--bg-1)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ICON_FG[color], flexShrink: 0 }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{label}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KYC + Bank linking */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Identity verification */}
          <div className="card card-padded" style={{ padding: 20 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15, marginBottom: 16 }}>Identity Verification</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {KYC_STEPS.map(({ Icon, title, sub, status, color, action }, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ padding: 16, background: status === 'Pending Action' ? 'rgba(221,176,96,0.05)' : 'var(--bg-1)' }}
                >
                  <div className="row between" style={{ alignItems: 'flex-start', gap: 12 }}>
                    <div className="row gap-3" style={{ alignItems: 'flex-start' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: ICON_BG[color], display: 'flex', alignItems: 'center', justifyContent: 'center', color: ICON_FG[color], flexShrink: 0 }}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-0)' }}>{title}</div>
                        <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{sub}</div>
                      </div>
                    </div>
                    <span className={`chip chip-${color}`}>{status}</span>
                  </div>

                  {action && (
                    <div
                      style={{
                        marginTop: 16, padding: 24, borderRadius: 8,
                        border: `1.5px dashed var(--gold-600)`,
                        textAlign: 'center', cursor: 'pointer',
                        background: uploadHover ? 'rgba(221,176,96,0.06)' : 'rgba(221,176,96,0.04)',
                        transition: 'background .15s',
                      }}
                      onMouseEnter={() => setUploadHover(true)}
                      onMouseLeave={() => setUploadHover(false)}
                    >
                      <Upload size={24} style={{ color: 'var(--gold-300)', marginBottom: 8 }} />
                      <div style={{ fontWeight: 600, color: 'var(--text-0)', marginBottom: 4 }}>Click to upload or drag & drop</div>
                      <div className="muted" style={{ fontSize: 12 }}>Utility bill from the last 3 months · PDF / PNG / JPG (max 5MB)</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bank account linking */}
          <div className="card card-padded" style={{ padding: 20 }}>
            <div className="row between" style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15 }}>Bank Account Linking</div>
              <button className="btn btn-secondary btn-sm"><Plus size={14} /> Link New Account</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {/* Linked bank */}
              <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg, #050912, #0B121F)' }}>
                <div className="row between" style={{ marginBottom: 28 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--gold-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1404', fontWeight: 800, fontSize: 14 }}>Z</div>
                  <CheckCircle size={20} style={{ color: 'var(--green-300)' }} />
                </div>
                <div className="label" style={{ marginBottom: 8 }}>Savings Account</div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-0)' }}>•••• •••• •••• 4902</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>Zenith Bank PLC</div>
              </div>

              {/* Add second bank */}
              <div className="card" style={{
                padding: 20, background: 'var(--bg-1)',
                border: '1.5px dashed var(--line-strong)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', minHeight: 140, cursor: 'pointer',
              }}>
                <Building size={28} style={{ color: 'var(--text-3)', marginBottom: 12 }} />
                <div style={{ fontWeight: 600, color: 'var(--text-0)' }}>Secondary Settlement Bank</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>Add for faster withdrawals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

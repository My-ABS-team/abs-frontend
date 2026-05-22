import { Phone, Mail, MapPin, Linkedin, Twitter, Calendar, HelpCircle, ArrowRight } from 'lucide-react'
import { PublicFooter } from '@/components/layout/PublicFooter'

const CHANNELS = [
  { Icon: Phone, title: 'Phone Support',    lines: ['Lagos Head Office: +234 1 234 5678', 'Abuja Branch: +234 9 876 5432'] },
  { Icon: Mail,  title: 'Email Support',    lines: ['Primary Inquiry: support@capitalassets.com.ng', 'Compliance: compliance@capitalassets.com.ng'] },
  { Icon: MapPin,title: 'Physical Presence',lines: ['Lagos Office — St. Nicholas House, Victoria Island', 'Abuja Branch — CBD Corporate Center'] },
]

const HELP_TOPICS = [
  'How to Top-up Wallet', 'Understanding CSCS', 'Resetting 2FA',
  'Tax Implications of Dividends', 'Wire Transfer SLA', 'BVN Verification Help',
]

const INQUIRY_TYPES = ['Trade Support', 'Wealth Advisory', 'Compliance & KYC', 'Investment Banking', 'Press / Investor Relations']

export function ContactPage() {
  return (
    <div style={{ background: 'var(--bg-1)', minHeight: '100vh' }}>
      <section style={{ padding: '64px clamp(24px, 5vw, 80px)', maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div className="text-center" style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Client Concierge</div>
          <h1 className="h1" style={{ margin: '0 0 16px', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
            Client Support & Advisory Concierge
          </h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 640, margin: '0 auto', lineHeight: 1.55 }}>
            Direct access to our investment experts and technical support. Your sovereign wealth deserves meticulous attention and responsive care.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: 24 }}>

          {/* Left: channels */}
          <div className="col gap-4">
            {CHANNELS.map(({ Icon, title, lines }) => (
              <div key={title} className="card card-padded">
                <div className="row gap-4" style={{ alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'rgba(221,176,96,0.1)', border: '1px solid var(--gold-700)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold-300)', flexShrink: 0,
                  }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 className="h4" style={{ margin: '0 0 8px' }}>{title}</h4>
                    {lines.map((l, i) => (
                      <div key={i} className="muted" style={{ fontSize: 13, marginBottom: 4, lineHeight: 1.5 }}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="card" style={{ padding: 20, background: 'var(--bg-2)' }}>
              <div className="row between">
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text-0)' }}>Follow our Insights</div>
                  <div className="muted" style={{ fontSize: 12 }}>Daily commentary & market briefs</div>
                </div>
                <div className="row gap-2">
                  <a href="https://linkedin.com" className="btn-icon" aria-label="LinkedIn"><Linkedin size={16} /></a>
                  <a href="https://twitter.com" className="btn-icon" aria-label="Twitter"><Twitter size={16} /></a>
                  <a href="mailto:info@capitalassets.com.ng" className="btn-icon" aria-label="Email"><Mail size={16} /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="card card-padded">
            <h3 className="h3" style={{ margin: '0 0 8px' }}>Schedule a consultation</h3>
            <p className="muted" style={{ fontSize: 14, margin: '0 0 24px' }}>Our advisory team typically responds within 2 business hours.</p>

            <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="field">
                <label className="field-label">Subject</label>
                <input className="input" placeholder="Brief overview of inquiry" />
              </div>
              <div className="field">
                <label className="field-label">Inquiry Type</label>
                <select className="select">
                  {INQUIRY_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="field" style={{ marginTop: 16 }}>
              <label className="field-label">Message</label>
              <textarea className="textarea" placeholder="How can our experts assist you today?" />
            </div>

            {/* Callback scheduler */}
            <div className="card" style={{ padding: 16, background: 'var(--bg-1)', marginTop: 16 }}>
              <div className="row gap-2" style={{ marginBottom: 12 }}>
                <Calendar size={16} style={{ color: 'var(--gold-300)' }} />
                <strong style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-300)' }}>
                  Premium Feature: Call-back Scheduling
                </strong>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input className="input" type="date" />
                <input className="input" type="time" />
              </div>
            </div>

            <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }}>Send Request</button>
          </div>
        </div>

        {/* Quick Help Center */}
        <div style={{ marginTop: 64 }}>
          <div className="row gap-3" style={{ marginBottom: 24 }}>
            <HelpCircle size={20} style={{ color: 'var(--gold-300)' }} />
            <h3 className="h3" style={{ margin: 0 }}>Quick Help Center</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {HELP_TOPICS.map(t => (
              <a key={t} className="card card-padded row between" style={{ cursor: 'pointer', transition: 'border-color .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold-600)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-0)' }}>{t}</span>
                <ArrowRight size={14} style={{ color: 'var(--gold-300)' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

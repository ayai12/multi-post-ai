import type { Route } from './+types/pricing'
import { SignUp, SignIn, useUser } from '@clerk/clerk-react'
import { PricingTable } from '@clerk/react-router'

export function meta(_: Route['MetaArgs']) {
  return [{ title: 'Pricing' }]
}

export default function PricingPage() {
  const { isSignedIn } = useUser()

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
      {/* Custom plan overview (source of truth remains Clerk Billing for checkout) */}
      <section style={{ margin: '2rem 0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center' }}>Pricing Plans</h1>
        <p style={{ color: '#5A5A5A', textAlign: 'center', marginTop: '0.5rem' }}>Choose a plan that fits your workflow.</p>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginTop: '1.5rem' }}>
          {/* Free */}
          <div style={{ background: '#fff', border: '1px solid #E5DED7', borderRadius: 12, padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ fontWeight: 700 }}>Free</h3>
              <span style={{ fontWeight: 800 }}>$0</span>
            </div>
            <ul style={{ marginTop: '0.75rem', color: '#5A5A5A', fontSize: 14, lineHeight: 1.5 }}>
              <li>Always free</li>
              <li>5 repurposes per month</li>
              <li>Supported formats: Tweets + Instagram Captions only</li>
              <li>Basic editing (trim + shorten)</li>
              <li>Email support only</li>
              <li>Only access to one format per request</li>
            </ul>
          </div>
          {/* Pro */}
          <div style={{ background: '#fff', border: '2px solid #FF6B35', borderRadius: 12, padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ fontWeight: 700 }}>Pro Plan</h3>
              <span style={{ fontWeight: 800 }}>$5 / Month</span>
            </div>
            <ul style={{ marginTop: '0.75rem', color: '#5A5A5A', fontSize: 14, lineHeight: 1.5 }}>
              <li>The best plan</li>
              <li>Unlimited repurposes/month</li>
              <li>Access to all Formats</li>
              <li>Basic editing (trim + shorten)</li>
              <li>Email support only</li>
              <li>Access to all formats per request</li>
            </ul>
          </div>
          {/* Business */}
          <div style={{ background: '#fff', border: '1px solid #E5DED7', borderRadius: 12, padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ fontWeight: 700 }}>Business Plan</h3>
              <span style={{ fontWeight: 800 }}>$15 / Month</span>
            </div>
            <ul style={{ marginTop: '0.75rem', color: '#5A5A5A', fontSize: 14, lineHeight: 1.5 }}>
              <li>Unlimited repurposes/month</li>
              <li>Access to all Formats</li>
              <li>Basic editing (trim + shorten)</li>
              <li>Email support only</li>
              <li>Access to all formats per request</li>
              <li>Early access to new formats/features</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Clerk Billing table controls product mapping/checkout */}
      <PricingTable />
      {!isSignedIn && (
        <div style={{ marginTop: '2rem' }}>
          {/* <h2>Sign Up</h2> */}
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            appearance={{
              variables: {
                colorPrimary: '#FF6B35',
                colorForeground: '#2E2E2E',
                colorPrimaryForeground: '#FFFFFF',
                colorBackground: '#FDF7F2',
                colorInput: '#FFF1E6',
                colorInputForeground: '#2E2E2E',
                colorMutedForeground: '#5A5A5A',
                colorSuccess: '#00A676',
                colorWarning: '#FFD23F',
                colorDanger: '#E85A2A',
              },
            }}
          />
        </div>
      )}
      {!isSignedIn && (
        <div style={{ marginTop: '2rem' }}>
          {/* <h2>Sign In</h2> */}
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
              variables: {
                colorPrimary: '#FF6B35',
                colorForeground: '#2E2E2E',
                colorPrimaryForeground: '#FFFFFF',
                colorBackground: '#FDF7F2',
                colorInput: '#FFF1E6',
                colorInputForeground: '#2E2E2E',
                colorMutedForeground: '#5A5A5A',
                colorSuccess: '#00A676',
                colorWarning: '#FFD23F',
                colorDanger: '#E85A2A',
              },
            }}
          />
        </div>
      )}
    </div>
  )
}
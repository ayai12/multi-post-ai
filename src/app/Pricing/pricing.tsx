import type { Route } from './+types/pricing'
import { SignUp, SignIn, useUser } from '@clerk/clerk-react'
import { PricingTable } from '@clerk/react-router'

export function meta(_: Route['MetaArgs']) {
  return [
    { title: 'Pricing | Repurpose.cc' },
    {
      name: 'description',
      content:
        'Simple, affordable pricing for Repurpose.cc — turn long‑form content into channel‑ready posts in seconds. Start free and scale as you grow.',
    },
    {
      tagName: 'link',
      rel: 'canonical',
      href: 'https://repurpose.cc/pricing',
    },
  ]
}

export default function PricingPage() {
  const { isSignedIn } = useUser()

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
      {/* Custom plan overview (source of truth remains Clerk Billing for checkout) */}
      
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
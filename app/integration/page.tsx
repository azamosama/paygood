"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckoutDemo } from '@/components/CheckoutDemo';
import { CodeBlock } from '@/components/CodeBlock';
import { Code, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';

export default function IntegrationPage() {
  const reactCode = `import { PayGoodSDK } from '@paygood/sdk';

// Initialize SDK
const paygood = new PayGoodSDK('your_publishable_key');

// Create payment intent
const paymentIntent = await paygood.createPaymentIntent({
  amount: 10000, // $100.00 in cents
  currency: 'usd',
  metadata: {
    isZakat: true,
    organizationName: 'My Nonprofit'
  }
});

// Confirm payment
const result = await paygood.confirmPayment(
  paymentIntent.id,
  paymentMethodId
);

if (result.status === 'succeeded') {
  console.log('Payment successful!');
}`;

  const pythonCode = `from paygood import PayGood

# Initialize client
paygood = PayGood('your_secret_key')

# Create payment intent
payment_intent = paygood.payment_intents.create(
    amount=10000,  # $100.00 in cents
    currency='usd',
    metadata={
        'is_zakat': True,
        'organization_name': 'My Nonprofit'
    }
)

# Confirm payment
result = paygood.payment_intents.confirm(
    payment_intent.id,
    payment_method=payment_method_id
)

if result.status == 'succeeded':
    print('Payment successful!')`;

  const curlCode = `curl https://api.paygood.co/v1/payment_intents \\
  -u your_secret_key: \\
  -d amount=10000 \\
  -d currency=usd \\
  -d "metadata[is_zakat]"=true \\
  -d "metadata[organization_name]"="My Nonprofit"`;

  const webhookCode = `// Express.js webhook handler
app.post('/webhooks/paygood', async (req, res) => {
  const signature = req.headers['paygood-signature'];
  const payload = req.body;
  
  // Verify webhook signature
  const isValid = paygood.webhooks.verify(
    payload,
    signature,
    process.env.WEBHOOK_SECRET
  );
  
  if (!isValid) {
    return res.status(400).send('Invalid signature');
  }
  
  // Handle event
  switch (payload.type) {
    case 'payment_intent.succeeded':
      await handleSuccessfulPayment(payload.data);
      break;
    case 'payment_intent.failed':
      await handleFailedPayment(payload.data);
      break;
  }
  
  res.json({ received: true });
});`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-sm text-emerald-600 hover:text-emerald-700 mb-2 inline-block">← Back to Analytics</Link>
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <Code className="h-8 w-8 text-emerald-600" />
              PayGood SDK & Integration
            </h1>
            <p className="text-slate-600 mt-1">Simple, powerful payment processing for your application</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <Zap className="h-8 w-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Quick Integration</h3>
              <p className="text-sm text-slate-600">Get started in minutes with our simple SDK. Copy, paste, and you're ready to accept payments.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Secure by Default</h3>
              <p className="text-sm text-slate-600">PCI-compliant infrastructure with built-in fraud detection and risk management.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Globe className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Global Support</h3>
              <p className="text-sm text-slate-600">Accept payments from customers worldwide with multi-currency support.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Live Demo</h2>
            <CheckoutDemo />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Code Examples</h2>
            <Tabs defaultValue="react" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>
              <TabsContent value="react" className="space-y-4">
                <CodeBlock code={reactCode} language="typescript" title="React / TypeScript" />
              </TabsContent>
              <TabsContent value="python" className="space-y-4">
                <CodeBlock code={pythonCode} language="python" title="Python" />
              </TabsContent>
              <TabsContent value="curl" className="space-y-4">
                <CodeBlock code={curlCode} language="bash" title="cURL" />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>Get up and running in 3 simple steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold">1</div>
                  <h3 className="font-semibold text-slate-900">Install SDK</h3>
                </div>
                <CodeBlock code="npm install @paygood/sdk" language="bash" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold">2</div>
                  <h3 className="font-semibold text-slate-900">Initialize</h3>
                </div>
                <CodeBlock code={`import { PayGoodSDK } from '@paygood/sdk';

const paygood = new PayGoodSDK(
  'your_publishable_key'
);`} language="typescript" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold">3</div>
                  <h3 className="font-semibold text-slate-900">Process Payment</h3>
                </div>
                <CodeBlock code={`const intent = await paygood
  .createPaymentIntent({
    amount: 10000,
    currency: 'usd'
  });`} language="typescript" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Integration</CardTitle>
            <CardDescription>Stay updated on payment events in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={webhookCode} language="typescript" title="Webhook Handler Example" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Core PayGood API methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-mono rounded">POST</span>
                  <code className="text-sm font-mono text-slate-900">/v1/payment_intents</code>
                </div>
                <p className="text-sm text-slate-600">Create a new payment intent to start the payment flow</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-mono rounded">GET</span>
                  <code className="text-sm font-mono text-slate-900">/v1/payment_intents/:id</code>
                </div>
                <p className="text-sm text-slate-600">Retrieve details about a specific payment intent</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-mono rounded">POST</span>
                  <code className="text-sm font-mono text-slate-900">/v1/payment_intents/:id/confirm</code>
                </div>
                <p className="text-sm text-slate-600">Confirm and process the payment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Code className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Built for PayGood</h3>
                <p className="text-sm text-slate-600">This integration demo showcases how developers can easily integrate PayGood into their applications. Features include mission-specific options like Zakat calculations, clean SDK design, and comprehensive documentation—all aligned with PayGood's commitment to serving Muslim businesses and nonprofits.</p>
                <p className="text-xs text-slate-500 mt-2">Demo built by Osama Azam • Tech: Next.js, React, TypeScript, Tailwind CSS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


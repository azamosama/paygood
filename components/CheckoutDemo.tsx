"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PayGoodSDK } from '@/lib/mockApi';
import { Loader2, CheckCircle, Heart } from 'lucide-react';

export const CheckoutDemo: React.FC = () => {
  const [amount, setAmount] = useState(100);
  const [includeZakat, setIncludeZakat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const zakatAmount = includeZakat ? amount * 0.025 : 0;
  const totalAmount = amount + zakatAmount;

  const handleDonate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const sdk = new PayGoodSDK('pk_test_demo_key');
      const paymentIntent = await sdk.createPaymentIntent({
        amount: totalAmount * 100,
        currency: 'usd',
        metadata: {
          isZakat: includeZakat,
          organizationName: 'Example Nonprofit',
        },
      });
      const result = await sdk.confirmPayment(paymentIntent.id, 'pm_demo_card');
      if (result.status === 'succeeded') {
        setSuccess(true);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-emerald-100 p-3">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Thank you for your donation!</h3>
              <p className="text-slate-600 mt-2">
                ${totalAmount.toFixed(2)} processed successfully
                {includeZakat && ` (includes $${zakatAmount.toFixed(2)} Zakat)`}
              </p>
            </div>
            <Button
              onClick={() => {
                setSuccess(false);
                setAmount(100);
                setIncludeZakat(false);
              }}
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              Make Another Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-emerald-600" />
          Donation Checkout
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Donation Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">$</span>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="pl-7"
              min={1}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-50 border border-emerald-200">
          <div className="space-y-0.5">
            <Label htmlFor="zakat" className="text-base font-medium">Include Zakat (2.5%)</Label>
            <p className="text-sm text-slate-600">Add ${zakatAmount.toFixed(2)} to your donation</p>
          </div>
          <Switch id="zakat" checked={includeZakat} onCheckedChange={setIncludeZakat} />
        </div>

        <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Donation</span>
            <span className="font-medium">${amount.toFixed(2)}</span>
          </div>
          {includeZakat && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Zakat (2.5%)</span>
              <span className="font-medium text-emerald-600">${zakatAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-slate-200">
            <span>Total</span>
            <span className="text-emerald-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        <Button onClick={handleDonate} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="lg">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Donate $${totalAmount.toFixed(2)}`
          )}
        </Button>

        <p className="text-xs text-center text-slate-500">Powered by PayGood • Secure payment processing</p>
      </CardContent>
    </Card>
  );
};



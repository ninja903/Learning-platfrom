import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import StripeProvider from './StripeProvider';
import React from 'react'
import { useCreateTransactionMutation } from '@/state/api';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import { useCurrentCourse } from '@/hooks/useCurrentCourse';
import { useClerk, useUser } from '@clerk/nextjs';
import CoursePreview from '@/components/CoursePreview';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PaymentPageContent = () => {
    const stripe = useStripe();
    const elements = useElements();
     const [createTransction] = useCreateTransactionMutation();
    const { navigateToStep } = useCheckoutNavigation();
    const { course, courseId } = useCurrentCourse();
    const { user } = useUser();
    const { signOut } = useClerk();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        
        if (!stripe || !elements) {
            toast.error("stripe is not available");

            return;
        }
       
        const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL
        ? `http://${process.env.NEXT_PUBLIC_LOCAL_URL}`
        : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : undefined;


        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                //return_url: `${process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL}?id=${courseId}`
                return_url: `${baseUrl}/checkout?step=3&id=${courseId}`,
            },
            redirect: "if_required",
        });
        
        if (result.paymentIntent?.status === "succeeded") {
            const transactionData: Partial<Transaction> = {
                transactionId: result.paymentIntent.id,
                userId: user?.id,
                courseId: courseId,
                paymentProvider: "stripe",
                amount: course?.price || 0
            };

            await createTransction(transactionData), navigateToStep(3);
        }
    };

    const handleSignOutAndNavigate = async () => {
        await signOut();
        navigateToStep(1);
    }

    if (!course) return null;

    
    return (
        <div className="payment">
            <div className="payment__container">
                <div className="payment__preview">
                    <CoursePreview course={course} />
                </div>
                <div className="payment__form-container">
                    <form id="payment-form"
                        onSubmit={handleSubmit}
                        className="payment__form"
                    >
                        <div className="payment__content">
                            <h1 className="payment__title">Checkout</h1>
                            <p className="payment__subtitle">
                                Fill out payment details below to complete purchase.
                            </p>
                            <div className="payment__method">
                                <h3 className="payment__method-title">Payment Method</h3>
                                <div className="payment__card-container">
                                    <div className="payment__card-header">
                                        <CreditCard size={24} />
                                        <span>Credit/Debit Card</span>
                                    </div>
                                    <div className="payment__card-element">
                                        <PaymentElement />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="payment__actions flex flex-col md:flex-row items-center justify-between gap-4 mt-6 px-4">
                <Button
                    className="w-full md:w-auto"
                    onClick={handleSignOutAndNavigate}
                    variant="outline"
                    type="button"
                >
                    Switch Account
                </Button>

                <Button
                    form="payment-form"
                    type="submit"
                    className="payment__submit w-full md:w-auto"
                    disabled={!stripe || !elements}
                >
                    Pay with Credit Card
                </Button>
            </div>
        </div>
    );
};

const PaymentPage = () => (
    <StripeProvider>
        <PaymentPageContent />
    </StripeProvider>
);

export default PaymentPage;
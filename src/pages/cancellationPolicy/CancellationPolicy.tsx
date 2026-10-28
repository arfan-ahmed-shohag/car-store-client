import { Link } from "react-router";
import { CircleX } from "lucide-react";
import PolicyPage, { type PolicySection } from "../shared/PolicyPage";

const sections: PolicySection[] = [
  {
    id: "cancellation-before",
    title: "Before you cancel",
    content: (
      <>
        <p>Check the car, order reference, order status and payment status before starting a cancellation. If you are unsure whether an order or payment was completed, ask our team to check it before placing a replacement order.</p>
        <p>If you want to change a detail rather than stop the purchase, contact our team and explain the change you need.</p>
      </>
    ),
  },
  {
    id: "cancellation-account",
    title: "Cancel through My Orders",
    content: (
      <>
        <p>Your account provides a Cancel option in My Orders. To use it:</p>
        <ol>
          <li>Sign in to the account used for the order and open My Orders.</li>
          <li>Find the correct car and order reference, then check the current status.</li>
          <li>Select Cancel and check the result shown on the screen.</li>
          <li>Review the updated order status and keep your order reference for any follow-up.</li>
        </ol>
        <p>Delivered or already cancelled orders cannot be cancelled through that button. If an error appears or the status does not change, contact our team rather than assuming the cancellation is complete.</p>
      </>
    ),
  },
  {
    id: "cancellation-support",
    title: "When you need help cancelling",
    content: (
      <>
        <p>If you cannot access your account, the cancellation is unavailable or you need help understanding the result, contact our team promptly. Include your order reference, car name, account email address and a short explanation of your request.</p>
        <p>For a car that has already been handed over, use our <Link to="/return-refund-policy">Return &amp; Refund Policy</Link> to find out how to raise a concern about the purchase.</p>
      </>
    ),
  },
  {
    id: "cancellation-payments",
    title: "If you have already paid",
    content: (
      <>
        <p>Order cancellation and payment refunds are separate processes. A cancellation request or cancelled order status does not automatically confirm that a payment has been refunded.</p>
        <p>Keep the transaction reference, payment date and amount. Ask our team to confirm the payment status, any applicable refund conditions and how to follow up on an approved refund.</p>
        <p>Read the <Link to="/return-refund-policy">Return &amp; Refund Policy</Link> for the information to share about a refund, duplicate payment or payment-status query.</p>
      </>
    ),
  },
  {
    id: "cancellation-handover",
    title: "Delivery and handover arrangements",
    content: (
      <>
        <p>If delivery, collection or paperwork has already been arranged, tell our team about the cancellation request as soon as possible. Confirm the status of those arrangements and any next steps before making new plans.</p>
        <p>Ask our team to explain any proposed costs or conditions for your particular purchase. Check them against the terms provided when the purchase was agreed.</p>
      </>
    ),
  },
  {
    id: "cancellation-changes",
    title: "Changing an order instead",
    content: (
      <>
        <p>The Cancel option does not edit an existing order. If you need a different vehicle, quantity or handover arrangement, contact our team to discuss the options for your order.</p>
        <p>Confirm how the original order and any existing payment will be handled before submitting or paying for a replacement order.</p>
      </>
    ),
  },
  {
    id: "cancellation-follow-up",
    title: "Confirmation and follow-up",
    content: (
      <>
        <p>Keep a record of the updated order status and any messages about your request. Include the same order reference when following up so our team can connect the information.</p>
        <p>Our <Link to="/terms-and-conditions">Terms &amp; Conditions</Link> provide more information about orders and payments. This page does not remove rights that apply to your purchase under applicable law.</p>
      </>
    ),
  },
];

export default function CancellationPolicy() {
  return (
    <PolicyPage
      pageId="cancellation"
      title="Cancellation Policy"
      heroLines={["Plans can change.", "Know your next step."]}
      heroDescription="Find the steps for cancelling an order, checking its status and contacting our team when you need help."
      introduction="Understand the cancellation option in your account, what to check if a payment has been made and how to get help with a change of plans."
      sections={sections}
      Icon={CircleX}
      lastUpdated={{ dateTime: "2026-10-28", label: "October 28, 2026" }}
    />
  );
}

import { Link } from "react-router";
import { RotateCcw } from "lucide-react";
import PolicyPage, { type PolicySection } from "../shared/PolicyPage";

const sections: PolicySection[] = [
  {
    id: "returns-request",
    title: "Starting a return or refund request",
    content: (
      <>
        <p>If you have a concern about a car you purchased or an order you paid for, contact our team promptly and explain what happened. Mention any difference between the vehicle or order and what was agreed for your purchase.</p>
        <p>Return and refund options depend on the circumstances of the purchase, the agreed terms and your applicable rights. Ask our team to confirm what applies to your request.</p>
      </>
    ),
  },
  {
    id: "returns-information",
    title: "Information to include",
    content: (
      <>
        <p>To help our team find the relevant purchase and understand your concern, include:</p>
        <ul>
          <li>Your order reference, car name and the email address associated with your account.</li>
          <li>A description of the issue and when you noticed it.</li>
          <li>Relevant photos or documents that help explain the issue, if available.</li>
          <li>For a payment query, the transaction reference, payment date and amount.</li>
        </ul>
        <p>Do not send your password, full payment card details or other information that is not needed for the request.</p>
      </>
    ),
  },
  {
    id: "returns-arrangements",
    title: "Review and return arrangements",
    content: (
      <>
        <p>Discuss the issue with our team before arranging transport or a vehicle handover. Confirm whether an inspection is needed, where the car should be taken and which documents, keys or accessories are relevant.</p>
        <p>Keep a record of the vehicle's condition and the instructions provided. Ask for clarification about collection arrangements and any proposed costs before you incur them.</p>
      </>
    ),
  },
  {
    id: "returns-refunds",
    title: "Refunds and payment status",
    content: (
      <>
        <p>If a refund is approved, ask our team to confirm the amount, currency, payment method and reference for the refund. Keep that confirmation with your order information.</p>
        <p>A cancelled order status does not, by itself, confirm that a payment has been refunded. Check the payment record and contact us if you need help understanding the status of a transaction.</p>
        <p>If a payment appears duplicated, incomplete or incorrect, share the transaction references with our team before making another payment.</p>
      </>
    ),
  },
  {
    id: "returns-timing",
    title: "Timing and any costs",
    content: (
      <>
        <p>Ask our team for the expected review time and, if applicable, the processing time for an approved refund. Payment processing can involve an external payment provider, so confirm how to follow up if a refund has not appeared.</p>
        <p>Any proposed collection, inspection or other charges should be explained for your particular purchase. Ask which costs apply and how any proposed adjustment to a refund is calculated.</p>
      </>
    ),
  },
  {
    id: "returns-warranty",
    title: "Warranty and purchase concerns",
    content: (
      <>
        <p>A concern about a car may also involve warranty support. Refer to the warranty information provided for your purchase and ask our team to explain the coverage, any inspection requirements and the available next steps.</p>
        <p>Warranty support, a return request and a payment refund can involve different steps. This page does not remove rights that apply to your purchase under applicable law.</p>
      </>
    ),
  },
  {
    id: "returns-cancellation",
    title: "Cancelling before handover",
    content: (
      <>
        <p>If you want to stop an order before the car is handed over, read our <Link to="/cancellation-policy">Cancellation Policy</Link> for the account options and information to share with our team.</p>
        <p>Our <Link to="/terms-and-conditions">Terms &amp; Conditions</Link> also explain what to confirm about prices, payments and handover arrangements before completing a purchase.</p>
      </>
    ),
  },
];

export default function ReturnRefundPolicy() {
  return (
    <PolicyPage
      pageId="returns"
      title="Return & Refund Policy"
      heroLines={["Returns, explained.", "A clearer next step."]}
      heroDescription="Understand how to raise a return or refund request and what to share when you need help with your purchase."
      introduction="Find the information to include in a request, what to confirm about a vehicle return and how to follow up on a refund or payment concern."
      sections={sections}
      Icon={RotateCcw}
      lastUpdated={{ dateTime: "2026-10-28", label: "October 28, 2026" }}
    />
  );
}

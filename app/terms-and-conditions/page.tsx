export default function TermsAndConditionsPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
  
        <div className="prose max-w-none">
          <h2 className="text-xl font-bold mt-6 mb-4">Booking Confirmation:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>All reservations are subject to availability and confirmation.</li>
            <li>Booking is considered confirmed upon receipt of full payment.</li>
            <li>
              The accurate number of guests must be provided before confirmation. Any changes afterward may result in
              extra charges.
            </li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Payment:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Full payment is required at the time of booking.</li>
            <li>Payments are accepted through approved payment methods listed on the website.</li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">
            Cancellation Policy - Short-Term Bookings (Less than 28 nights):
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              To receive a full refund, you should cancel within 48 hours of booking, and the cancellation must occur at
              least 28 days before check-in.
            </li>
            <li>If you cancel after that, you'll be charged 100% for all nights.</li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Cancellation Policy - Long-Term Bookings (28+ nights):</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>You should cancel at least 60 days before check-in to receive a 50% refund for all nights.</li>
            <li>If you cancel after that, you'll be charged 100% for all nights.</li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Occupancy:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>The maximum occupancy for each apartment is specified on the booking platform.</li>
            <li>
              Additional guests beyond the specified limit is considered a violation and will result in cancelling the
              reservation immediately without refund.
            </li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Check-In/Check-Out:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Check-in and check-out times are specified on the listing page, and will be stated in the booking
              confirmation email.
            </li>
            <li>
              Early check-in or late check-out may be accommodated upon request, subject to availability and additional
              charges.
            </li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">House Rules:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Guests are expected to adhere to apartment-specific rules provided upon check-in.</li>
            <li>Any violation of house rules may result in immediate cancellation without refund.</li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Maintenance and Repairs:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Guests are requested to report any damages or maintenance issues immediately.</li>
            <li>The cost of repairs for damages caused by guests will be charged to the provided payment method.</li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Force Majeure:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              The property is not liable for circumstances beyond its control, including but not limited to natural
              disasters or government actions.
            </li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Termination of Stay:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              The property reserves the right to terminate a guest's stay for any violation of terms and conditions
              without refund.
            </li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Privacy Policy:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Guest information will be handled in accordance with our privacy policy.</li>
          </ul>
  
          <h2 className="text-xl font-bold mt-8 mb-4">Amendments to Terms:</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              These terms and conditions may be updated from time to time, and guests are responsible for reviewing them
              periodically.
            </li>
          </ul>
        </div>
      </div>
    )
  }
  
  
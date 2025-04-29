export function PropertyLocation() {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-xl font-semibold">Where you'll be</h2>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9938.465474012487!2d-0.157007987873027!3d51.520329984930065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad4fbcdb18f%3A0x89b89cf144a8b8e5!2sMarylebone%2C%20London!5e0!3m2!1sen!2suk!4v1710000000000"
          width="100%"
          height="100%"
          className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          Located in Marylebone, one of London's coolest and elegant neighborhoods. Known for its sophisticated vibe and
          charm, it's well connected to all major attractions in London.
        </p>

        <ul className="space-y-2 text-gray-700">
          <li>5 min walk to Regent's Park</li>
          <li>10 min walk to Oxford Street</li>
          <li>15 min walk to Selfridges</li>
          <li>20 min walk to Soho</li>
          <li>25 min walk to British Museum</li>
        </ul>
      </div>
    </div>
  );
}

export default function MaisonLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Stylised "M" monogram in a thin square border */}
      <rect x="1" y="1" width="18" height="18" stroke="#c9a84c" strokeWidth="0.75" />
      <path
        d="M5 14V6l5 5 5-5v8"
        stroke="#c9a84c"
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <rect
          x="1"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="11"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="1"
          y="11"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="11"
          y="11"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    href: "/clients",
    label: "Clientes",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        {/* Persona 1 */}
        <circle cx="6" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.6" />

        {/* Person 2 */}
        <circle
          cx="12"
          cy="7"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        {/* Bodies */}
        <path
          d="M2.5 14c.5-2 2.2-3.2 4.2-3.2s3.7 1.2 4.2 3.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M7.3 14c.5-2 2.2-3.2 4.2-3.2s3.7 1.2 4.2 3.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/create-client",
    label: "Nuevo Cliente",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />

        <path
          d="M3.5 15c.8-2.4 3-3.75 5.5-3.75S13.7 12.6 14.5 15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M14.5 3.5v4M12.5 5.5h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/create-loan",
    label: "Nuevo Préstamo",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M9 6v6M6 9h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/weekly-payments",
    label: "Cobranza Semanal",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <rect
          x="1.5"
          y="3"
          width="15"
          height="13.5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M5.25 1.5v3M12.75 1.5v3M1.5 7.5h15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Mi perfil",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3.5 15c.8-2.4 3-3.75 5.5-3.75S13.7 12.6 14.5 15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/access-preferences",
    label: "Preferencias de ingreso",
    nested: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <rect
          x="3"
          y="8"
          width="12"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M6 8V5.75a3 3 0 0 1 6 0V8M9 11v2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export {navItems};
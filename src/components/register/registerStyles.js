export const registerCSS = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  input::placeholder { color: rgba(255,255,255,0.2); }

  .register-wrapper {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #0a0f0a;
  }

  .register-left {
    background: linear-gradient(145deg, #0f2027 0%, #1a3a2a 45%, #0d3b4f 100%);
    padding: clamp(40px, 6vw, 80px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .register-right {
    background: linear-gradient(160deg, #0d1117 0%, #0a1628 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(32px, 5vw, 64px);
    position: relative;
    overflow: hidden;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .register-wrapper {
      grid-template-columns: 1fr;
    }
    .register-left {
      display: none;
    }
    .register-right {
      min-height: 100vh;
      padding: 32px 24px;
      background: linear-gradient(135deg, #0f2027 0%, #1a3a2a 30%, #0d3b4f 65%, #0f2027 100%);
      align-items: flex-start;
    }
    .register-mobile-logo {
      display: block !important;
    }
  }
`;

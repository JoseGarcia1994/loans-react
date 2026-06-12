export const loginCSS = `
  @keyframes spin { to { transform: rotate(360deg); } }
  input::placeholder { color: rgba(255,255,255,0.2); }

  .login-wrapper {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #0a0f0a;
  }

  .login-left {
    background: linear-gradient(145deg, #0f2027 0%, #1a3a2a 45%, #0d3b4f 100%);
    padding: clamp(40px, 6vw, 80px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .login-right {
    background: linear-gradient(160deg, #0d1117 0%, #0a1628 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(32px, 5vw, 64px);
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .login-wrapper {
      grid-template-columns: 1fr;
    }
    .login-left {
      display: none;
    }
    .login-right {
      min-height: 100vh;
      padding: 32px 24px;
      background: linear-gradient(135deg, #0f2027 0%, #1a3a2a 30%, #0d3b4f 65%, #0f2027 100%);
    }
    .login-mobile-logo {
      display: block !important;
    }
  }
`;
